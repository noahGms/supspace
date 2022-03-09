import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from './components/layouts/Footer';
import { Header } from './components/layouts/Header';
import Home from './pages/Home';
import Launches from './pages/Launches';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
