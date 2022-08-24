import React from 'react';
import Cards from '../cards';
import Footer from '../footer';
import Hero from '../hero';
import Info from '../info';
import Navbar from '../navbar';

const FrontPage = () => {
    
    return (
        <div>
            <Navbar />
            <Hero />
            <Info />
            <Cards />
            <Footer />
        </div>
    )
}
export default FrontPage;