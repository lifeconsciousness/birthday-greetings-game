import { useState, useEffect } from 'react'

type Props = {}

function CongatulationText({ }: Props) {
    const [text, setText] = useState('Happy birthday!')
    const [switchingDelay, setSwitchingDelay] = useState(3500)

    useEffect(() => {
        const interval = setInterval(() => {
            if (text === 'Happy birthday!') {
                setText('Pop the balloon ;)')
                setSwitchingDelay(1000)
            }
            if (text === 'Pop the balloon ;)') {
                setText('Happy birthday!')
                setSwitchingDelay(2000)
            }
        }, switchingDelay)

        return () => clearInterval(interval)
    }, [text])

    return (
        <h1 className="congratulation-text">{text}</h1>
    )
}

export default CongatulationText