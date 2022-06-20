import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useWindowSize from '../../Hook/useWindowSize'
import { ISidebar } from '../../types/vid'

const Side = ({ sideState, setSide, showSide, setShow }: ISidebar) => {
    const location = useLocation()
    const { screen } = useWindowSize()
    const [visible, setVisible] = useState<boolean>(true)

    useEffect(() => {
        if (screen > 0 && showSide === true) {
            if (screen < 1300) {
                setSide('coll')
            }
            if (screen > 1300) {
                setSide('full')
            }
            if (screen < 800) {
                setVisible(false)
            }
            if (screen > 800) {
                setVisible(true)
            }
        }
    }, [screen, visible])

    useEffect(() => {
        if (location.pathname.includes('/watch')) {
            setVisible(false)
            setShow(false)
        } else {
            setShow(true)
            setVisible(true)
        }
    }, [location.pathname])

    const side = () => {
        return (
            <>
                <div className={`${visible ? 'visible' : 'invisible !w-0'} ${sideState}Side bg-bars `}>
                    <div className={`${sideState}SideHolder`}>
                        <Link to='/' className={`${sideState}SideSVG`}>
                            <div className='h-6 w-6'>
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                                    <g>
                                        <path d="M4,10V21h6V15h4v6h6V10L12,3Z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                        </Link>
                        <Link to='/'><p>Home</p></Link>
                    </div>
                    <div className={`${sideState}SideHolder`}>
                        <div className={`${sideState}SideSVG`}>
                            <div className='h-6 w-6'>
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                                    <g>
                                        <path d="M9.8,9.8l-3.83,8.23l8.23-3.83l3.83-8.23L9.8,9.8z 
                                 M13.08,12.77c-0.21,0.29-0.51,0.48-0.86,0.54 c-0.07,0.01-0.15,0.02-0.22,0.02c-0.28,0-0.54-0.08-0.77-0.25c-0.29-0.21-0.48-0.51-0.54-0.86c-0.06-0.35,0.02-0.71,0.23-0.99 c0.21-0.29,0.51-0.48,0.86-0.54c0.35-0.06,0.7,0.02,0.99,0.23c0.29,0.21,0.48,0.51,0.54,0.86
                                 C13.37,12.13,13.29,12.48,13.08,12.77z M12,3c4.96,0,9,4.04,9,9s-4.04,9-9,9s-9-4.04-9-9S7.04,3,12,3 
                                 M12,2C6.48,2,2,8.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2 L12,2z" >
                                        </path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <p>Explore</p>
                        </div>
                    </div>
                    <div className={`${sideState}SideHolder`}>
                        <div className={`${sideState}SideSVG`}>
                            <div className='h-6 w-6'>
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                                    <g height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33c-.77-.32-1.2-.5-1.2-.5
                        L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56
                        L6 8.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86l-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72
                        L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <p>Shorts</p>
                        </div>
                    </div>
                    <div className={`${sideState}SideHolder`}>
                        <div className={`${sideState}SideSVG`}>
                            <div className='h-6 w-6'>
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                                    <g>
                                        <path d="M10,18v-6l5,3L10,18z M17,3H7v1h10V3z M20,6H4v1h16V6z M22,9H2v12h20V9z M3,10h18v10H3V10z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <p>Subscription</p>
                        </div>
                    </div>
                    <div className={`${sideState}SideHolder`}>
                        <div className={`${sideState}SideSVG`}>
                            <div className='h-6 w-6'>
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                                    <g>
                                        <path d="M11,7l6,3.5L11,14V7L11,7z M18,20H4V6H3v15h15V20z M21,18H6V3h15V18z M7,17h13V4H7V17z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <p>Library</p>
                        </div>
                    </div>
                    <div className={`${sideState}SideHolder`}>
                        <div className={`${sideState}SideSVG`}>
                            <div className='h-6 w-6'>
                                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                                    <g>
                                        <path d="M14.97,12.95L10,13.87V7h2v5.76l4.03,2.49L14.97,12.95z M22,12c0,5.51-4.49,10-10,10
                        S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94
                        C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,8.86C5.22,3.86,8.51,2,12,2
                        C17.51,2,22,8.49,22,12z">
                                        </path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <p>History</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        side()
    )

}

export default Side

