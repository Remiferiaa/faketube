import { useState, useEffect } from 'react'
import useLink from '../../Data/useLink'

const Card = ({chId}: any) => {
    const query = {
        type: 'channels',
        params: {
            part: ['snippet', 'statistics'],
            id: chId
        }
    }

    const [vidData, setVid] = useState<any>()
    const { data, done } = useLink(query)
    useEffect(() => {
        if (done) {
            setVid(data)
        }
    }, [done])

    return (
        <>
            {done ?
                <img src={vidData?.items[0].snippet.thumbnails.medium.url} alt=""></img>
            : null}
        </>
    )
}

export default Card