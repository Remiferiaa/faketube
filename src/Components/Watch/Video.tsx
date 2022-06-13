import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useLink from '../../Hook/useLink'
import { IResponse } from '../../types/vid'
import { datePosted } from '../../Utils/dateFormat'
import ChIcon from '../VidData/ChannelIcon'
import { viewForm } from '../../Utils/numFormat'
import Related from '../VidData/Related'

const Vid = () => {
    const [curVid, setCur] = useState<IResponse['items'] | null>(null)
    const vidId = useParams().id
    const query = {
        type: 'videos',
        params: {
            part: ['snippet', 'contentDetails', 'statistics'],
            id: vidId,
        }
    }
    const { data, done } = useLink(query)

    useEffect(() => {
        if (done)
            setCur(data)
    }, [done, data])

    return (
        <>
            {curVid !== null ? (
                <>
                    <div>
                        <iframe width="640" height="360"
                            allow='autoplay'
                            src={`https://www.youtube.com/embed/${vidId}?autoplay=1`}
                            frameBorder="0" allowFullScreen>
                        </iframe>
                        <div>
                            <h1>{curVid[0].snippet.title}</h1>
                            <div>
                                <div>
                                    <p>{Number(curVid[0].statistics.viewCount).toLocaleString()}</p>
                                    <p>{datePosted(curVid[0].snippet.publishedAt)}</p>
                                </div>
                                <div>
                                    <div>
                                        <div>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                                                <g>
                                                    <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z">
                                                    </path>
                                                </g>
                                            </svg >
                                        </div>
                                        <p>{viewForm(curVid[0].statistics.likeCount)}</p>
                                    </div>
                                    <div>
                                        <div>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                                                <g >
                                                    <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                        <p>DISLIKE</p>
                                    </div>
                                    <div>
                                        <div>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                                                <g mirror-in-rtl="">
                                                    <path d="M15,5.63L20.66,12L15,18.37V15v-1h-1c-3.96,0-7.14,1-9.75,3.09c1.84-4.07,5.11-6.4,9.89-7.1L15,9.86V9V5.63 M14,3v6 C6.22,10.13,3.11,15.33,2,21c2.78-3.97,6.44-6,12-6v6l8-9L14,3L14,3z" >
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                        <p>SHARE</p>
                                    </div>
                                    <div>
                                        <div>
                                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                                                <g>
                                                    <path d="M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </div>
                                        <p>SAVE</p>
                                    </div>
                                    <div>
                                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                                            <g>
                                                <path d="M7.5,12c0,0.83-0.67,1.5-1.5,1.5S4.5,12.83,4.5,12s0.67-1.5,1.5-1.5S7.5,11.17,7.5,12z M12,10.5c-0.83,0-1.5,0.67-1.5,1.5 s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5S12.83,10.5,12,10.5z M18,10.5c-0.83,0-1.5,0.67-1.5,1.5s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5 S18.83,10.5,18,10.5z">
                                                </path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <ChIcon chId={curVid[0].snippet.channelId} type='details' />
                                <button type='button'>SUBSCRIBE</button>
                            </div>
                            <p>{curVid[0].snippet.description}</p>
                        </div>
                    </div>
                    <Related vidId={curVid[0].id}/>
                    <p>{window.innerHeight}</p>
                    <p>{window.innerWidth}</p>
                </>
            ) : null}
        </>
    )
}

export default Vid

