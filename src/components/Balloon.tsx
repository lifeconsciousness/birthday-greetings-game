import React from 'react'

const Balloon = () => {
  return (
    <>
        <div className="balloonContainer" style={{left: `${Math.floor(Math.random() * 60)+13}vw`}}>
        <div className="balloon"><div className="balloonShade"></div></div>
        <div className="rope"></div>
      </div>
    </>
  )
}

export default Balloon