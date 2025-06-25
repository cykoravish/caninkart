import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import About from './pages/About';
import Breed from './pages/Breed';
import Product from './pages/Product';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Marketplace from './pages/Marketplace';
import Contact from './pages/Contact.jsx';
import MarketPlacedetails from './pages/MarketPlacedetails.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Dashboard from './dashboard/OverView.jsx';

import CountryPage from './dashboard/components/CountryPage.jsx';
import StatePage from './dashboard/components/StatePage.jsx';
import DistrictPage from "./dashboard/components/DistrictPage.jsx"
import DashboardLayout from './dashboard/OutletLayout.jsx';
import AdminLogin from './dashboard/AdminLogin.jsx';
import AdminBlog from './dashboard/AdminBlog.jsx';
import BlogDetailsAdmin from './dashboard/dashBlogdetail.jsx';
import AdminContact from './dashboard/AdminContact.jsx';
import Category from './pages/Category.jsx';
import DistrictsPage from './pages/DistrictsPage.jsx';
import CategoryProducts from './components/CategoryProducts.jsx';

import ProtectedRoute from './utils/ProtactedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'about', element: <About /> },
      { path: 'dogbreed', element: <Breed /> },
      { path: 'product', element: <Product /> },
      { path:"/category-products", element:<CategoryProducts />},
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:id', element: <BlogDetails /> },
      { path: 'marketplace', element: <Marketplace /> },
      { path: "districts/:stateId" , element: <DistrictsPage /> },
      { path: 'marketplacedetails/:districtId', element: <MarketPlacedetails /> },
      { path: 'contact', element: <Contact /> },
      { path : "exp" , element : <Category/>}
      // { path: 'CountryPage', element: <CountryPage /> }
    ],
  },
 
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'das-login',
        element: <AdminLogin />,
      },
      {
        path: 'countrypage',
        element: (
          <ProtectedRoute>
            <CountryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'blog',
        element: (
          <ProtectedRoute>
            <AdminBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: 'blogdetail/:id',
        element: (
          <ProtectedRoute>
            <BlogDetailsAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: 'state/:countryName/:countryId',
        element: (
          <ProtectedRoute>
            <StatePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'district/:countryId/:stateName/:stateId',
        element: (
          <ProtectedRoute>
            <DistrictPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contact',
        element: (
          <ProtectedRoute>
            <AdminContact />
          </ProtectedRoute>
        ),
      },
    ],
  }
  // {
  //   path: '/dashboard',
  //   element: <DashboardLayout />,
  //   children: [
  //     { index: true , element: <Dashboard /> },
  //     {path : 'das-login', element : <AdminLogin/>},
  //     { path : 'countrypage', element : <CountryPage/>},
  //     { path : 'blog', element : <AdminBlog/>},
  //     { path : 'blogdetail/:id', element : <BlogDetailsAdmin/>},
  //     { path: "state/:countryName/:countryId", element: <StatePage/> },
  //     { path : "district/:countryId/:stateName/:stateId" ,element:<DistrictPage/>},
  //     { path : "contact", element:<AdminContact/>}
    
  //   ]
  // }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
