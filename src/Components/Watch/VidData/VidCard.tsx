import { useState, useEffect } from 'react'
import useLink from '../../../Hook/useLink'
import { IList } from '../../../types/vid'
import ChIcon from './ChannelIcon'
import vidDuration from '../../../Utils/timeFormat'
import { viewForm } from '../../../Utils/numFormat'
import dateDiff from '../../../Utils/dateFormat'

interface IVids {
    vidId: string
    status: string
    descrip: string
}

const VidCard = ({vidId, status, descrip}: IVids) => {
    const query = {
        type: 'videos',
        params: {
            part: ['snippet', 'contentDetails', 'statistics'],
            id: vidId
        }
    }
    const { data, done } = useLink(query)
    const [vid, setVid] = useState<IList | null>(null)

    useEffect(() => {
        if (done) {
            setVid(data)
        }
    }, [done])

    const searchCard = () => {
        console.log(vidId)
        return (
            <>
                {vid !== null ?
                    <div>
                        <div>
                            <img src={vid.items[0].snippet.thumbnails.medium.url} alt=''></img>
                            <p>{vidDuration(vid.items[0].contentDetails.duration)}</p>
                            <div>
                                <h1>{vid.items[0].snippet.title}</h1>
                                <div>
                                    <p>{viewForm(vid.items[0].statistics.viewCount)}</p>
                                    <p>{dateDiff(vid.items[0].snippet.publishedAt)}</p>
                                </div>
                                <div>
                                    <ChIcon chId={vid.items[0].snippet.channelId} />
                                    <p>{vid.items[0].snippet.channelTitle}</p>
                                </div>
                                <p>{descrip}</p>
                            </div>
                        </div>
                    </div> : null}
            </>
        )
    }

    const relatedCard = () => {
        return (
            <>
                {vid !== null ?
                    <div>
                        <div>
                            <img src={vid.items[0].snippet.thumbnails.default.url} alt=''></img>
                            <p>{vidDuration(vid.items[0].contentDetails.duration)}</p>
                            <div>
                                <h1>{vid.items[0].snippet.title}</h1>
                                <p>{vid.items[0].snippet.channelTitle}</p>
                                <div>
                                    <p>{viewForm(vid.items[0].statistics.viewCount)}</p>
                                    <p>{dateDiff(vid.items[0].snippet.publishedAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div> : null}
            </>
        )
    }

    return (
        <>
            {status === 'related' ? relatedCard() : searchCard()}
        </>
    )
}

export default VidCard