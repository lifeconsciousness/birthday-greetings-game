import { useState, useEffect } from 'react'
import './index.scss' 
import Fireworks from './components/Fireworks'
import Loader from './components/Loader'
import Balloon from './components/Balloon'
import Game from './components/Game'

function App() {
  const switchDelay = 1000
  const [loading, setLoading] = useState(false)
  const [gameActive, setGameActive] = useState(false)
  const [animationActive, setAnimationActive] = useState(false)
  const [balloonPosition, setBalloonPosition] = useState(0)

  useEffect(()=> {
    setLoading(true)
    setBalloonPosition(Math.floor(Math.random() * 60)+13)
  }, [])
  
  const handleBalloonPop = () => {
    setAnimationActive(true)

    //delay before switching to the game
    setTimeout(() => {
      setGameActive(true);
    }, switchDelay);
  };



  return (
    <div className="App">
      {animationActive ? <div className="transitionAnimation"></div> : ''}

      {gameActive ? <Game />
       : 
        <>
          <Loader onLoading={loading} />
    
          <div className="wave" style={{zIndex: -3, top: '15px'}}></div>
    
          <h1 className="congratulation-text">Hppy birthday!</h1>
          <Balloon onPop={handleBalloonPop} position={balloonPosition}/>
          <Fireworks />
    
          <div className="wave" style={{bottom: '20px', zIndex: 888}}></div>
        </>
      }

      {/* <Game /> */}
    </div>
  )
}

export default App
