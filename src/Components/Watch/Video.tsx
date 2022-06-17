import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useLink from '../../Hook/useLink'
import { IResponse } from '../../types/vid'
import { datePosted } from '../../Utils/dateFormat'
import ChIcon from '../VidData/ChannelIcon'
import { viewForm } from '../../Utils/numFormat'
import Related from '../VidData/Related'
import Comments from '../VidData/Comments'
import useWindowSize from '../../Hook/useWindowSize'

const Vid = () => {
    const { screen } = useWindowSize()
    const [curVid, setCur] = useState<IResponse['items'] | null>(null)
    const [descrip, setDescrip] = useState<boolean>(false)
    const vidId = useParams().id
    const query = {
        type: 'videos',
        params: {
            part: ['snippet', 'contentDetails', 'statistics'],
            id: vidId,
        }
    }
    const { data, done, fetcher } = useLink(query)

    useEffect(() => {
        if (done)
            setCur(data)
    }, [done, data])

    useEffect(() => {
        fetcher()
    }, [vidId])

    const showDescrip = () => {
        if (descrip === true) {
            setDescrip(false)
        } else {
            setDescrip(true)
        }
    }

    return (
        <>
            {curVid !== null ? (
                <div className={`pr-6 pt-6 flex w-full gap-6  ${screen < 800 ? '' : 'justify-center'}`}>
                    <div className={`${screen < 800 ? 'max-w-[480] max-h-[320px]' : 'max-w-7xl max-h-[720px]'}`}>
                        <div className='pb-[56.25%] overflow-hidden h-0 relative w-full'>
                            <iframe
                                allow='autoplay'
                                src={`https://www.youtube.com/embed/${vidId}?autoplay=1`}
                                frameBorder="0" allowFullScreen className='left-0 top-0 h-full w-full absolute '>
                            </iframe>
                        </div>
                        <div className='mt-4'>
                            <h1 className='text-lg pb-4'>{curVid[0].snippet.title}</h1>
                            <div className='flex justify-between border-b border-white border-opacity-20 mb-4 pb-4'>
                                <div className='flex text-sm text-textCol gap-1'>
                                    <p>{Number(curVid[0].statistics.viewCount).toLocaleString()} views</p>
                                    <p>·</p>
                                    <p>{datePosted(curVid[0].snippet.publishedAt)}</p>
                                </div>
                                <div className='flex text-sm gap-1'>
                                    <div className='flex gap-2 items-center cursor-pointer'>
                                        <div className='h-6 w-6'>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                                                <g>
                                                    <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65
                                                    L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20
                                                    H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06
                                                    C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46
                                                    C19.92,12.61,20.05,12.86,19.98,13.17z">
                                                    </path>
                                                </g>
                                            </svg >
                                        </div>
                                        <p>{viewForm(curVid[0].statistics.likeCount)}</p>
                                    </div>
                                    <div className='flex gap-2 items-center cursor-pointer'>
                                        <div className='h-6 w-6'>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                                                <g >
                                                    <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94
                                                    C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67
                                                    C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29
                                                    H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5
                                                    H16v8.61L10.4,19.67z M20,13h-3V5h3V13z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                        <p>DISLIKE</p>
                                    </div>
                                    <div className='flex gap-2 items-center cursor-pointer'>
                                        <div className='h-6 w-6'>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                                                <g mirror-in-rtl="">
                                                    <path d="M15,5.63L20.66,12L15,18.37V15v-1h-1c-3.96,0-7.14,1-9.75,3.09c1.84-4.07,5.11-6.4,9.89-7.1L15,9.86V9V5.63 
                                                    M14,3v6 C6.22,10.13,3.11,15.33,2,21c2.78-3.97,6.44-6,12-6v6l8-9L14,3L14,3z" >
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                        <p>SHARE</p>
                                    </div>
                                    <div className='flex gap-2 items-center cursor-pointer'>
                                        <div className='h-6 w-6'>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                                                <g>
                                                    <path d="M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                        <p>SAVE</p>
                                    </div>
                                    <div className='h-6 w-6 cursor-pointer'>
                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                                            <g>
                                                <path d="M7.5,12c0,0.83-0.67,1.5-1.5,1.5S4.5,12.83,4.5,12s0.67-1.5,1.5-1.5S7.5,11.17,7.5,12z 
                                                M12,10.5c-0.83,0-1.5,0.67-1.5,1.5 s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5S12.83,10.5,12,10.5z 
                                                M18,10.5c-0.83,0-1.5,0.67-1.5,1.5s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5 S18.83,10.5,18,10.5z">
                                                </path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col mb-4 pb-4 border-b border-white border-opacity-20'>
                            <div className='flex justify-between mt-1'>
                                <ChIcon chId={curVid[0].snippet.channelId} type='details' />
                                <button type='button' className='bg-red-600 text-white px-4 py-2.5 text-sm self-center'>SUBSCRIBE</button>
                            </div>
                            <p className={`ml-16 max-w-[615px] break-all 
                                ${descrip ? '' : 'line-clamp-2 overflow-hidden text-ellipsis'}`}>
                                {curVid[0].snippet.description}</p>
                            <button type='button' onClick={() => showDescrip()} className='ml-16 pt-2 border-none text-sm text-start'>{descrip ? 'Show Less' : 'Show More'}</button>
                        </div>
                        {screen < 800 ?
                            <div>
                                <Related vidId={curVid[0].id} />
                            </div>
                            :
                            null}
                        <Comments vidId={curVid[0].id} total={curVid[0].statistics.commentCount} />
                    </div>
                    {screen > 800 ? <Related vidId={curVid[0].id} /> : null}
                </div>
            ) : null}
        </>
    )
}

export default Vid

