import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './components/Intro';
import Recipe from './components/Recipe';
import Qrcode from './components/Qrcode';
import Qoutes from './components/Qoutes';
import Para from './components/Para';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro/>} />
        <Route path="/food-recipe" element={<Recipe />} />
        <Route path="/paragraph-generator" element={<Para />} />
        <Route path="/qrcode-generator" element={<Qrcode />} />
        <Route path="/qoutes-generator" element={<Qoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
