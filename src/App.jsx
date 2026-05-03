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
import AdminLayout from './AdminCode/Layout/AdminLayout'
import AdminDashboard from './AdminCode/Pages/AdminDashboard'
import ManageHeroSection from './AdminCode/Pages/ManageHeroSection'
import Settings from './AdminCode/Pages/Settings'
import ManageProducts from './AdminCode/Pages/ManageProducts'
import ManageCategories from './AdminCode/Pages/ManageCategories'
import { Login, SignUp } from './AdminCode/Auth/AuthScreen'
import CategoryProductPage from './pages/CategoryProductPage'
import ManageDesigner from './AdminCode/Pages/ManageDesigner'
import UserDashLayout from './User/UserDashLayout'
import UserDashboard from './User/UserDashboard'
import UserOrders from './User/UserOrders'
import UserSettings from './User/UserSettings'
import ManageOrders from './AdminCode/Pages/ManageOrders'
import MyWishList from './User/MyWishList'


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:category" element={<ProductList />} />
        <Route path="product/:productName" element={<ProductDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="hire-designer" element={<HireDesigner />} />
        <Route path="hire-designer/:id" element={<HireDesignerDetail />} />
        <Route path="branding" element={<Branding />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="category_product/:cat_name" element={<CategoryProductPage />} />
      </Route>


      {/* user routes */}
      <Route path="/user" element={<UserDashLayout />}>
        <Route index element={< UserDashboard />} />
        <Route path="orders" element={< UserOrders />} />
        <Route path="wishlist" element={< MyWishList />} />
        <Route path="settings" element={< UserSettings />} />


      </Route>







      {/* admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={< AdminDashboard />} />
        <Route path="manageHeroSection" element={< ManageHeroSection />} />
        <Route path="settings" element={< Settings />} />
        <Route path="manage-products" element={< ManageProducts />} />
        <Route path="manage-categories" element={< ManageCategories />} />
        <Route path="manage-designers" element={< ManageDesigner />} />
        <Route path="manage-orders" element={< ManageOrders />} />

      </Route>
    </Routes>
  )
}

export default App
