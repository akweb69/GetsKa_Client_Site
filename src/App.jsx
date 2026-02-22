import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import ProductList from './pages/ProductList'
import About from './pages/About'
import Contact from './pages/Contact'
import HireDesigner from './pages/HireDesigner'
import HireDesignerDetail from './pages/HireDesignerDetail'
import Branding from './pages/Branding'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:category" element={<ProductList />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="hire-designer" element={<HireDesigner />} />
        <Route path="hire-designer/:id" element={<HireDesignerDetail />} />
        <Route path="branding" element={<Branding />} />
      </Route>
    </Routes>
  )
}

export default App
