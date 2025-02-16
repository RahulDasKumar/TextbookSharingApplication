"use client"

import React, { useState } from "react";

import { Calendar } from "./components/ui/calendar";
import Navbar from "./Navbar";
import IntroSection from "./IntroSection";
import { FeaturedProducts } from "./FeaturedProducts";
import SocialMedia from "./SocialMedia";
import AccordionSection from "./AccordionSection";

export default function App() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Navbar />
      <IntroSection />
      <FeaturedProducts/>
      <AccordionSection/>
      <SocialMedia/>
    </>
  );
}
