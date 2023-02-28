import React from 'react'
import '../index.scss' 

type Props = {
    onPop: React.MouseEventHandler<HTMLDivElement>
}

function Balloon({onPop}: Props) {
  return (
    <div>
        <div className="balloonContainer" 
        onClick={onPop}
        style={
          {left: `${Math.floor(Math.random() * 60)+13}vw`,
            animationDelay: `${(Math.floor(Math.random() * 10) + 1)/10}s`,
          }}>
        <div className="balloon"><div className="balloonShade"></div></div>
        <div className="rope"></div>
      </div>
    </div>
  )
}

export default Balloon