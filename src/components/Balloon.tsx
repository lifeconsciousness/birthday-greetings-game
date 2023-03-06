import React, { useEffect, useState } from 'react'
import '../index.scss' 
import PopImg from '/pop.png'

type Props = {
    onPop: React.MouseEventHandler<HTMLDivElement>,
    position: number
}

function Balloon({onPop, position}: Props) {
  const [isPopped, setIsPopped] = useState(false)
  const [isTimeOut, setIsTimeOut] = useState(false)

  if(isPopped){
    setTimeout(()=>{
      setIsTimeOut(true)
    }, 300)
  }
  const balloonOpacity = isPopped ? 0 : 1
  const popOpacity = isTimeOut ? 0 : 1

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsPopped(true)
    onPop(event);
  }

  return (
    <>
      <div className="balloonContainer" 
        onClick={handleClick}
        style={
        {left: `${position}vw`,
          animationDelay: `${(Math.floor(Math.random() * 10) + 1)/10}s`,
        }}>
        <div className="balloon" style={{opacity: balloonOpacity}}><div className="balloonShade"></div></div>
        <div className="rope" style={{opacity: balloonOpacity}}></div>

        <img
          src={PopImg}
          // src="/pop.png"
          className="popEffect"
          style={{ left: `${position}vw`, top: 0, opacity: popOpacity}}
        />
      </div>
    </>
  )
}

export default Balloon