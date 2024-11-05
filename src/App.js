
import { useEffect } from 'react';
import './App.css';
import Splash from './components/splashscreen/Splash';
import Mainscreen from './components/mainscreen/Mainscreen';
import Carddeffault from './components/carddeffault/Carddeffault';



const tg = window.Telegram.WebApp;


function App() {

  return (
    <div className="App">
      {/* <Splash /> */}
      <Mainscreen/>
      {/* <Carddeffault/> */}
    </div>
  );
}

export default App;
