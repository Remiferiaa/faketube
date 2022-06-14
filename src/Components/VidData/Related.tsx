import { useState, useEffect } from 'react'
import { IVidId } from '../../types/vid'
import useLink from '../../Hook/useLink'
import VidCard from './VidCard'

interface Props {
    vidId: string
}

const Related = ({ vidId }: Props) => {
    const [related, setRelated] = useState<Array<IVidId>>([])
    const query = {
        type: 'search',
        params: {
            part: 'snippet',
            type: 'video',
            relatedToVideoId: vidId,
            maxResults: 20,
            fields: 'items(id), pageInfo(totalResults)'
        }
    }
    const { data, done } = useLink(query)

    useEffect(() => {
        if (done) {
            setRelated(data)
        }
    }, [done, data])

    return (
        <>
            {related.length > 0 ? related.map((item) => {
                return (
                    <div key={item.id.videoId}>
                        <VidCard vidId={`${item.id.videoId}`} status='related' />
                    </div>
                )
            }) : null}
        </>
    )
}

export default Related