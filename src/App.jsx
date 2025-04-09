"use client"

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Login from "./Login"
import HomePage from "./HomePage"
import Products from "./Products"
import SignUp from './SignUp'
import CartPage from './Cart'
import Listings from './Listings' 
import ProductDetail from './ProductDetail' 
import Profile from './Profile'

import ChatComponent from './Chat'

import NewListingForm from "./NewListingForm";


const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/products" element={<Products />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/listings" element={<Listings />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/profile" element={<Profile />} />
    <Route path='/chat' element={<ChatComponent/>}/>
    <Route path="/listings/new" element={<NewListingForm />} />
  </Route>
)

const route = createBrowserRouter(routeDefinitions)

export default function App() {
  return <RouterProvider router={route} />
}
