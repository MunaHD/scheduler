import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
 
  function transition(newMode, replace  = false) {
    if (replace === true) {
      //replacing the pop. So it berings back everything except the last element
      setHistory(prev => ([...prev].slice(0, -1)));
    }
    // set the history to everything in its prvious state and add newMode
    setHistory(prev => ([...prev, newMode]));
    setMode(newMode)
  }
  function back() {
    if (history.length > 1) {
      //make a copy of history becuase the original needs to be
      // intact to next use of transition function
      const historyCopy = history.slice(0, -1);
      setHistory(historyCopy);

      //the current mode is the last element of the copied history array (the second last of the original)
      setMode(historyCopy[historyCopy.length - 1])
    }
  }

  return {mode, transition, back}

}


