import React from 'react'
import '../index.scss' 
import { useEffect, useState } from 'react'


type Props = {}

export default function Game({}: Props) {
    const windowWidth =  window.innerWidth
    const playerWidth = 30
    const stepSize = 30
    const minPosition = 0;
    const maxPosition = windowWidth - playerWidth;

    //make transition animation
    //set a rand position every time
    //make phone compatible controls
    //implement mouse control instead of keys
    const [playerPosition, setPlayerPosition] = useState(windowWidth/2)

    //keyboard controls
    const handleKeyDown = (event: any) => {
        if(event.key === 'A' || event.key === 'a'){
            if(playerPosition > minPosition+5){
                setPlayerPosition(playerPosition-playerWidth)
            }
        }
        if(event.key === 'D' || event.key === 'd'){
            if(playerPosition < windowWidth-playerWidth-5){
                setPlayerPosition(playerPosition+stepSize)
            }
        }
    }

    //mobile controls
    const handleTouchStart = (event: any) => {
        if(event.touches.length > 1){
            setPlayerPosition(event.touches[0].clientX)
        }
    };
    const handleTouchMove = (event: any) => {
        const newPosition = event.touches[0].clientX;

        // ensure that the new position is within the screen boundaries
        if (newPosition < minPosition) {
            setPlayerPosition(minPosition);
        } else if (newPosition > maxPosition) {
            setPlayerPosition(maxPosition);
        } else {
            setPlayerPosition(newPosition);
        }
    };

    //mouse controls
    const [mouseIsDown, setMouseIsDown] = useState(false)

    const handleMouseDown = (event: any) => {
        setMouseIsDown(true)
    }
    const handleMouseUp = (event: any) => {
        setMouseIsDown(false)
    }
    const handleMouseMove = (event: any) => {
        const newPosition = event.clientX
        
        if (newPosition > maxPosition) {
            setPlayerPosition(maxPosition);
        } else if(mouseIsDown){
            setPlayerPosition(newPosition)
        }
    }
    
    //keyboard and mobile device controls
    useEffect(()=> {
        document.addEventListener('keydown', handleKeyDown, true)
        document.addEventListener('touchstart', handleTouchStart)
        document.addEventListener('touchmove', handleTouchMove)

        return () => {
            document.removeEventListener('keydown', handleKeyDown, true)
            document.removeEventListener('touchstart', handleTouchStart)
            document.removeEventListener('touchmove', handleTouchMove)
        }
    }, [playerPosition])

    //mouse controls
    useEffect(()=> {
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mousemove', handleMouseMove)

        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [mouseIsDown])

    return (
        <>
            <div className="game-screen">
                <div className="stage"></div>
                <div className="player" style={{left: `${playerPosition}px`}}></div>
            </div>
        </>
    )
}