import React from 'react'
import '../index.scss' 

type Props = {
    onLoading: boolean
}

function Loader({onLoading}: Props) {
  return (
    <>
        <div className={onLoading ? "loading-screen fadeOutAnimation" : 'loading-screen'}>
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
    </>
  )
}

export default Loader