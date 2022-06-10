export interface IList {
    items: [{
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
        }
    }]
    nextPageToken?: string
}