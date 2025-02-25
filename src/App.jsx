"use client"

import React, { useState } from "react";

import { Calendar } from "./components/ui/calendar";
import Navbar from "./Navbar";
import IntroSection from "./IntroSection";
import { FeaturedProducts } from "./FeaturedProducts";
import SocialMedia from "./SocialMedia";
import AccordionSection from "./AccordionSection";
import { BrowserRouter } from "react-router-dom";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from "./Login";
import HomePage from "./HomePage";
import Products from "./Products";

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<Login />} />
    <Route path="/products" element={<Products />} />
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
