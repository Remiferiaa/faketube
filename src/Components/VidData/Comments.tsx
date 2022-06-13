import React, { useState, useEffect, useCallback, useRef } from 'react'
import { IComment, IVidId } from '../../types/vid'
import { viewForm } from '../../Utils/numFormat'
import dateDiff from '../../Utils/dateFormat'
import useLink from '../../Hook/useLink'

interface Props {
    vidId: string
    total: number
}


const Comments = ({ vidId, total }: Props) => {
    const [txt, setTxt] = useState<string>('')
    const [comm, setComm] = useState<IComment['items'] | null>(null)
    const obs = useRef<IntersectionObserver | null>()
    const [hasMore, setMore] = useState<boolean>(false)
    const query = {
        type: 'commentThreads',
        params: {
            part: ['snippet', 'replies'],
            order: 'relevance',
            videoId: vidId,
            prettyPrint: true
        }
    }
    const { data, done, token, loadMore, loading } = useLink(query)

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

    useEffect(() => {
        if (done)
            setComm(data)
    }, [done, data])

    useEffect(() => {
        if (token !== '') {
            setMore(true)
        }
    }, [token])

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
                <div>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                        <g >
                            <path d="M18,9l-6,6L6,9H18z" >
                            </path>
                        </g>
                    </svg>
                    <p>{`${viewForm(count)} REPLIES`}</p>
                </div>
            )
        }
    }

    const fakeSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setTxt('')
    }

    const hasComment = () => {
        return (
            <div>
                <div>
                    <p>{Number(total).toLocaleString()}</p>
                    <div>
                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                            <g>
                                <path d="M21,6H3V5h18V6z M15,11H3v1h12V11z M9,17H3v1h6V17z">
                                </path>
                            </g>
                        </svg>
                        <p>Sort By</p>
                    </div>
                </div>
                <div>
                    <img src='https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj' alt=""></img>
                    <form onSubmit={(e) => fakeSubmit(e)}>
                        <label htmlFor='addComm'></label>
                        <input name='addComm' type='text' id='addComm' autoComplete='none' value={txt}
                            placeholder='Add a comment...' onChange={(e) => setTxt(e.target.value)}></input>
                    </form>
                </div>
                {comm?.map((post, i) => {
                    if (comm.length === i + 1) {
                        return (
                            <div key={post.id} ref={lastCommentRef}>
                                <div>
                                    <p>{post.snippet.topLevelComment.snippet.authorDisplayName}</p>
                                    <p>{commFormat(post.snippet.topLevelComment.snippet.publishedAt,
                                        post.snippet.topLevelComment.snippet.updatedAt)}
                                    </p>
                                </div>
                                <p>{post.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div>
                                    <svg viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" focusable="false">
                                        <g>
                                            <path d="M12.42,14A1.54,1.54,0,0,0,14,12.87l1-4.24C15.12,7.76,15,7,14,7H10l1.48-3.54
                                        A1.17,1.17,0,0,0,10.24,2a1.49,1.49,0,0,0-1.08.46
                                        L5,7H1v7ZM9.89,3.14
                                        A.48.48,0,0,1,10.24,3a.29.29,0,0,1,.23.09S9,6.61,9,6.61L8.46,8
                                        H14c0,.08-1,4.65-1,4.65a.58.58,0,0,1-.58.35H6V7.39ZM2,8H5v5H2Z" >
                                            </path>
                                        </g>
                                    </svg>
                                    <p>{viewForm(post.snippet.topLevelComment.snippet.likeCount)}</p>
                                    <svg viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" focusable="false">
                                        <g>
                                            <path d="M3.54,2A1.55,1.55,0,0,0,2,3.13L1,7.37C.83,8.24,1,9,2,9
                                        H6L4.52,12.54A1.17,1.17,0,0,0,5.71,14a1.49,1.49,0,0,0,1.09-.46
                                        L11,9h4V2ZM6.07,12.86a.51.51,0,0,1-.36.14.28.28,0,0,1-.22-.09l0-.05L6.92,9.39,7.5,8H2a1.5,1.5,0,0,1,0-.41L3,3.35
                                        A.58.58,0,0,1,3.54,3H10V8.61ZM14,8H11l0-5h3Z">
                                            </path>
                                        </g>
                                    </svg>
                                    <p>REPLY</p>
                                </div>
                                {replyCheck(post.snippet.totalReplyCount)}
                            </div>
                        )
                    } else {
                        return (
                            <div key={post.id}>
                                <div>
                                    <p>{post.snippet.topLevelComment.snippet.authorDisplayName}</p>
                                    <p>{commFormat(post.snippet.topLevelComment.snippet.publishedAt,
                                        post.snippet.topLevelComment.snippet.updatedAt)}
                                    </p>
                                </div>
                                <p>{post.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div>
                                    <svg viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" focusable="false">
                                        <g>
                                            <path d="M12.42,14A1.54,1.54,0,0,0,14,12.87l1-4.24C15.12,7.76,15,7,14,7H10l1.48-3.54
                                        A1.17,1.17,0,0,0,10.24,2a1.49,1.49,0,0,0-1.08.46
                                        L5,7H1v7ZM9.89,3.14
                                        A.48.48,0,0,1,10.24,3a.29.29,0,0,1,.23.09S9,6.61,9,6.61L8.46,8
                                        H14c0,.08-1,4.65-1,4.65a.58.58,0,0,1-.58.35H6V7.39ZM2,8H5v5H2Z" >
                                            </path>
                                        </g>
                                    </svg>
                                    <p>{viewForm(post.snippet.topLevelComment.snippet.likeCount)}</p>
                                    <svg viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" focusable="false">
                                        <g>
                                            <path d="M3.54,2A1.55,1.55,0,0,0,2,3.13L1,7.37C.83,8.24,1,9,2,9
                                        H6L4.52,12.54A1.17,1.17,0,0,0,5.71,14a1.49,1.49,0,0,0,1.09-.46
                                        L11,9h4V2ZM6.07,12.86a.51.51,0,0,1-.36.14.28.28,0,0,1-.22-.09l0-.05L6.92,9.39,7.5,8H2a1.5,1.5,0,0,1,0-.41L3,3.35
                                        A.58.58,0,0,1,3.54,3H10V8.61ZM14,8H11l0-5h3Z">
                                            </path>
                                        </g>
                                    </svg>
                                    <p>REPLY</p>
                                </div>
                                {replyCheck(post.snippet.totalReplyCount)}
                            </div>
                        )
                    }
                }
                )}
            </div>
        )
    }

    const noComment = () => {
        return (
            <div>
                <p>Comments are turned off. Learn more</p>
            </div>
        )
    }

    return  (
        <>
        {done && comm !== null ? hasComment() : noComment()}
        </>
    )
}

export default Comments

