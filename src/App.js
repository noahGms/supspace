import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from './components/layouts/Footer';
import { Header } from './components/layouts/Header';
import CoreDetails from './pages/CoreDetails';
import Home from './pages/Home';
import LaunchDetails from './pages/LaunchDetails';
import Launches from './pages/Launches';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:id" element={<LaunchDetails />} />
        <Route path="/cores/:id" element={<CoreDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
