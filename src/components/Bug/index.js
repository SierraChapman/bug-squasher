import { useReducer } from 'react';
import './style.css';

const behavior = {
  inactive: {
    speed: 0,
    rotation: 0,
  },
  active: {
    speed: 1,
    rotation: 1,
  },
  excited: {
    speed: 2,
    rotation: 3,
  },
};

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
  return state;
}

function Bug(props) {
  const [state, dispatch] = useReducer(reducer, generateInitialState(props.windowSize));
  return (
    <div className="Bug" style={{left: state.x, top: state.y}}>
    </div>
  );
}

export default Bug;
