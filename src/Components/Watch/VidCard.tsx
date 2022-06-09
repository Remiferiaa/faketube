import { useState, useEffect } from 'react'
import useLink from '../../Data/useLink'

interface IVid {
    items: [{
        snippet: {
            thumbnails: {
                medium: {
                    url: string
                }
            }
        }
    }]
}



const Card = ({chId}: any) => {
    const query = {
        type: 'channels',
        params: {
            part: ['snippet', 'statistics'],
            id: chId
        }
    }

    const [vidData, setVid] = useState<IVid | null>(null)
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