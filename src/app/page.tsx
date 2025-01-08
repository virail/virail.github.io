"use client"

import { useEffect, useRef } from "react";

export default function Home() {

  const appRef = useRef(null);

  useEffect(() => {
    const moveGradient = (event) => {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      const mouseX = Math.round((event.pageX / winWidth) * 100);
      const mouseY = Math.round((event.pageY / winHeight) * 100);

      if (appRef) {
        appRef.current.style.setProperty(
          '--mouse-x',
          mouseX.toString() + "%"
        );
        appRef.current.style.setProperty(
          '--mouse-y',
          mouseY.toString() + "%"
        );
      }
    }
    
    document.addEventListener('mousemove', moveGradient);

    return () => {
      document.removeEventListener('mousemove', moveGradient);
    }
  }, [appRef])
  return (
    <div ref={appRef} id="app" className="app">
      <p>test</p>
    </div>
  );
}
