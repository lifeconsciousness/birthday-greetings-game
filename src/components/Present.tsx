import React from 'react'

type Props = {
    htmlId: string,
    left: number,
    size: number,
    animationDelay: number,
    animationLength: number,
}

//react memo to persist the position throughout renders
const Present = React.memo(({ htmlId, left, size, animationDelay, animationLength }: Props) => {
    return (
        <img
            id={`present-${htmlId}`}
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