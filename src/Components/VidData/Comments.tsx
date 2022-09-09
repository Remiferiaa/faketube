import React, { useState, useEffect, useCallback, useRef } from 'react'
import { IComment, IVidId } from '../../types/vid'
import { viewForm } from '../../Utils/numFormat'
import dateDiff from '../../Utils/dateFormat'
import useLink from '../../Hook/useLink'
import { login, auth, logOut } from '../../firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

interface Props {
    vidId: string
    total: number
}


const Comments = ({ vidId, total }: Props) => {
    const [txt, setTxt] = useState<string>('')
    const [comm, setComm] = useState<IComment['items'] | null>(null)
    const obs = useRef<IntersectionObserver | null>()
    const [hasMore, setMore] = useState<boolean>(false)
    const [postComm, setPost] = useState<boolean>(false)
    const query = {
        type: 'commentThreads',
        params: {
            part: ['snippet', 'replies'],
            order: 'relevance',
            videoId: vidId,
            prettyPrint: true
        }
    }
    const { data, done, token, loadMore, loading, fetcher } = useLink(query)

    const moreQuery = {
        type: 'commentThreads',
        params: {
            part: ['snippet', 'replies'],
            order: 'relevance',
            pageToken: token,
            videoId: vidId,
            prettyPrint: true
        }
    }

    const lastCommentRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return
            if (obs.current) obs.current.disconnect();
            obs.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore(moreQuery)
                }
            });
            if (node) obs.current.observe(node);
        },
        [hasMore, loading]
    );

    const stateChange = () => {
        onAuthStateChanged(auth, (users) => {
            if (users) {
                setPost(true)
            } else {
                setPost(false)
            }
        })
    }

    useEffect(() => {
        stateChange()
    }, [])

    useEffect(() => {
        if (done)
            setComm(data)
    }, [done, data])

    useEffect(() => {
        if (token !== '') {
            setMore(true)
        }
    }, [token])

    useEffect(() => {
        fetcher()
    }, [vidId])

    const commFormat = (pubAt: string, updateAt: string) => {
        if (pubAt !== updateAt) {
            return `${dateDiff(updateAt)} (edited)`
        } else {
            return dateDiff(updateAt)
        }
    }

    const replyCheck = (count: number) => {
        if (count > 0) {
            return (
                <div className='flex gap-1 text-lmBlue'>
                    <div className='h-6 w-6 cursor-pointer'>
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full fill-lmBlue'>
                            <g >
                                <path d="M18,9l-6,6L6,9H18z" >
                                </path>
                            </g>
                        </svg>
                    </div>
                    <p>{`${viewForm(count)} REPLIES`}</p>
                </div>
            )
        }
    }

    const fakeSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setTxt('')
    }

    const commActions = (likeCount: number) => {
        return (
            <div className='flex items-center mt-2 mb-2 gap-2'>
                <div className='h-4 w-4 cursor-pointer'>
                    <svg viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                        <g>
                            <path d="M12.42,14A1.54,1.54,0,0,0,14,12.87l1-4.24C15.12,7.76,15,7,14,7H10l1.48-3.54
                             A1.17,1.17,0,0,0,10.24,2a1.49,1.49,0,0,0-1.08.46
                             L5,7H1v7ZM9.89,3.14
                             A.48.48,0,0,1,10.24,3a.29.29,0,0,1,.23.09S9,6.61,9,6.61L8.46,8
                             H14c0,.08-1,4.65-1,4.65a.58.58,0,0,1-.58.35H6V7.39ZM2,8H5v5H2Z" >
                            </path>
                        </g>
                    </svg>
                </div>
                <p className='text-sm text-textCol'>{likeCount > 0 ? viewForm(likeCount) : ''}</p>
                <div className='flex items-center cursor-pointer'>
                    <div className='h-4 w-4'>
                        <svg viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" focusable="false" className='h-full w-full'>
                            <g>
                                <path d="M3.54,2A1.55,1.55,0,0,0,2,3.13L1,7.37C.83,8.24,1,9,2,9
                            H6L4.52,12.54A1.17,1.17,0,0,0,5.71,14a1.49,1.49,0,0,0,1.09-.46
                            L11,9h4V2ZM6.07,12.86a.51.51,0,0,1-.36.14.28.28,0,0,1-.22-.09l0-.05L6.92,9.39,7.5,8H2a1.5,1.5,0,0,1,0-.41L3,3.35
                            A.58.58,0,0,1,3.54,3H10V8.61ZM14,8H11l0-5h3Z">
                                </path>
                            </g>
                        </svg>
                    </div>
                    <p className='ml-4 text-sm text-textCol'>REPLY</p>
                </div>
            </div>
        )
    }

    const hasComment = () => {
        return (
            <div>
                <div className='flex gap-4 mb-2'>
                    <p>{Number(total).toLocaleString()} Comments</p>
                    <div className='flex cursor-pointer items-center'>
                        <div className='h-4 w-4'>
                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                                <g>
                                    <path d="M21,6H3V5h18V6z M15,11H3v1h12V11z M9,17H3v1h6V17z">
                                    </path>
                                </g>
                            </svg>
                        </div>
                        <p>Sort By</p>
                    </div>
                </div>
                <div className='flex gap-1 mb-8 mt-8'>
                    <img src={`${postComm ? auth.currentUser?.photoURL : 'https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj'}`}
                        alt="" className='w-10 h-10 rounded-full mt-1 mr-4'></img>
                    <form onSubmit={(e) => fakeSubmit(e)} className='flex w-full'>
                        <label htmlFor='addComm'></label>
                        <input name='addComm' type='text' id='addComm' autoComplete='none' value={txt}
                            placeholder='Add a comment...' onChange={(e) => `${postComm ? setTxt(e.target.value) : ''}`}
                            onClick={() => `${postComm ? '' : login()}`}
                            className='border-b border-white 
                            border-opacity-10 outline-none self-center w-full mr-2
                            bg-black focus:border-white'></input>
                    </form>
                </div>
                <div className='flex flex-col gap-4'>
                    {comm?.map((post, i) => {
                        if (comm.length === i + 1) {
                            return (
                                <div key={post.id} ref={lastCommentRef} className='flex'>
                                    <div className='pr-4'>
                                        <div className='flex w-10 h-10'>
                                            <img src={`${post.snippet.topLevelComment.snippet.authorProfileImageUrl}`} alt="" className='w-full h-full rounded-full mt-1'></img>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex gap-1 items-center'>
                                            <p>{post.snippet.topLevelComment.snippet.authorDisplayName}</p>
                                            <p className='text-sm text-textCol'>{commFormat(post.snippet.topLevelComment.snippet.publishedAt,
                                                post.snippet.topLevelComment.snippet.updatedAt)}
                                            </p>
                                        </div>
                                        <p className=''>{post.snippet.topLevelComment.snippet.textDisplay}</p>
                                        {commActions(post.snippet.topLevelComment.snippet.likeCount)}
                                        {replyCheck(post.snippet.totalReplyCount)}
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={post.id} className='flex'>
                                    <div className='pr-4'>
                                        <div className='flex w-10 h-10'>
                                            <img src={`${post.snippet.topLevelComment.snippet.authorProfileImageUrl}`} alt="" className='w-full h-full rounded-full mt-1'></img>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex gap-1 items-center'>
                                            <p>{post.snippet.topLevelComment.snippet.authorDisplayName}</p>
                                            <p className='text-sm text-textCol'>{commFormat(post.snippet.topLevelComment.snippet.publishedAt,
                                                post.snippet.topLevelComment.snippet.updatedAt)}
                                            </p>
                                        </div>
                                        <p>{post.snippet.topLevelComment.snippet.textDisplay}</p>
                                        {commActions(post.snippet.topLevelComment.snippet.likeCount)}
                                        {replyCheck(post.snippet.totalReplyCount)}
                                    </div>
                                </div>
                            )
                        }
                    }
                    )}
                </div>
            </div>
        )
    }

    const noComment = () => {
        return (
            <div className='flex gap-1'>
                <p>Comments are turned off. </p>
                <p className='text-lmBlue'>Learn more</p>
            </div>
        )
    }

    return (
        <>
            {done && comm !== null ? hasComment() : noComment()}
        </>
    )
}

export default Comments

