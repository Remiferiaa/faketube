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
                <>
                    {list.map((item, i) => {
                        if (list.length === i + 1) {
                            return (
                                <div key={item.id} ref={lastElementRef}>
                                    <Link to={`/watch/${item.id}`}>
                                        <img src={`${item.snippet.thumbnails.medium.url}`} alt=""></img>
                                        <p>{vidDuration(item.contentDetails.duration)}</p>
                                    </Link>
                                    <div>
                                        <Link to={`/watch/${item.id}`}>
                                            <ChIcon chId={item.snippet.channelId} type='icon' />
                                            <div>
                                                <h1>{item.snippet.title}</h1>
                                                <p>{item.snippet.channelTitle}</p>
                                                <div>
                                                    <p>{viewForm(item.statistics.viewCount)}</p>
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
                                    <Link to={`/watch/${item.id}`}>
                                        <img src={`${item.snippet.thumbnails.medium.url}`} alt=""></img>
                                        <p>{vidDuration(item.contentDetails.duration)}</p>
                                    </Link>
                                    <div>
                                        <Link to={`/watch/${item.id}`}>
                                            <ChIcon chId={item.snippet.channelId} />
                                            <div>
                                                <h1>{item.snippet.title}</h1>
                                                <p>{item.snippet.channelTitle}</p>
                                                <div>
                                                    <p>{viewForm(item.statistics.viewCount)}</p>
                                                    <p>{dateDiff(item.snippet.publishedAt)}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </>
            )
        }
    }
    return (
        <>
            {list !== null ? display() : null}
        </>
    )
}
export default Popular