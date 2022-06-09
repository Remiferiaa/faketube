import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useLink from '../../Data/useLink'
import dateDiff from '../../Utils/dateFormat'
import { viewForm } from '../../Utils/numFormat'
import time from '../../Utils/timeFormat'
import Card from './VidCard'

//'https://www.googleapis.com/youtube/v3/[videos]?part=snippet,contentDetails&chart=mostPopular&maxResults=[24]&fields=items(id,snippet)&key=[apikey]' 
const queries = {
    type: 'videos',
    params: {
        part: ['snippet', 'contentDetails', 'statistics'],
        chart: 'mostPopular',
        maxResults: 24,
        fields: ['items', 'nextPageToken']
    }
}

interface IList {
    items: [{
        id: string
        snippet: {
            title: string
            channelId: string
            publishedAt: string
            thumbnails: {
                medium: {
                    url: string
                }
            }
            channelTitle: string
        }
        contentDetails: {
            duration: string
        }
        statistics: {
            viewCount: number
        }
    }]
    nextPageToken: string
}

const Popular = () => {
    const { data, done } = useLink(queries)
    const [list, setList] = useState<IList | null>(null)

    useEffect(() => {
        if (done) {
            setList(data)
        }
    }, [data])

    const display = () => {
        return (
            <>
                {list?.items.map((item) => {
                    return (
                        <div key={item.id}>
                            <img src={`${item.snippet.thumbnails.medium.url}`} alt=""></img>
                            <p>{time(item.contentDetails.duration)}</p>
                            <div>
                                <Card chId={item.snippet.channelId} />
                                <div>
                                    <h1>{item.snippet.title}</h1>
                                    <p>{item.snippet.channelTitle}</p>
                                    <div>
                                        <p>{viewForm(item.statistics.viewCount)}</p>
                                        <p>{dateDiff(item.snippet.publishedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }
    return (
        <>
            {list !== null ? display() : null}
        </>
    )
}
export default Popular


