import { useState, useEffect } from 'react'
import { IVidId } from '../../types/vid'
import useLink from '../../Hook/useLink'
import useWindowSize from '../../Hook/useWindowSize'
import VidCard from './VidCard'

interface Props {
    vidId: string
}

const Related = ({ vidId }: Props) => {
    const {screen} = useWindowSize()
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
        <div className={`flex flex-col gap-4 ${ screen < 800 ? '' : 'max-w-[350px]'}`}>
            {related.length > 0 ? related.map((item) => {
                return (
                    <div key={item.id.videoId} className='flex max-h-[90px] gap-1'>
                        <VidCard vidId={`${item.id.videoId}`} status='related' />
                    </div>
                )
            }) : null}
        </div>
    )
}

export default Related