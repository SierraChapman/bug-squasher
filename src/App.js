import { useState, useEffect } from 'react';
import Bug from './components/Bug';
import './App.css';

function getWindowSize() {
  return { width: window.innerWidth, height: window.innerHeight };
}

function App() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className="App">
      <Bug windowSize={ windowSize }/>
    </div>
  );
}

export default App;
