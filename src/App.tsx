import { useState } from 'react'
import './index.scss'
import Balloon from './components/Balloon'

function App() {
  const [count, setCount] = useState(0)
  //find some cool gradient text (hyperplexed) and make baloons animation
  //first make baloons or particles, then text
  //add a small song to the file
  //add play button
  //baloons are released, text is animated and song is played
  //make jingle sound that plays after popping the balloon
  const releaseBalloons = () => {
    for(let i = 0; i < 9; i++){
      <Balloon />
    }
  }

  return (
    <div className="App">
      <div className="box" style={{zIndex: -3, top: '15px'}}></div>

      <h1 className="congratulation-text">Happy birthday</h1>

      <Balloon />
      

      <div className="firework" style={{transform: 'translate(-400px, -100px)', animationDelay: '.3s'}}></div>
      <div className="firework"></div>
      <div className="firework" style={{transform: 'translate(300px, -200px)', animationDelay: '.1s'}}></div>

      <div className="box" style={{bottom: '20px', zIndex: 888}}></div>
    </div>
  )
}

export default App
