import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useLink from '../../Hook/useLink'
import dateDiff from '../../Utils/dateFormat'
import { viewForm } from '../../Utils/numFormat'
import vidDuration from '../../Utils/timeFormat'
import ChIcon from './VidData/ChannelIcon'
import { IList } from '../../types/vid'

const queries = {
    type: 'videos',
    params: {
        part: ['snippet', 'contentDetails', 'statistics'],
        chart: 'mostPopular',
        maxResults: 24,
        fields: ['items', 'nextPageToken']
    }
}



const Popular = () => {
    const { data, done } = useLink(queries)
    const [list, setList] = useState<IList | null>(null)

    useEffect(() => {
        if (done) {
            setList(data)
        }
    }, [done])

    const display = () => {
        return (
            <>
                {list?.items.map((item) => {
                    return (
                        <div key={item.id}>
                            <img src={`${item.snippet.thumbnails.medium.url}`} alt=""></img>
                            <p>{vidDuration(item.contentDetails.duration)}</p>
                            <div>
                                <ChIcon chId={item.snippet.channelId}/>
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


