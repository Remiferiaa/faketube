import { useState, useEffect } from 'react'

const key = process.env.REACT_APP_YOUTUBE_API_KEY
const base = 'https://www.googleapis.com/youtube/v3/'

interface Opts {
    type: string,
    params: any,
}

const useLink = (opts: Opts) => {
    const query = new URLSearchParams(opts.params).toString()
    const url = `${base}${opts.type}?${query}&key=${key}`
    const [loading, setLoading] = useState<boolean>(true)
    const [rawData, setRaw] = useState<any>()
    const [data, setData] = useState<any>()
    const [token, setToken] = useState<string>('')
    const [max, setMax] = useState<number>(0)
    const [done, setDone] = useState<boolean>(false)

    const fetcher = async () => {
        setDone(false)
        setLoading(true)
        try {
            const details = await fetch(url)
            const response = await details.json()
            setRaw(response)
            setData(response.items)
            setToken(response.nextPageToken)
            setMax(response.pageInfo.totalResults)
            setDone(true)
            setLoading(false)
        }
        catch (error) {
            console.error(error)
        }
    }

    const loadMore = (opts: Opts) => {
        if (loading) return
        setLoading(true)
        const newQuery = new URLSearchParams(opts.params).toString()
        const newUrl = `${base}${opts.type}?${newQuery}&key=${key}`;
        (async () => {
            const details = await fetch(newUrl)
            const response = await details.json()
            setData(data.concat(response.items))
            setToken(response.nextPageToken)
            setLoading(false)
        })();
    }

    useEffect(() => {
        fetcher()
    }, [])

    return { data, done, loadMore, token, max, rawData, loading, fetcher }
}

export default useLink