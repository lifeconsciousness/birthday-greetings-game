import React from 'react'
import '../index.scss'
import { useEffect, useState, useRef, memo } from 'react'

type Props = {

}

type PropsPresent = {
    htmlId: string,
    left: number,
    size: number,
}

//write message to pop the balloon and message about controlls in the game
//make the initial 3,2,1 countdown
//make squares randomly generate on the top and fall with different velocity
//draw player stickman with hands trying to catch the present
//find/draw texture for presents and stage
//add animation to the character when it moves
//add some music and sfx

export default function Game({ }: Props) {

    //////////////////////////////player controls/////////////////////////////
    const windowWidth = window.innerWidth
    const playerWidth = 30
    const stepSize = 30
    const minPosition = 0;
    const maxPosition = windowWidth - playerWidth
    const playerRef = useRef<HTMLDivElement>(null)

    const [playerPosition, setPlayerPosition] = useState(windowWidth / 2)

    //keyboard controls
    const handleKeyDown = (event: any) => {
        if (event.key === 'A' || event.key === 'a') {
            if (playerPosition > minPosition + 5) {
                setPlayerPosition(playerPosition - stepSize)
            }
        }
        if (event.key === 'D' || event.key === 'd') {
            if (playerPosition < windowWidth - playerWidth - 5) {
                setPlayerPosition(playerPosition + stepSize)
            }
        }
    }

    //mobile controls
    const handleTouchStart = (event: any) => {
        if (event.touches.length > 2) {
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
        } else if (mouseIsDown) {
            setPlayerPosition(newPosition)
        }
    }

    //keyboard and mobile device controls
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('touchstart', handleTouchStart)
        document.addEventListener('touchmove', handleTouchMove)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('touchstart', handleTouchStart)
            document.removeEventListener('touchmove', handleTouchMove)
        }
    }, [playerPosition])

    //mouse controls
    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mousemove', handleMouseMove)

        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [mouseIsDown])
    /////////////////////////////////////////////////////////////////////////

    //////////////////////////////Game logic////////////////////////////////

    interface Present {
        id: string,
        left: number,
        size: number
    }
    const [presents, setPresents] = useState<Present[]>([])
    const spawnDelay = 4000
    const presentAmount = 1


    useEffect(() => {
        //generating the presents 
        const interval = setInterval(() => {
            const newPresents: any = []

            for (let i = 0; i < presentAmount; i++) {
                newPresents.push(
                    {
                        id: Math.random().toString(32).substring(2, 9),
                        left: Math.floor(Math.random() * 60) + 13,
                        size: Math.floor(Math.random() * 50) + 100
                    })
            }
            //updating existing present array with newly generated ones
            setPresents((prevPresents) => [...prevPresents, ...newPresents])
        }, spawnDelay)

        //clearing the interval to prevent memory leaks
        return () => clearInterval(interval)
    }, [])


    useEffect(() => {
        //generating the presents 
        const interval = setInterval(() => {
            setPresents((prevPresents) => prevPresents.filter((present) => {
                const presentElement = document.getElementById(`present-${present.id}`)

                //getting the coordinates of player and presents
                const presentRect = presentElement?.getBoundingClientRect()
                const playerRect = playerRef.current?.getBoundingClientRect()

                //if present reaches the bottom it is deleted
                if (presentRect && presentRect.top > window.innerHeight - 100) {
                    return false
                }
                //if present touches player it is deleted
                if (presentRect && playerRect && presentRect.bottom > playerRect.top && playerRect.left <= presentRect.right && playerRect.right >= presentRect.left) {
                    return false
                }

                return present
            }))
        }, 10)

        //clearing the interval to prevent memory leaks
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <div className="game-screen">
                <div className="presents-container">
                    {
                        presents.map(present => (
                            <Present htmlId={present.id} key={present.id} left={present.left} size={present.size} />
                        ))
                    }
                </div>
                <div className="player" ref={playerRef} style={{ left: `${playerPosition}px` }}></div>
                <div className="stage"></div>
            </div>
        </>
    )
}


const Present = React.memo(({ htmlId, left, size }: PropsPresent) => {
    return (
        <div
            id={`present-${htmlId}`}
            className="present"
            style={{
                animation: `present-fall ${3}s`,
                width: `${size}px`,
                left: `${left}vw`
            }}>
        </div>
    )
})

//spawning and deleting presents
//score
//defeat and restart button
//textures and css