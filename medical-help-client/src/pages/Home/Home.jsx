import React from "react";
import Hero from "./Hero";
import ServiceCard from "./Servicecard";
import CTAService from "./CTAservice";
import FAQ from "./FAQ";
import Reviews from "./Reviews/Reviews";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero></Hero>
      <ServiceCard></ServiceCard>
      <CTAService></CTAService>
      <Reviews></Reviews>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
