import './App.css';
import MainPage from './main-page/main-background/mainBackground';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewReleases from './new-releases/newReleases';
import Men from './men/men';
import Woman from './women/women';
import Menu from './menu/menu';
import Kids from './kids/kids';
import ShopAll from './shop-all/shopAll';
import ColumnPreview from './test/columnPreview';
import BlackMenu from './black-menu/blackMenu';

function App() {
  return (
    <Router>
      <div style={{ height: '100vh', width: '100vw' }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Menu />
                <MainPage />
              </>
            } 
          />
          <Route 
            path="/LastReleases" 
            element={
              <>
                <BlackMenu />
                <NewReleases />
              </>
            } 
          />
          <Route 
            path="/Men" 
            element={
              <>
                <BlackMenu />
                <Men />
              </>
            } 
          />
          <Route 
            path="/Women" 
            element={
              <>
                <BlackMenu />
                <Woman />
              </>
            } 
          />
          <Route 
            path="/Kids" 
            element={
              <>
                <BlackMenu />
                <Kids />
              </>
            } 
          />
          <Route 
            path="/ShopAll" 
            element={
              <>
                <BlackMenu />
                <ShopAll />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;