import React, { useState, useEffect } from 'react';
import '../css/qr.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const Qrcode = () => {
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState('black'); 
  const [size, setSize] = useState('300x300');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
      const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 400);
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

  const generateQR = () => {
    if (!text.trim()) {
      setImage(''); 
      return;
    }
    const URL = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${text}&color=${color}`;
    setImage(URL);
  };

  useEffect(() => {
    if (text.trim()) {
      generateQR();
    } else {
      setImage('');
    }
  }, [text, color, size]);


  const downloadQR = async () => {
    if (!image) return;
  
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const blobURL = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = `QRCode_${text || 'default'}.png`;
      link.click();
  
      URL.revokeObjectURL(blobURL); 
    } catch (error) {
      console.error('Error downloading QR Code:', error);
    }
  };
  
  

  return (
    <div className="qr-container">
      <div className="qr-main">
        <h1 className="qr-heading">QR Code Generator</h1>

        <div className="qr-containing">
          <div className="qr-content">
            <input
              type="text"
              className='qr-text'
              placeholder='Insert Value Here'
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={generateQR}
            />
            <button onClick={() => setText('')} className="clrbtn">
              {text.length > 0 && <FontAwesomeIcon icon={faCircleXmark} className='clr-icon' />}
            </button>
          </div>
          <button onClick={downloadQR} className="qr-download">
            <span className="donwload-txt">Download</span>
            <div className="small-visible-btn">
              <FontAwesomeIcon icon={faDownload} className="download-icon" />
            </div>
          </button>
        </div>

        <div className="functionality">
          {/* 1st Functionality: Sizing */}
          <div className="sizing">
            <h1 className='size-heading'>Size</h1>
            <select name="size" className='qr-size' value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="100x100">100x100</option>
              <option value="200x200">200x200</option>
              <option value="300x300" disabled={isSmallScreen}>300x300</option>
              <option value="400x400" disabled={isSmallScreen}>400x400</option>
            </select>
          </div>

          {/* 2nd Functionality: Theme */}
          <div className="theme">
            <h1 className='size-heading'>Theme</h1>
            <div className="qr-btnGroup">
              <button onClick={() => setColor('ff0000')} className='qr-btn btnRed'>Red</button>
              <button onClick={() => setColor('008000')} className='qr-btn btnGreen'>Green</button>
              <button onClick={() => setColor('0000ff')} className='qr-btn btnBlue'>Blue</button>
              <button onClick={() => setColor('800080')} className='qr-btn btnPurple'>Purple</button>
              <button onClick={() => setColor('000000')} className='qr-btn btnDefault'>Default</button>
            </div>
          </div>
        </div>

        <div className="img-container">
          {image ? <img src={image} alt="QR Code" /> : <p>No QR Code</p> }
        </div>
      </div>
    </div>
  );
};

export default Qrcode;


