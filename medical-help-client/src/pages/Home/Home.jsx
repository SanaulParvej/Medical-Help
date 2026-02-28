import React from 'react';
import Hero from './Hero';
import ServiceCard from './Servicecard';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Hero></Hero>
            <ServiceCard></ServiceCard>
        </div>
    );
};

export default Home;