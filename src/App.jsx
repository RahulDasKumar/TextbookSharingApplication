"use client"


import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from "./Login";
import HomePage from "./HomePage";
import ProductsPage from "./Products";
import SignUp from './SignUp';
import CartPage from './Cart';

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<Login />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/cart" element={<CartPage/>} />

  </Route>
)
const route = createBrowserRouter(routeDefinitions)


export default function App() {

  return (
    <>
    <RouterProvider router={route}/>
    </>
    
  );
}
