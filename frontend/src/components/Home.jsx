import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import MissionCard from './MissionCard';
import Purpose from './Purpose';
import Features from './Features';
import Philosophy from './Philosophy';
import CallToAction from './CallToAction';
import Footer from './Footer';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar />
            <main className="main-content">
                <div className="content-wrapper">
                    <Hero />
                    <div className="side-content">
                        <MissionCard />
                    </div>
                </div>
                <Purpose />
                <Features />
                <Philosophy />
                <CallToAction />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
