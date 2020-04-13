import  { useState, useEffect } from 'react';

export function GetWindowSize() {
  const [size, setSize] = useState([ window.innerWidth, window.innerHeight]);

  useEffect(() => {

    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, [size]);
  return size;
}
