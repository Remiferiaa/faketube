import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from "react-router-dom"
import useLink from '../../Hook/useLink'
import VidCard from '../VidData/VidCard'

interface LocationState {
    state: {
        q: string
    }
}

interface IResult {
    id: {
        videoId: string
    }
    snippet: {
        description: string
    }
}

const Result = () => {
    const location = useLocation() as LocationState
    const searchQuery = location.state.q
    const initSearch = {
        type: 'search',
        params: {
            part: 'snippet',
            maxResults: 30,
            q: searchQuery,
            type: 'video',
            fields: ['items(id(videoId), snippet(description))', 'nextPageToken', 'pageInfo']
        }
    }

    const { data, done, max, loadMore, token, loading, fetcher } = useLink(initSearch)
    const obs = useRef<IntersectionObserver | null>()
    const [results, setResult] = useState<Array<IResult>>([])
    const [hasMore, setMore] = useState<boolean>(false)

    const newSearch = {
        type: 'search',
        params: {
            part: 'snippet',
            maxResults: 10,
            q: searchQuery,
            pageToken: token,
            type: 'video',
            fields: ['items(id(videoId), snippet(description))', 'nextPageToken']
        }
    }

    const lastRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return
            if (obs.current) obs.current.disconnect();
            obs.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore(newSearch)
                }
            });
            if (node) obs.current.observe(node);
        },
        [hasMore, loading]
    );

    useEffect(() => {
        if (done) {
            setResult(data)
        }
    }, [data, done])

    useEffect(() => {
        if (done && results.length > 0 && results.length < max) {
            setMore(true)
        } else {
            setMore(false)
        }
    }, [results, done, max])

    useEffect(() => {
        setResult([])
        fetcher()
    }, [location])

    return (
        <>
            {results.length > 0 ? results.map((item, i) => {
                if (results.length === i + 1) {
                    return (
                        <div ref={lastRef} key={item.id.videoId} >
                            <VidCard vidId={item.id.videoId} status='search' descrip={item.snippet.description} />
                        </div>
                    )
                } else {
                    return (
                        <div key={item.id.videoId} >
                            <VidCard vidId={item.id.videoId} status='search' descrip={item.snippet.description} />
                        </div>
                    )
                }
            }) :
                <div>
                    <p>No Results Found</p>
                </div>
            }
        </>
    )
}


export default Result