import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Splash from './components/splashscreen/Splash';
import Mainscreen from './components/mainscreen/Mainscreen';
import Breakfast from './components/Outline/Breakfast/Breakfast';
import Bar from './components/Outline/Breakfast/Bar/Bar';

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
      <div className="App">
        {loading ? (
          <Splash />
        ) : (
          <Routes>
            <Route path="/" element={<Mainscreen />} />
            <Route path="/breakfast" element={<Breakfast />} />
            <Route path="bar" element={<Bar />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;


