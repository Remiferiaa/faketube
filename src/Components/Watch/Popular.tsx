import { useState, useEffect } from 'react'
import useLink from '../../Helper/useLinks'

//'https://www.googleapis.com/youtube/v3/[videos]?part=snippet,contentDetails&chart=mostPopular&maxResults=[24]&fields=items(id,snippet)&key=[apikey]' 
const queries = {
    type: 'videos',
    params: {
        part: ['snippet', 'contentDetails'],
        chart: 'mostPopular',
        maxResults: 24,
        fields: 'items(id,snippet)'
    }
}

const Popular = () => {
    const { data, done } = useLink(queries)

    return (
        <>
            {done ? data.map(item => {
                return (
                    <div></div>
                )
            }) : null}
        </>
    )
}