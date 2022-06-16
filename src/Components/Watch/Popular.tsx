import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useLink from '../../Hook/useLink'
import dateDiff from '../../Utils/dateFormat'
import { viewForm } from '../../Utils/numFormat'
import vidDuration from '../../Utils/timeFormat'
import ChIcon from '../VidData/ChannelIcon'
import { IResponse } from '../../types/vid'

const queries = {
    type: 'videos',
    params: {
        part: ['snippet', 'contentDetails', 'statistics'],
        chart: 'mostPopular',
        maxResults: 24,
        fields: ['items', 'nextPageToken', 'pageInfo']
    }
}

const Popular = () => {
    const { data, done, loadMore, token, max, loading } = useLink(queries)
    const obs = useRef<IntersectionObserver | null>()
    const [list, setList] = useState<IResponse['items'] | null>(null)
    const [hasMore, setMore] = useState<boolean>(false)
    const newQueries = {
        type: 'videos',
        params: {
            part: ['snippet', 'contentDetails', 'statistics'],
            chart: 'mostPopular',
            maxResults: 24,
            pageToken: token,
            fields: ['items', 'nextPageToken', 'pageInfo']
        }
    }

    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return
            if (obs.current) obs.current.disconnect();
            obs.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore(newQueries)
                }
            });
            if (node) obs.current.observe(node);
        },
        [hasMore, loading]
    );

    useEffect(() => {
        if (done) {
            setList(data)
        }
    }, [data, done])

    useEffect(() => {
        if (done && list !== null && list.length < max) {
            setMore(true)
        } else {
            setMore(false)
        }
    }, [list, done, max])

    const display = () => {
        if (list !== null) {
            return (
                <div className='pt-4 border-t border-black border-opacity-10 grid grid-cols-[repeat(auto-fit,_300px)] w-full justify-center gap-4 bg-content'>
                    {list.map((item, i) => {
                        if (list.length === i + 1) {
                            return (
                                <div key={item.id} ref={lastElementRef}>
                                    <Link to={`/watch/${item.id}`} className='relative'>
                                        <img src={`${item.snippet.thumbnails.medium.url}`} alt=""></img>
                                        <p className='absolute right-1 bottom-1 bg-black text-xxs font-bold text-white p-0.5'>{vidDuration(item.contentDetails.duration)}</p>
                                    </Link>
                                    <div>
                                        <Link to={`/watch/${item.id}`}  className='flex gap-2 mt-1'>
                                            <ChIcon chId={item.snippet.channelId}/>
                                            <div className='text-xs'>
                                                <h1 className='line-clamp-2 overflow-hidden whitespace-normal text-ellipsis font-bold text-sm max-h-[2.5rem]'>{item.snippet.title}</h1>
                                                <p>{item.snippet.channelTitle}</p>
                                                <div  className='flex items-center gap-1'>
                                                    <p>{viewForm(item.statistics.viewCount)}</p>
                                                    <p>·</p>
                                                    <p>{dateDiff(item.snippet.publishedAt)}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={item.id}>
                                    <Link to={`/watch/${item.id}`} className='relative'>
                                        <img src={`${item.snippet.thumbnails.medium.url}`} alt=""></img>
                                        <p className='absolute right-1 bottom-1 bg-black text-xxs font-bold text-white p-0.5'>{vidDuration(item.contentDetails.duration)}</p>
                                    </Link>
                                    <div>
                                        <Link to={`/watch/${item.id}`}  className='flex gap-2 mt-1'>
                                            <ChIcon chId={item.snippet.channelId}/>
                                            <div className='text-xs'>
                                                <h1 className='line-clamp-2 overflow-hidden whitespace-normal text-ellipsis font-bold text-sm max-h-[2.5rem]'>{item.snippet.title}</h1>
                                                <p>{item.snippet.channelTitle}</p>
                                                <div  className='flex items-center gap-1'>
                                                    <p>{viewForm(item.statistics.viewCount)}</p>
                                                    <p>·</p>
                                                    <p>{dateDiff(item.snippet.publishedAt)}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            )
        }
    }
    return (
        <>
            {display()}
        </>
    )
}
export default Popular