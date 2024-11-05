import React, { useEffect, useState } from 'react';
import './App.css';
import Splash from './components/splashscreen/Splash';
import Mainscreen from './components/mainscreen/Mainscreen';

const App = () => {
  const [loading, setLoading] = useState(true); // состояние для загрузки

  useEffect(() => {
    // Имитация загрузки, например, 3 секунды
    const timer = setTimeout(() => {
      setLoading(false); // После 3 секунд устанавливаем loading в false
    }, 3000);

    // Очистка таймера при размонтировании
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? <Splash /> : <Mainscreen />} {/* Показать Splash или Mainscreen */}
    </div>
  );
}

export default App;

