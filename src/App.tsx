import { useState, useEffect } from 'react'
import './index.scss' 

function App() {
  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    setLoading(true)
  }, [])
  
  //the balloon pops and fireworks animation starts playing and text pops out
  const onBalloonPop = () => {
    console.log('pop')
  };

  return (
    <div className="App">
      <div className={loading ? "loading-screen fadeOutAnimation" : 'loading-screen'}>
        <div className="lines-container">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <h2 className='loading-message'>Loading</h2>
        <div className="lines-container mirrorToRight">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>

      <div className="wave" style={{zIndex: -3, top: '15px'}}></div>
      <h1 className="congratulation-text">Happy birthday!</h1>


      <div className="balloonContainer" 
        onClick={()=>{onBalloonPop()}}
        style={
          {left: `${Math.floor(Math.random() * 60)+13}vw`,
            animationDelay: `${(Math.floor(Math.random() * 10) + 1)/10}s`,
          }}>
        <div className="balloon"><div className="balloonShade"></div></div>
        <div className="rope"></div>
      </div>
      

      <div className="firework" style={{transform: 'translate(-400px, -100px)', animationDelay: '.3s'}}></div>
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework"></div>
      <div className="firework" style={{transform: 'translate(300px, -200px)', animationDelay: '.1s'}}></div>

      <div className="wave" style={{bottom: '20px', zIndex: 888}}></div>




      <div className="game">
        
      </div>

    </div>
  )
}

export default App
