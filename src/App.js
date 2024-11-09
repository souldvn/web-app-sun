import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Splash from './components/splashscreen/Splash';
import Mainscreen from './components/mainscreen/Mainscreen';
import Breakfast from './components/Outline/Breakfast/Breakfast';
import Bar from './components/Outline/Bar/Bar';
import Grill from './components/Outline/Grill/Grill';
import CardPrice from './components/Complite/CardPrice/CardPrice';
import Burgers from './components/Outline/Burgers/Burgers';
import Hot from './components/Outline/Hot/Hot';
import HotSnacks from './components/Outline/HotSnacks/HotSnacks';
import ScrollToTop from './components/ScrollToTop';
import Soups from './components/Outline/Soups/Soups';
import Salads from './components/Outline/Salads/Salads';
import Dough from './components/Outline/Dough/Dough';
import ColdSnacks from './components/Outline/ColdSnacks/ColdSnacks';
import Garnish from './components/Outline/Garnish/Garnish';
import IceCream from './components/Outline/IceCream/IceCream';
import Souses from './components/Outline/Souses/Souses';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop/>
      <div className="App">


        {loading ? (
          <Splash />
        ) : (
          <Routes>
            <Route path="/" element={<Mainscreen />} />
            <Route path="/breakfast" element={<Breakfast />} />
            <Route path="bar" element={<Bar />} />
            <Route path="grill" element={<Grill />} />
            <Route path="burgers" element={<Burgers/>} />
            <Route path="hot" element={<Hot/>} />
            <Route path="hotSnacks" element={<HotSnacks/>} />
            <Route path="soups" element={<Soups/>} />
            <Route path="salads" element={<Salads/>} />
            <Route path="dough" element={<Dough/>} />
            <Route path="coldSnacks" element={<ColdSnacks/>} />
            <Route path="garnishes" element={<Garnish/>} />
            <Route path="icecreams" element={<IceCream/>} />
            <Route path="souses" element={<Souses/>} />
            
          </Routes>
        )}
      
          {/* <CardPrice/> */}
      </div>
    </Router>
  );
};

export default App;


