import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import useLink from '../../Hook/useLink'
import VidCard from '../Watch/VidData/VidCard'

interface LocationState {
    state: {
        q: string
    }
}

interface IResult {
    nextPageToken: string
    items: [{
        id: {
            videoId: string
        }
        snippet: {
            description: string
        }
    }]
}

const Result = () => {
    const location = useLocation() as LocationState
    const searchQuery = location.state.q
    const initSearch = {
        type: 'search',
        params: {
            part: 'snippet',
            maxResults: 24,
            q: searchQuery,
            type: 'video',
            fields: ['items(id(videoId), snippet(description))', 'nextPageToken']
        }
    }
    const { data, done } = useLink(initSearch)
    const [results, setResult] = useState<IResult | null>(null)

    useEffect(() => {
        if (done) {
            setResult(data)
        }
    }, [done])
    console.log(results)

    return (
        <>
            {results !== null ? results.items.map(item => {
                return (
                    <VidCard vidId={item.id.videoId} status='search' descrip={item.snippet.description}  key={item.id.videoId} />
                )
            }) : null}
        </>
    )
}

export default Result