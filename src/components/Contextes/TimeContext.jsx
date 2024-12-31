import React, { createContext, useEffect, useState } from 'react';

export const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
  const [moscowTime, setMoscowTime] = useState(new Date());

  useEffect(() => {
    const updateMoscowTime = () => {
      const now = new Date();
      const utcHours = now.getUTCHours();
      const moscowTime = new Date(now.setHours(utcHours + 3)); // UTC+3
      setMoscowTime(moscowTime);
    };

    updateMoscowTime(); // Обновление при монтировании
    const interval = setInterval(updateMoscowTime, 1000 * 60); // Каждую минуту

    return () => clearInterval(interval); // Очистка интервала при размонтировании
  }, []);

  return (
    <TimeContext.Provider value={moscowTime}>
      {children}
    </TimeContext.Provider>
  );
};
