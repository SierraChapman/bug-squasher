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
      let newX = state.x + BEHAVIOR[state.status].speed * Math.cos(state.direction);
      let newY = state.y + BEHAVIOR[state.status].speed * Math.sin(state.direction);
      let newDirection = state.direction + BEHAVIOR[state.status].rotation * (Math.random() - 0.5);
      newDirection %= 2 * Math.PI;
      const maxX = action.windowSize.width - SIZE;
      const maxY = action.windowSize.height - SIZE;

      if (newX < 0) {
        newX = 0;
        if (newY < 0) {
          // top left corner
          newY = 0;
          newDirection = newDirection > 5 * Math.PI/4 ? 0 : Math.PI/2;
        } else if (newY > maxY) {
          // bottom left corner
          newY = maxY;
          newDirection = newDirection > 3 * Math.PI/4 ? 3 * Math.PI/2 : 0;
        } else {
          // left edge
          newDirection = newDirection > Math.PI ? 3 * Math.PI/2 : Math.PI/2;
        }
      } else if (newX > maxX) {
        newX = maxX;
        if (newY < 0) {
          // top right corner
          newY = 0;
          newDirection = newDirection > 7 * Math.PI/4 ? Math.PI/2 : Math.PI;
        } else if (newY > maxY) {
          // bottom right corner
          newY = maxY;
          newDirection = newDirection > Math.PI/4 ? Math.PI : 3 * Math.PI/2;
        } else {
          // right edge
          newDirection = newDirection > Math.PI ? 3 * Math.PI/2 : Math.PI/2;
        }
      } else {
        if (newY < 0) {
          // top edge
          newY = 0;
          newDirection = newDirection > 3 * Math.PI/2 ? 0 : Math.PI;
        } else if (newY > maxY) {
          // bottom edge
          newY = maxY;
          newDirection = newDirection > Math.PI/2 ? Math.PI : 0;
        }
      }

      return { ...state, x: newX, y: newY, direction: newDirection };

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
