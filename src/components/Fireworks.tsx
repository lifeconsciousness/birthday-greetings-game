import React from 'react'
import '../index.scss' 


type Props = {}

function Fireworks({}: Props) {
  return (
    <> 
        <div className="firework" style={{transform: 'translate(-400px, -100px)', animationDelay: '.3s'}}></div>
        <div className="firework"></div>
        <div className="firework" style={{transform: 'translate(300px, -200px)', animationDelay: '.1s'}}></div>
    </>
  )
}

export default Fireworks