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
            maxResults: 20,
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
        <div className='flex flex-col justify-center items-center font-light bg-content p-4 w-full'>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-start pt-2 pb-2 border-b border-gray-500'>
                    <div className='h-6 w-6'>
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                            <g>
                                <path d="M15,17h6v1h-6V17z M11,17H3v1h8v2h1v-2v-1v-2h-1V17z M14,8h1V6V5V3h-1v2H3v1h11V8z M18,5v1h3V5H18z 
                            M6,14h1v-2v-1V9H6v2H3v1h3V14zM10,12h11v-1H10V12z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <p className='font-bold'>FILTERS</p>
                </div>
                {results.length > 0 ? results.map((item, i) => {
                    if (results.length === i + 1) {
                        return (
                            <div ref={lastRef} key={item.id.videoId} className='flex'>
                                <VidCard vidId={item.id.videoId} status='search' descrip={item.snippet.description} />
                            </div>
                        )
                    } else {
                        return (
                            <div key={item.id.videoId} className='flex'>
                                <VidCard vidId={item.id.videoId} status='search' descrip={item.snippet.description} />
                            </div>
                        )
                    }
                }) :
                    <div>
                        <p>No Results Found</p>
                    </div>
                }
            </div>
        </div>
    )
}


export default Result



