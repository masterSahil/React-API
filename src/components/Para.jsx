import React from 'react'
import { useState } from 'react'
import '../css/para.css'

const Para = () => {

  const [value, setValue] = useState('');
  const [para, setPara] = useState([]);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');

  const URL = 'https://jsonplaceholder.typicode.com/posts';

  const generatePara = async () =>{

    if (value < 1 || value > 100) {
      alert("Please enter the value from 1 to 100");
      return;
    }

    try {

      let response = await fetch(URL);
      let data = await response.json();

      let result = [];

      for(let i=0; i<value; i++)
      {
        result.push(`${i +1}. ${data[i].body}`);
      }

      setPara(result);

    } catch (error) {
      setPara(["Failed to fetch data. Please try again later."]);
    }

  }

  const handleKeyDown = (e) =>{
    if (e.key === "Enter") {
      generatePara();
    }
  }

  const handleSize = (e) =>{
    const fontSize = [ '16px', '18px', '20px', '22px', '24px', '26px' ];
    setSize(fontSize[e.target.value]);
  }

  return (
    <>
      <div className="para-container">
        <h1 className='heading-generate'>Random Paragraph Generator</h1>
        <div className="para-content">
            <input type="number" value={value} onChange={(e)=>setValue(e.target.value)} 
              className='inputValue' placeholder='Enter a value' onKeyDown={handleKeyDown} />
            <button onClick={generatePara} className='paraGenerate'> Generate 
              <span className="hide-span"> Paragraphs</span>  </button>
            <select name='font-size' onChange={handleSize} className='paraSize-select'>
              <option value="0">16px</option>
              <option value="1">18px</option>
              <option value="2" selected>20px</option>
              <option value="3">22px</option>
              <option value="4">24px</option>
              <option value="5">26px</option>
            </select>
            <div className="para-themeSection">
              <p className='picker'>Choose <span className="hide-span2"> Color</span> </p>
              <div className="color-content">
                <input type="color" value={color} className='colorField' 
                  onChange={(e)=>setColor(e.target.value)} />
              </div>
            </div>
        </div>
        
        <div className="paragraph-container">
          {
            para.map((value, index) => (
              <p key={index} className='generated-para' 
                style={{fontSize: size, color: color,  boxShadow: `0 4px 8px ${color}33, 0 0 0 1px ${color}55 inset`,}} > {value} </p>
            ))
          }
        </div>

      </div>
    </>
  )
}

export default Para