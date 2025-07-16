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

import ProtectedRoute from './utils/ProtactedRoute.jsx';
import ContactmsgForm from './dashboard/ContactmsgForm.jsx';
import DasNavbar from './dashboard/dasNavbar.jsx';
import Productcategorypage from './pages/Productcategorypage.jsx';
import Productcategorydetailpage from './pages/Productcategorydetailpage.jsx';
import Socialicon from './components/Socialicon.jsx';
import Cookie from './pages/Cookie.jsx';
import Cookiepolicy from './pages/Cookiepage.jsx';
import PrivatePolicy from './pages/PrivatePolicy.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'about-us', element: <About /> },
      { path: 'dog-breed', element: <Breed /> },
      { path: 'product', element: <Product /> },
      { path:"/category-products", element:<CategoryProducts />},
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:id', element: <BlogDetails /> },
      { path: 'market-place', element: <Marketplace /> },
      { path: "districts/:stateId" , element: <DistrictsPage /> },
      { path: '/:state/:districtId', element: <MarketPlacedetails /> },
      { path: 'contact', element: <Contact /> },
      { path : "exp" , element : <Category/>},
      { path: "marketplace/:name", element: <Productcategorypage/> },
      { path: "marketplace/:name/:id", element: <Productcategorydetailpage/> },
      { path: "cookie", element: <Cookiepolicy/> },
      { path: "privatePolicy", element: <PrivatePolicy/> },
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
            <DasNavbar/>
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
            <DasNavbar/>
            <CountryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'blog',
        element: (
          <ProtectedRoute>
            <DasNavbar/>
            <AdminBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: 'blogdetail/:id',
        element: (
          <ProtectedRoute>
            <DasNavbar/>
            <BlogDetailsAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: 'state/:countryName/:countryId',
        element: (
          <ProtectedRoute>
            <DasNavbar/>
            <StatePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'district/:countryId/:stateName/:stateId',
        element: (
          <ProtectedRoute>
            <DasNavbar/>
            <DistrictPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contact',
        element: (
          <ProtectedRoute>
            <DasNavbar/>
            <AdminContact />
          </ProtectedRoute>
        ),
      },{
      path:'adm/contact', // results in /dashboard/adm/contact
      element: (
        <ProtectedRoute>
          <DasNavbar/>
          <ContactmsgForm />
        </ProtectedRoute>
      )
    }
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
