import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка к началу страницы при изменении пути
  }, [pathname]);

  return null;
};

export default ScrollToTop;
