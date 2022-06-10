import { useState, useEffect } from 'react'
import useLink from '../../../Hook/useLink'

interface ICh {
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

interface Props {
    chId: string,
}


const ChIcon = ({chId}: Props) => {
    const query = {
        type: 'channels',
        params: {
            part: ['snippet', 'statistics'],
            id: chId
        }
    }

    const [chData, setCh] = useState<ICh | null>(null)
    const { data, done } = useLink(query)
    useEffect(() => {
        if (done) {
            setCh(data)
        }
    },  [data, done])

    return (
        <>
            {done ?
                <img src={chData?.items[0].snippet.thumbnails.medium.url} alt=""></img>
            : null}
        </>
    )
}

export default ChIcon