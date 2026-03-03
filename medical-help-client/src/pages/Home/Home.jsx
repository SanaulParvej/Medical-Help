import React from 'react';
import Hero from './Hero';
import ServiceCard from './Servicecard';
import CTAService from './CTAservice';
import FAQ from './FAQ';
import Carousel from './Feedback';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Hero></Hero>
            <ServiceCard></ServiceCard>
            
            <CTAService></CTAService>
            <FAQ></FAQ>
            <Carousel></Carousel>
        </div>
    );
};

export default Home;