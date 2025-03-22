import React from 'react';
import Cards from './Cards';
import '../css/intro.css';
import foodThumb from '../assets/img/food-thumbnail.jpg';
import paraThumb from '../assets/img/book.png';
import qrThumb from '../assets/img/qrThumb.png';
import qouteThumb from '../assets/img/qoute-thumb.png'
import { Link } from 'react-router-dom';

const Intro = () => {
  return (
    <div className="main-container">
      <h1 className="greeting">Welcome to <br className='br-hide' /> React API Projects</h1>

      <div className="cards-container">
        <Link to="/food-recipe" className='odd-card'>
          <Cards img={foodThumb} txt="Random Recipes" />
        </Link>
        <Link to="/paragraph-generator" className='even-card'>
          <Cards img={paraThumb} txt="Random Paragraphs" />
        </Link>
        <Link to="/qrcode-generator" className='odd-card'>
          <Cards img={qrThumb} txt="QR Code Generator" />
        </Link>
        <Link to="/qoutes-generator" className="even-card">
          <Cards img={qouteThumb} txt="Qoutes Generator"  />
        </Link>
      </div>
    </div>
  );
};

export default Intro;
