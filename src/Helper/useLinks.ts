import { useState, useEffect } from 'react'

const key = process.env.REACT_APP_YOUTUBE_API_KEY
const base = 'https://www.googleapis.com/youtube/v3/'

/*
//homepage videos
'https://www.googleapis.com/youtube/v3/[search]?part=id&q=[search]&fields=items(id/videoId)&key=[apikey]'  //search get list of id, call video for duration
'https://www.googleapis.com/youtube/v3/[videos]?part=snippet,contentDetails,statistics&id=[id]&key=[YOUR_API_KEY]' // specific video
'https://www.googleapis.com/youtube/v3/[channels]?part=snippet,statistics&id=[id]&fields=items(items(id,snippet(title,thumbnails),statistics))&key=[YOUR_API_KEY]' // channel detail
'https://www.googleapis.com/youtube/v3/[commentThreads]?part=snippet&maxResults=[50]&order=relevance&videoId=[id]key=[YOUR_API_KEY]' //comment
'https://www.googleapis.com/youtube/v3/[search]?part=snippet&relatedToVideoId=[id]&type=video&key=[YOUR_API_KEY]' //related to current video

// link 1 to get homepage videos
// link 2 get search list id, link 3 to get details
// link 3 also can get specific video, link 4 get that channel detail, link 5 for comments, link 6 for related videos */

interface Opts {
    type: string,
    params: any,
}  

const useLink = (opts: Opts) => {
    const [data, setData] = useState([]);
    const [done, setDone]  = useState<boolean>(false)
    const query = new URLSearchParams(opts.params).toString()
    const url = `${base}${opts.type}?${query}&key=${key}`

    const fetcher = async () => {
        try {
            const details = await fetch(url)
            const response = await details.json()
            setData(response)
            setDone(true)
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetcher()
    },[])

    return {data, done} as const
}

export default useLink