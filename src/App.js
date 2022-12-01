import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'

function Countdown({hr, min, sec}) {
  // 1 step further
  // create consistent digit using locale format
  const tf = new Intl.NumberFormat("en-US",{
    minimumIntegerDigits: 2,
    useGrouping: false
  })

  const [over, setOver] = useState(false);
  const [pause, setPause] = useState(true);
  const [[h,m,s], setTime] = useState([hr,min,sec]);
  
  const tick = () => {
    // console.log(typeof h)
    // console.log(typeof m)
    // console.log(typeof s)
    // if pause or over then don't update time value
    if (pause || over) {
      return
    }
    // update time value 
    if (h === 0 && m === 0 && s === 0) {
      setOver(true)
    } else if (m === 0 && s === 0) {
      setTime([h-1,59,59])
    } else if (s === 0 ) {
      setTime([h,m-1,59])
    } else {
      setTime([h,m,s-1])
    }
  }

  const handlePause = () => setPause(!pause)

  const handleReset = () => {
    // reset value to initialize value
    setTime([hr,min,sec])
    setPause(true)
    setOver(false)
  }
  
  // 2 step further change time
  const handleChangeTime = (e) => {
    // console.log(e.target.value)
    let inputValue = parseInt(e.target.value)
    switch (e.target.id) {
      case "hr":
        if (inputValue>99) inputValue = 99;  
        setTime([inputValue,m,s])
        break;
      case "min":
        if (inputValue>59) inputValue = 59;  
        setTime([h,inputValue,s])
        break;
      case "sec":
        if (inputValue>59) inputValue = 59;
        setTime([h,m,inputValue])
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    //component mounted
    // create ticker that call 'tick' func with interval of 1s
    let ticker = setInterval(() => tick(), 1000);
    return () => {
      //on destroyed
      clearInterval(ticker)
    };
  });
  
  return (
    // 3. lastly custom content and style
    <>
      <div className='counter'>
        <div className='input-box'>
          <input
          disabled={pause&&!over?false:true}
          id="hr"
          onChange={handleChangeTime} value={`${tf.format(h)}`}
          type="number"
          min="0"
          max="99"
          step="1">
          </input>
        </div>
        <span> : </span>
        <div className='input-box'>
          <input
          disabled={pause&&!over?false:true}
          id="min"
          onChange={handleChangeTime}
          value={`${tf.format(m)}`}
          type="number"
          min="0"
          max="59"
          step="1">
          </input>
        </div>
        <span> : </span>
        <div className='input-box'>
          <input
          disabled={pause&&!over?false:true}
          id="sec"
          onChange={handleChangeTime}
          value={`${tf.format(s)}`}
          type="number"
          min="0"
          max="59"
          step="1">
          </input>
        </div>
      </div>
      {/* using font awesome might be better but too lazy :v */}
      <div>
        <button onClick={handlePause}>{pause?'Start▶️':'Pause⏸️'}</button>
        <button onClick={handleReset}>Reset🔃</button>
      </div>
    </>
  )
}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" preload="true"/>
        <div className='main'>
        {/* prop as default value */}
          <Countdown hr={1} min={45} sec={0}/>
        </div>
      </header>
    </div>
  );
}

export default App;
