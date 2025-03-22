import React, { useState } from 'react'
import nature from '../assets/img/nature.png'
import '../css/qoute.css'
import '../css/fonts.css'
import loader from '../assets/img/loader.gif'

const Qoutes = () => {

  const [author, setAuthor] = useState('Winston Churchill');
  const [qoute, setQoute] = useState('Success is not final, failure is not fatal: It is the courage to continue that counts.');
  const [category, setCategory] = useState('Success');
  const [loading, setLoading] = useState(false);

  const URL = 'https://api.api-ninjas.com/v1/quotes?&X-Api-Key=lXZ1wnCv6lxK87ftlgUSDA==sJ2QbydquynBPEeG';

  const generateQoutes = async () =>{
    
    setLoading(true);

    let response = await fetch(URL);
    let data = await response.json();

    setQoute(data[0].quote);
    setAuthor(data[0].author);
    setCategory(data[0].category);

    setLoading(false)
  }

  return (
    <>
      <img src={nature} alt="nature-bg" className='nature-bg' />
      <div className="qoutes-main">
        <div className="qoutes-container">
            <h1 className="quotes-heading">Random Qoutes Generator</h1>
            <p className='qoute'> {qoute} </p>
            <p className='qoutes-author'> ~ Author: {author} </p>
            <p className="qoute-category"> Category: {category} </p>
            <button onClick={generateQoutes} className='qoute-btn'>Generate Qoutes</button>
        </div>
      </div>
    </>
  )
}

export default Qoutes