import { useState, useEffect, useReducer } from 'react';
import Bug from './components/Bug';
import './App.css';

function getWindowSize() {
  return { width: window.innerWidth, height: window.innerHeight };
}

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "squashed":
      newState = { ...state, score: state.score + 1};
      break;
    case "awoke":
      newState = { ...state, score: state.score - 1};
      break;
    case "escaped":
      newState = { ...state, bugs: state.bugs.filter(bugKey => bugKey !== action.key) };
      break;
    default:
      newState = state;
  }

  if (newState.score > newState.highScore) {
    newState.highScore = newState.score;
  }

  if (newState.score === newState.bugs.length) {
    newState.bugs = [...newState.bugs, Date.now() ];
  }

  return newState;
}

function App() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const [state, dispatch] = useReducer(reducer, {
    bugs: [Date.now()],
    score: 0,
    highScore: 0,
  });

  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      <div className="scores">
        <div>CURRENT SCORE: {state.score}</div>
        <div>HIGH SCORE: {state.highScore}</div>
      </div>
      {state.bugs.map(bugKey => <Bug key={bugKey} id={bugKey} windowSize={windowSize} appDispatch={dispatch} />)}
    </div>
  );
}

export default App;
