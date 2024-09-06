import React, { useState, useEffect, useMemo } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);

  const formattedTime = useMemo(() => {
    const formatTime = (timeNr) => {
      const timeInSeconds = parseInt(timeNr, 10);
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    return formatTime(time);
  }, [time]);

  const audioGong = new Audio('./sounds/bell.wav')

  useEffect(() => {
    let timer = null;
    if (status !== 'off' && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && status !== 'off') {
      if (status === 'work') {
        setStatus('rest');
        setTime(20);
        audioGong.play();
      } else if (status === 'rest') {
        setStatus('work');
        setTime(1200);
        audioGong.play();
      }
    }

    return () => clearInterval(timer);
  }, [status, time]);

  const handleStart = () => {
    setStatus('work');
    setTime(1200);
    audioGong.play();
  };

  const handleStop = () => {
    setStatus('off');
    setTime(0);
  };

  const handleClose = () => {
    window.close();
  }
  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      {status === 'work' && (<img src="./images/work.png" alt="Work" />)}
      {status === 'rest' && (<img src="./images/rest.png" alt="Rest" />)}
      {status !== 'off' && (
        <div className="timer">
          {formattedTime}
        </div>
      )}
      {status === 'off' && (<button className="btn" onClick={handleStart}>Start</button>)}
      {status !== 'off' && (<button className="btn" onClick={handleStop}>Stop</button>)}
      <button className="btn btn-close" onClick={handleClose}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
