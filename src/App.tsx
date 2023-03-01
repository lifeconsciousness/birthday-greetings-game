import { useState, useEffect } from 'react'
import './index.scss' 
import Fireworks from './components/Fireworks'
import Loader from './components/Loader'
import Balloon from './components/Balloon'
import Game from './components/Game'
// "build": "tsc && vite build",

function App() {
  const [loading, setLoading] = useState(false)
  const [gameActive, setGameActive] = useState(false)

  useEffect(()=> {
    setLoading(true)
  }, [])
  
  const handleBalloonPop = () => {
    console.log('pop')
    setGameActive(true)
  };

  return (
    <div className="App">
      {gameActive ? <Game /> : 
        <>
          <Loader onLoading={loading} />
    
          <div className="wave" style={{zIndex: -3, top: '15px'}}></div>
    
          <h1 className="congratulation-text">Happy birthday!</h1>
          <Balloon onPop={handleBalloonPop} />
          <Fireworks />
    
          <div className="wave" style={{bottom: '20px', zIndex: 888}}></div>
        </>
      }

      {/* <Game /> */}
    </div>
  )
}

export default App
