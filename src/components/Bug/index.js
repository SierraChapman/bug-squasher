import { useEffect, useReducer, useCallback } from 'react';
import './style.css';

const TIMESTEP = 20; // ms
const SIZE = 10; // px
const BEHAVIOR = {
  inactive: {
    speed: 0, // px per TIMESTEP
    rotation: 0, // range of possible rotations in radians per TIMESTEP
  },
  active: {
    speed: 1,
    rotation: 0.5,
  },
  excited: {
    speed: 2,
    rotation: 2,
  },
};

function constrain(value, min, max) {
  if (value >= min) {
    if (value <= max) {
      return value;
    } else {
      return max;
    }
  } else {
    return min;
  }
}

function generateInitialState(windowSize) {
  return {
    status: "active",
    x: Math.random() * windowSize.width,
    y: Math.random() * windowSize.height,
    direction: Math.random() * 2 * Math.PI,
    downtime: 1,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "timeStep": 
      const newX = state.x + BEHAVIOR[state.status].speed * Math.cos(state.direction);
      const newY = state.y + BEHAVIOR[state.status].speed * Math.sin(state.direction);

      return {
        ...state,
        x: constrain(newX, 0, action.windowSize.width - SIZE),
        y: constrain(newY, 0, action.windowSize.height - SIZE),
        direction: state.direction + BEHAVIOR[state.status].rotation * (Math.random() - 0.5),
      };

    case "wakeUp":
      return state;
    case "squash":
      return state;
    case "scare":
      return state;
    case "calm":
      return state;
    default:
      return state;
  }
}

function Bug(props) {
  const [state, dispatch] = useReducer(reducer, generateInitialState(props.windowSize));

  const handleTimeStep = useCallback(
    () => {
      dispatch({type: "timeStep", windowSize: props.windowSize});
    }, 
    [props.windowSize]
  );

  useEffect(
    () => {
      const timeStepInterval = setInterval(handleTimeStep, TIMESTEP);
      return () => clearInterval(timeStepInterval);
    }, 
    [handleTimeStep]
  );

  return (
    <div className="Bug" style={{ left: state.x, top: state.y, height: SIZE, width: SIZE }}>
    </div>
  );
}

export default Bug;
