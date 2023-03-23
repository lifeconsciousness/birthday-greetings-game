import '../index.scss'
import { useEffect, useState, useRef, memo } from 'react'
import RestartBtn from '/restart.png'
import PlayerImg from '/player.png'
import Present from './Present'

type Props = {

}

export default function Game({ }: Props) {

    //////////////////////////////player controls/////////////////////////////
    const windowWidth = window.innerWidth
    const playerWidth = 30
    const stepSize = 30
    const minPosition = 0;
    const maxPosition = windowWidth - playerWidth
    const playerRef = useRef<HTMLImageElement>(null)

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
    //Game logic////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    //declarations

    interface Present {
        id: string,
        left: number,
        size: number,
        animationDelay: number,
        animationLength: number,
    }
    //0 is game, -1 - defeat, 1 - wictory
    const [win, setWin] = useState(0)

    const [presents, setPresents] = useState<Present[]>([])
    const [score, setScore] = useState(0)
    const [spawnDelay, setSpawnDelay] = useState(Math.floor(Math.random() * 2300) + 700)
    const [firstTime, setFirstTime] = useState(false)
    const [presentAmount, setPresentAmount] = useState(Math.floor(Math.random() * 3) + 2)

    ////////////////////////Generating and deleting presents////////////////////

    function generatePresents() {
        // setPresentAmount(Math.floor(Math.random() * 5) + 1)
        // setSpawnDelay(Math.floor(Math.random() * 2300) + 700)
        const newPresents: any = []

        for (let i = 0; i < presentAmount; i++) {
            if (i === 1) { setFirstTime(false) }

            const randAmount = Math.floor(Math.random() * 5) + 3
            const randDelay = Math.floor(Math.random() * 1500) + 700
            setPresentAmount(randAmount)
            setSpawnDelay(randDelay)

            newPresents.push(
                {
                    id: Math.random().toString(32).substring(2, 9),
                    left: Math.floor(Math.random() * 70) + 10,
                    size: Math.floor(Math.random() * 50) + 100,
                    animationDelay: firstTime ? 0 : Math.floor(Math.random() * 4) + 1,
                    animationLength: Math.floor(Math.random() * 4) + 1.8,
                })
        }
        //updating existing present array with newly generated ones
        setPresents((prevPresents) => [...prevPresents, ...newPresents])
    }

    //constantly generating the presents and checking if the player lost the game
    useEffect(() => {
        const interval = setInterval(() => {
            if (win === 0) {
                generatePresents()
            }
        }, spawnDelay)

        //clearing the interval to prevent memory leaks
        return () => clearInterval(interval)
    }, [win])

    //check presents if they reached the certain position
    useEffect(() => {
        //every 10 ms present array is filtered
        const interval = setInterval(() => {
            setPresents((prevPresents) => prevPresents.filter((present) => {
                const presentElement = document.getElementById(`present-${present.id}`)

                //getting the coordinates of player and presents
                const presentRect = presentElement?.getBoundingClientRect()
                const playerRect = playerRef.current?.getBoundingClientRect()

                //if present reaches the bottom it is deleted
                if (presentRect && presentRect.top > window.innerHeight - 100) {
                    setScore((prevScore) => prevScore - 9)
                    return false
                }
                //if present touches player it is deleted
                if (presentRect && playerRect && presentRect.bottom > playerRect.top && playerRect.left <= presentRect.right && playerRect.right >= presentRect.left) {
                    setScore((prevScore) => prevScore + 1)
                    return false
                }

                return present
            }))
        }, 10)

        return () => clearInterval(interval)
    }, [])

    ////////////////////////stopping and reseting the game/////////////////////
    useEffect(() => {
        if (score < 0) {
            setWin(-1)
            setPresents([])
            setPlayerPosition(windowWidth / 2 - 15)
        }
        if (score >= 0) {
            setWin(0)
        }
        else if (score > 512) {
            setWin(1)
        }
    }, [score])


    //////////////////////Main game components put together//////////////////////////
    return (
        <>
            <div className="game-screen">
                <div className="presents-container">
                    {
                        presents.map(present => (
                            <Present htmlId={present.id} key={present.id} left={present.left} size={present.size} animationDelay={present.animationDelay} animationLength={present.animationLength} />
                        ))
                    }
                </div>
                <img className="player" ref={playerRef} style={{ left: `${playerPosition}px` }} src={PlayerImg}></img>
                <div className="stage"></div>
                <h2 className='score'>Score: {score}</h2>
                <div className="info-and-restart">
                    <h1 className="win-message">{
                        win === -1 ? 'You lost' :
                            win === 1 ? 'Wow, you either modified the code or you are a persistent one. In any case, my congratulations!' : ''}
                    </h1>
                    <img src={RestartBtn}
                        alt="restart button"
                        className='restart-button'
                        onClick={() => { setScore(0); setFirstTime(true) }}
                        style={{ display: win === -1 ? 'block' : win === 1 ? 'block' : 'none' }}
                    />
                </div>
            </div>
        </>
    )
}



//add highest score system (green color of the score if it is the highes, after win or lose display the highest score stored in localstorage)
//Use mouse, A/D keys or touch to control the player. Reach the score 512 to win.
//Display the message: You won! But is that all?
//Then when you reach 1024 - another message
//2056- persistent
//draw player stickman with hands trying to catch the present
//find/draw texture for presents and stage
//add animation to the character when it moves
//try to remove the delay before presents spawn
//present rain (spawn delay 0)
//add some music add button to turn it on and off
//add readme with the description


