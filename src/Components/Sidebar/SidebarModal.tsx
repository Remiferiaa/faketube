import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ISidebar } from '../../types/vid'
import useWindowSize from '../../Hook/useWindowSize'

const SideModal = ({ sideState, setSide}: ISidebar) => {
    const location = useLocation()
    const { screen } = useWindowSize()
    const youtubeIcon = () => {
        return (
            <svg viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full'>
                <g viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet">
                    <g >
                        <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0
                        C14.285 0 5.35042 2.24288e-07 3.12323 0.597366
                        C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324
                        C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20
                        C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10
                        C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000">
                        </path>
                        <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"></path>
                    </g>
                    <g>
                        <g>
                            <path d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3174 6.6701C35.6043 7.96361 35.8136 9.06662 35.95 9.97913
                                    H36.0323C36.1264 9.32532 36.3381 8.22937 36.665 6.68892L37.8291 1.41846H40.6278
                                    L37.3799 13.0036V18.561H34.6001V13.0036H34.6024Z">
                            </path>
                            <path d="M41.4697 18.1937C40.9053 17.8127 40.5031 17.22 40.2632 16.4157C40.0257 15.6114 39.9058 14.5437 39.9058 13.2078
                                    V11.3898C39.9058 10.0422 40.0422 8.95805 40.315 8.14196C40.5878 7.32588 41.0135 6.72851 41.592 6.35457
                                    C42.1706 5.98063 42.9302 5.79248 43.871 5.79248C44.7976 5.79248 45.5384 5.98298 46.0981 6.36398
                                    C46.6555 6.74497 47.0647 7.34234 47.3234 8.15137C47.5821 8.96275 47.7115 10.0422 47.7115 11.3898
                                    V13.2078C47.7115 14.5437 47.5845 15.6161 47.3329 16.4251C47.0812 17.2365 46.672 17.8292 46.1075 18.2031
                                    C45.5431 18.5771 44.7764 18.7652 43.8098 18.7652C42.8126 18.7675 42.0342 18.5747 41.4697 18.1937Z
                                    M44.6353 16.2323C44.7905 15.8231 44.8705 15.1575 44.8705 14.2309V10.3292C44.8705 9.43077 44.7929 8.77225 44.6353 8.35833
                                    C44.4777 7.94206 44.2026 7.7351 43.8074 7.7351C43.4265 7.7351 43.156 7.94206 43.0008 8.35833C42.8432 8.77461 42.7656 9.43077 42.7656 10.3292
                                    V14.2309C42.7656 15.1575 42.8408 15.8254 42.9914 16.2323C43.1419 16.6415 43.4123 16.8461 43.8074 16.8461
                                    C44.2026 16.8461 44.4777 16.6415 44.6353 16.2323Z">
                            </path>
                            <path d="M56.8154 18.5634H54.6094L54.3648 17.03H54.3037C53.7039 18.1871 52.8055 18.7656 51.6061 18.7656
                                    C50.7759 18.7656 50.1621 18.4928 49.767 17.9496C49.3719 17.4039 49.1743 16.5526 49.1743 15.3955V6.03751
                                    H51.9942V15.2308C51.9942 15.7906 52.0553 16.188 52.1776 16.4256C52.2999 16.6631 52.5045 16.783 52.7914 16.783
                                    C53.036 16.783 53.2712 16.7078 53.497 16.5573C53.7228 16.4067 53.8874 16.2162 53.9979 15.9858
                                    V6.03516H56.8154V18.5634Z">
                            </path>
                            <path d="M64.4755 3.68758H61.6768V18.5629H58.9181V3.68758H56.1194V1.42041H64.4755V3.68758Z" >
                            </path>
                            <path d="M71.2768 18.5634H69.0708L68.8262 17.03H68.7651C68.1654 18.1871 67.267 18.7656 66.0675 18.7656
                                    C65.2373 18.7656 64.6235 18.4928 64.2284 17.9496C63.8333 17.4039 63.6357 16.5526 63.6357 15.3955V6.03751H66.4556V15.2308
                                    C66.4556 15.7906 66.5167 16.188 66.639 16.4256C66.7613 16.6631 66.9659 16.783 67.2529 16.783
                                    C67.4974 16.783 67.7326 16.7078 67.9584 16.5573C68.1842 16.4067 68.3488 16.2162 68.4593 15.9858
                                    V6.03516H71.2768V18.5634Z">
                            </path>
                            <path d="M80.609 8.0387C80.4373 7.24849 80.1621 6.67699 79.7812 6.32186C79.4002 5.96674 78.8757 5.79035 78.2078 5.79035
                                    C77.6904 5.79035 77.2059 5.93616 76.7567 6.23014C76.3075 6.52412 75.9594 6.90747 75.7148 7.38489H75.6937V0.785645
                                    H72.9773V18.5608H75.3056L75.5925 17.3755H75.6537C75.8724 17.7988 76.1993 18.1304 76.6344 18.3774
                                    C77.0695 18.622 77.554 18.7443 78.0855 18.7443C79.038 18.7443 79.7412 18.3045 80.1904 17.4272
                                    C80.6396 16.5476 80.8653 15.1765 80.8653 13.3092V11.3266C80.8653 9.92722 80.7783 8.82892 80.609 8.0387ZM78.0243 13.149
                                    C78.0243 14.0617 77.9867 14.7767 77.9114 15.2941C77.8362 15.8115 77.7115 16.1808 77.5328 16.3971
                                    C77.3564 16.6158 77.1165 16.724 76.8178 16.724C76.585 16.724 76.371 16.6699 76.1734 16.5594
                                    C75.9759 16.4512 75.816 16.2866 75.6937 16.0702V8.96062C75.7877 8.6196 75.9524 8.34209 76.1852 8.12337
                                    C76.4157 7.90465 76.6697 7.79646 76.9401 7.79646C77.2271 7.79646 77.4481 7.90935 77.6034 8.13278
                                    C77.7609 8.35855 77.8691 8.73485 77.9303 9.26636C77.9914 9.79787 78.022 10.5528 78.022 11.5335
                                    V13.1492H78.0243Z">
                            </path>
                            <path d="M84.8657 13.8712C84.8657 14.6755 84.8892 15.2776 84.9363 15.6798C84.9833 16.0819 85.0821 16.3736 85.2326 16.5594
                                    C85.3831 16.7428 85.6136 16.8345 85.9264 16.8345C86.3474 16.8345 86.639 16.6699 86.7942 16.343
                                    C86.9518 16.0161 87.0365 15.4705 87.0506 14.7085L89.4824 14.8519C89.4965 14.9601 89.5035 15.1106 89.5035 15.3011
                                    C89.5035 16.4582 89.186 17.3237 88.5534 17.8952C87.9208 18.4667 87.0247 18.7536 85.8676 18.7536
                                    C84.4777 18.7536 83.504 18.3185 82.9466 17.446C82.3869 16.5735 82.1094 15.2259 82.1094 13.4008V11.2136
                                    C82.1094 9.33452 82.3987 7.96105 82.9772 7.09558C83.5558 6.2301 84.5459 5.79736 85.9499 5.79736
                                    C86.9165 5.79736 87.6597 5.97375 88.1771 6.32888C88.6945 6.684 89.059 7.23433 89.2707 7.98457
                                    C89.4824 8.7348 89.5882 9.76961 89.5882 11.0913V13.2362H84.8657V13.8712ZM85.2232 7.96811
                                    C85.0797 8.14449 84.9857 8.43377 84.9363 8.83593C84.8892 9.2381 84.8657 9.84722 84.8657 10.6657
                                    V11.5641H86.9283V10.6657C86.9283 9.86133 86.9001 9.25221 86.846 8.83593C86.7919 8.41966 86.6931 8.12803 86.5496 7.95635
                                    C86.4062 7.78702 86.1851 7.7 85.8864 7.7C85.5854 7.70235 85.3643 7.79172 85.2232 7.96811Z">
                            </path>
                        </g>
                    </g>
                </g>
            </svg>
        )
    }
    const sideBarState = () => {
        if (sideState === 'full') {
            setSide('coll')
        }
        if (sideState === 'coll') {
            setSide('full')
        }
    }

    useEffect(() => {
        setSide('coll')
    }, [location])
    
    const sideBarModal = () => {
        return (
            <>
                <div className={`w-64 pt-4 pl-4 pb-4 bg-white h-screen flex-col z-20 fixed top-0 duration-100 ${sideState === 'full' ? 'left-0 visible ' : '-left-full invisible'}`}>
                    <div className='flex gap-6 mb-4'>
                        <div className='h-6 w-6' onClick={() => sideBarState()}>
                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full'>
                                <g><path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path></g>
                            </svg>
                        </div>
                        <div className='h-6 w-6'>
                            <Link to='/'>
                                {youtubeIcon()}
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col mt-4'>
                        <div className='h-12 flex items-center hover:bg-gray-200 justify-start'>
                            <Link to='/' className='fullSideSVG'>
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
                        <div className='h-12 flex items-center hover:bg-gray-200 justify-start'>
                            <div className='fullSideSVG'>
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
                        <div className='h-12 flex items-center hover:bg-gray-200 justify-start'>
                            <div className='fullSideSVG'>
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
                        <div className='h-12 flex items-center hover:bg-gray-200 justify-start'>
                            <div className='fullSideSVG'>
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
                        <div className='h-12 flex items-center hover:bg-gray-200 justify-start'>
                            <div className='fullSideSVG'>
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
                        <div className='h-12 flex items-center hover:bg-gray-200 justify-start'>
                            <div className='fullSideSVG'>
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
                </div>
                <div className={`fixed h-full w-full fixed right-0 top-0 bg-black opacity-50 z-10
                         ${sideState === 'full' ? 'visible' : 'invisible'}`} onClick={() => sideBarState()}>
                </div>
            </>
        )
    }
    
    return (
        <>
            {screen < 800 || location.pathname.includes('/watch') ? sideBarModal() : null}
        </>
    )
}

export default SideModal