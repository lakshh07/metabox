import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Landing/Navbar";
import MainSection from "./Landing/MainSection";
import WidgetThemeSection from "./Landing/WidgetThemeSection";
import MarketplaceSection from "./Landing/MarketplaceSection";
import Footer from "./Landing/Footer";
import Features from "./Landing/Features";

function Main() {
  return (
    <>
      <Navbar />
      <MainSection />
      <Features />
      <WidgetThemeSection />
      <MarketplaceSection />
      <Footer />
    </>
  );
}

export default Main;
