import React from 'react'
import present0 from '/present0.png'
import present1 from '/present1.png'
import present2 from '/present2.png'
import present3 from '/present3.png'


type Props = {
    htmlId: string,
    left: number,
    size: number,
    animationDelay: number,
    animationLength: number,
}

//react memo to persist the position throughout renders
const Present = React.memo(({ htmlId, left, size, animationDelay, animationLength }: Props) => {
    const randNum = Math.floor(Math.random() * 4) + 1

    return (
        <img
            id={`present-${htmlId}`}
            src={
                randNum === 1 ? present0 :
                    randNum === 2 ? present1 :
                        randNum === 3 ? present2 : present3
            }
            className="present"
            style={{
                animation: `present-fall ${animationLength}s`,
                width: `${size}px`,
                left: `${left}vw`,
                animationDelay: `${animationDelay}s`,
            }}>
        </img>
    )
})

export default Present