import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Home() {
  return (
    <div>
      <Header />
      <h1 data-testid="homeID">Home</h1>
      <Footer />
    </div>

  );
}

export default Home;
