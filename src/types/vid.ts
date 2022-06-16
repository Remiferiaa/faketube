export interface IResponse {
    items: {
        id: string
        snippet: {
            title: string
            channelId: string
            publishedAt: string
            description: string
            thumbnails: {
                default: {
                    url: string
                }
                medium: {
                    url: string
                }
                high: {
                    url: string
                }
            }
            channelTitle: string
        }
        contentDetails: {
            duration: string
        }
        statistics: {
            viewCount: number
            likeCount: number,
            commentCount: number,
        }
    }[]
}

export interface IComment {
    nextPageToken: string,
    pageInfo: {
        totalResults: number
    }
    items: {
        id: string
        snippet: {
            topLevelComment: {
                snippet: {
                    textDisplay: string,
                    authorDisplayName: string,
                    authorProfileImageUrl: string,
                    likeCount: number,
                    publishedAt: string,
                    updatedAt: string
                }
            }
            totalReplyCount: number
        }
    }[]
}

export interface IVidId {
    id: {
        videoId: string
    }
}

export interface ISidebar {
    sideState: string,
    setSide: React.Dispatch<React.SetStateAction<string>>
    showSide: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}