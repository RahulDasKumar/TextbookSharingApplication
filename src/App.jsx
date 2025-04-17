"use client"

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Login from "./Login"
import HomePage from "./HomePage"
import Products from "./Products"
import SignUp from './SignUp'
import Listings from './Listings' 
import ProductDetail from './ProductDetail' 
import Profile from './Profile'
import NewListingForm from "./NewListingForm";
import CartLayout from "./CartLayout";
import SettingsPage from './SettingsPage'



const routeDefinitions = createRoutesFromElements(
  <Route>
    {/* Routes wrapped with CartLayout */}
    <Route path="/" element={<CartLayout><HomePage /></CartLayout>} />
    <Route path="/products" element={<CartLayout><Products /></CartLayout>} />
    <Route path="/listings" element={<CartLayout><Listings /></CartLayout>} />
    <Route path="/product/:id" element={<CartLayout><ProductDetail /></CartLayout>} />
    <Route path="/profile" element={<CartLayout><Profile /></CartLayout>} />
    <Route path="/listings/new" element={<CartLayout><NewListingForm /></CartLayout>} />
    <Route path="/settings" element={<SettingsPage />} />

    {/* Auth routes without CartLayout */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
  </Route>
);

const route = createBrowserRouter(routeDefinitions)

export default function App() {
  return <RouterProvider router={route} />
}
