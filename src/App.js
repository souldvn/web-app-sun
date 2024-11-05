
import { useEffect } from 'react';
import './App.css';
import Splash from './components/splashscreen/Splash';
const tg = window.Telegram.WebApp;


function App() {

  return (
    <div className="App">
      <Splash />
    </div>
  );
}

export default App;
