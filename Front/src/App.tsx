
import './App.css'
import ProductComponent from "../components/card";
import ProductList from '../components/cards';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import ProductDetail from "../components/ProductDetail";
function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} /> {/* Product Detail route */}
    </Routes>
  </Router>
  )
}

export default App
