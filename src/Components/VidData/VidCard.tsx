import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useLink from '../../Hook/useLink'
import { IResponse } from '../../types/vid'
import ChIcon from './ChannelIcon'
import vidDuration from '../../Utils/timeFormat'
import { viewForm } from '../../Utils/numFormat'
import useWindowSize from '../../Hook/useWindowSize'
import dateDiff from '../../Utils/dateFormat'

interface IVids {
    vidId: string
    status: string
    descrip?: string
}

const VidCard = ({ vidId, status, descrip }: IVids) => {
    const {screen} = useWindowSize()
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
                {vid !== null && vid.items.length > 0 ?
                    <>
                        <>
                            <Link to={`/watch/${vidId}`} className={`relative ${screen < 400 ? 'w-[240px] h-[135px]' :''}`}>
                                <img src={vid.items[0].snippet.thumbnails.medium.url} alt='' className={`${screen < 400 ? 'w-full h-full' : 'max-w-[320px]'}`}></img>
                                <p className='absolute right-1 bottom-1 bg-black text-xxs font-bold p-0.5'>{vidDuration(vid.items[0].contentDetails.duration)}</p>
                            </Link>
                            <div className={`${screen < 400 ? 'max-w-[100px] p-1': 'max-w-2xl p-2'}`}>
                                <Link to={`/watch/${vidId}`}>
                                    <h1 className='font-normal line-clamp-2 overflow-hidden pb-1'>{vid.items[0].snippet.title}</h1>
                                    <div className='flex items-center gap-1 text-xs text-textCol whitespace-nowrap overflow-hidden py-1'>
                                        <p>{viewForm(vid.items[0].statistics.viewCount)}</p>
                                        <p>·</p>
                                        <p>{dateDiff(vid.items[0].snippet.publishedAt)}</p>
                                    </div>
                                    <div className='flex py-1 text-xs'>
                                        <ChIcon chId={vid.items[0].snippet.channelId} type='title' />
                                    </div>
                                    <p className='line-clamp-2 text-xs overflow-hidden text-ellipsis max-h-[2rem] py-1 text-textCol'>{descrip}</p>
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
                {vid !== null && vid.items.length > 0 ?
                    <>
                        <>
                            <div className='relative'>
                                <Link to={`/watch/${vidId}`}>
                                    <img src={vid.items[0].snippet.thumbnails.medium.url} alt='' className='max-w-[160px]'></img>
                                    <p className='absolute right-1 bottom-1 bg-black text-xxs font-bold p-0.5'>{vidDuration(vid.items[0].contentDetails.duration)}</p>
                                </Link>
                            </div>
                            <Link to={`/watch/${vidId}`}>
                                <div className='flex flex-col justify-center'>
                                    <h1 className='line-clamp-2 text-sm overflow-hidden text-ellipsis font-bold max-h-[2.5rem] mb-1'>{vid.items[0].snippet.title}</h1>
                                    <p className='font-light text-xs  overflow-hidden text-ellipsis'>{vid.items[0].snippet.channelTitle}</p>
                                    <div className='flex items-center gap-1'>
                                        <p className='font-light text-xs'>{viewForm(vid.items[0].statistics.viewCount)}</p>
                                        <p>·</p>
                                        <p className='font-light text-xs'>{dateDiff(vid.items[0].snippet.publishedAt)}</p>
                                    </div>
                                </div>
                            </Link>
                        </>
                    </> : null}
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