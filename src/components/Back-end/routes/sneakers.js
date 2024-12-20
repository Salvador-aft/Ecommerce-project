const express = require('express');
const router = express.Router();
const Sneaker = require('../models/sneaker');
const { Op, Sequelize } = require('sequelize');
const { body, validationResult } = require('express-validator');
const { verifyUser } = require('../../middleware/authenticateToken');

// Utility function to handle errors consistently throughout the API.
function handleError(error, res) {
    return res.status(500).json({ message: 'Internal server error' });
}

// Retrieves sneakers based on the provided filters.
router.get('/filter', async (req, res) => {
    try {
        const { gender, color, sizes, type, minPrice, maxPrice, discount } = req.query;

        let filterConditions = {}; // Dynamically builds the conditions for the database query.

        // Gender filter: Ensures consistent formatting of input (e.g., 'Men' instead of 'men').
        if (gender) {
            filterConditions.gender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
        }

        // Color filter: Matches specific colors stored as a JSON array in the database.
        if (color) {
            filterConditions.color = Sequelize.where(
                Sequelize.fn('JSON_CONTAINS', Sequelize.col('color'), `"${color}"`),
                true
            );
        }

        // Size filter: Similar logic to the color filter but applied to the `available_sizes` field.
        if (sizes) {
            filterConditions.available_sizes = Sequelize.where(
                Sequelize.fn('JSON_CONTAINS', Sequelize.col('available_sizes'), `"${sizes}"`),
                true
            );
        }

        // Type filter: Matches the `type` field while correcting input casing.
        if (type) {
            filterConditions.type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        }

        // Price range filter: Filters sneakers based on the min and max price.
        if (minPrice && maxPrice) {
            filterConditions.price = {
                [Op.gte]: parseFloat(minPrice),
                [Op.lte]: parseFloat(maxPrice),
            };
        }

        // Discount filter: Includes only sneakers with discounts if `discount=true`.
        if (discount) {
            const hasDiscount = discount.toLowerCase() === 'true';
            filterConditions.discount_percentage = hasDiscount ? { [Op.gt]: 0 } : 0;
        }

        // Fetch sneakers from the database using the dynamic conditions.
        const sneakers = await Sneaker.findAll({ where: filterConditions });

        const baseURL = 'http://localhost:5000'; // Used to construct full image URLs.

        // Formats the `image_url` field for each sneaker to include full URLs.
        const formattedSneakers = sneakers.map((sneaker) => {
            const updatedImages = {};
            for (let color in sneaker.image_url) {
                updatedImages[color] = `${baseURL}${sneaker.image_url[color]}`;
            }

            return {
                ...sneaker.dataValues,
                image_url: updatedImages,
            };
        });

        res.json(formattedSneakers);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving filtered sneakers' });
    }
});

// Retrieves a single sneaker by its ID.
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Finds the sneaker in the database using its primary key (ID).
        const sneaker = await Sneaker.findByPk(id);

        if (!sneaker) {
            return res.status(404).json({ error: 'Sneaker not found' });
        }

        const baseURL = 'http://localhost:5000';

        // Formats the `image_url` field to include full URLs for all color options.
        const updatedImages = {};
        for (let color in sneaker.image_url) {
            updatedImages[color] = `${baseURL}${sneaker.image_url[color]}`;
        }

        const formattedSneaker = {
            ...sneaker.dataValues,
            image_url: updatedImages,
        };

        res.json(formattedSneaker);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving sneaker by ID' });
    }
});

// Processes a sneaker purchase by reducing the stock.
router.post(
    '/:id/purchase',
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    async (req, res) => {
        const { id } = req.params;
        const { quantity } = req.body;

        // Validates the request body to ensure quantity is a positive integer.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Fetches the sneaker from the database.
            const sneaker = await Sneaker.findByPk(id);

            if (!sneaker) {
                return res.status(404).json({ error: 'Sneaker not found' });
            }

            // Checks if there is enough stock to complete the purchase.
            if (quantity > sneaker.stock) {
                return res.status(400).json({ error: `Only ${sneaker.stock} units available` });
            }

            // Reduces the stock and saves the changes in the database.
            sneaker.stock -= quantity;
            await sneaker.save();

            res.json({ message: 'Purchase successful', remainingStock: sneaker.stock });
        } catch (error) {
            handleError(error, res);
        }
    }
);

// Updates the details of a sneaker by ID.
router.put('/:id', verifyUser, async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, color, available_sizes, discount_percentage } = req.body;

    try {
        // Finds the sneaker to update.
        const sneaker = await Sneaker.findByPk(id);

        if (!sneaker) {
            return res.status(404).json({ error: 'Sneaker not found' });
        }

        // Updates only the fields that are provided in the request.
        if (name) sneaker.name = name;
        if (price) sneaker.price = price;
        if (stock) sneaker.stock = stock;
        if (color) sneaker.color = color;
        if (available_sizes) sneaker.available_sizes = available_sizes;
        if (discount_percentage) sneaker.discount_percentage = discount_percentage;

        await sneaker.save(); // Saves the updated sneaker in the database.

        res.json({ message: 'Sneaker updated successfully', sneaker });
    } catch (error) {
        handleError(error, res);
    }
});

// Deletes a sneaker by ID.
router.delete('/:id', verifyUser, async (req, res) => {
    const { id } = req.params;

    try {
        // Finds the sneaker to delete.
        const sneaker = await Sneaker.findByPk(id);

        if (!sneaker) {
            return res.status(404).json({ error: 'Sneaker not found' });
        }

        await sneaker.destroy(); // Removes the sneaker from the database.

        res.json({ message: 'Sneaker deleted successfully' });
    } catch (error) {
        handleError(error, res);
    }
});

module.exports = router;