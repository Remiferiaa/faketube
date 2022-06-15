import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useLink from '../../Hook/useLink'
import { IResponse } from '../../types/vid'
import ChIcon from './ChannelIcon'
import vidDuration from '../../Utils/timeFormat'
import { viewForm } from '../../Utils/numFormat'
import dateDiff from '../../Utils/dateFormat'

interface IVids {
    vidId: string
    status: string
    descrip?: string
}

const VidCard = ({ vidId, status, descrip }: IVids) => {
    const query = {
        type: 'videos',
        params: {
            part: ['snippet', 'contentDetails', 'statistics'],
            id: vidId
        }
    }
    const { rawData, done } = useLink(query)
    const [vid, setVid] = useState<IResponse | null>(null)

    useEffect(() => {
        if (done) {
            setVid(rawData)
        }
    }, [rawData, done]) 

    const searchCard = () => {
        return (
            <>
                {vid !== null && vid.items.length> 0?
                    <>
                        <>
                            <Link to={`/watch/${vidId}`} className='relative max-w-xs'>
                                <img src={vid.items[0].snippet.thumbnails.medium.url} alt='' className='min-w-search'></img>
                                <p className='absolute right-1 bottom-1 bg-black text-xxs font-bold text-white p-0.5'>{vidDuration(vid.items[0].contentDetails.duration)}</p>
                            </Link>
                            <div className='max-w-2xl p-2'>
                                <Link to={`/watch/${vidId}`}>
                                    <h1 className='font-normal text-ellipsis'>{vid.items[0].snippet.title}</h1>
                                    <div className='flex items-center gap-1'>
                                        <p>{viewForm(vid.items[0].statistics.viewCount)}</p>
                                        <p>·</p>
                                        <p>{dateDiff(vid.items[0].snippet.publishedAt)}</p>
                                    </div>
                                    <div className='flex'>
                                        <ChIcon chId={vid.items[0].snippet.channelId} type='title' />
                                    </div>
                                    <p>{descrip}</p>
                                </Link>
                            </div>
                        </>
                    </> : null}
            </>
        )
    }

    const relatedCard = () => {
        return (
            <>
                {vid !== null && vid.items.length> 0?
                    <>
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
                    </> : null}
            </>
        )
    }

    return (
        <>
            {status === 'related'? relatedCard() : searchCard()}
        </>
    )
}

export default VidCard