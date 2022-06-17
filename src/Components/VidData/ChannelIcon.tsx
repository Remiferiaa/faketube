import { useState, useEffect } from 'react'
import useLink from '../../Hook/useLink'
import { subForm } from '../../Utils/numFormat'

interface ICh {
    items: {
        snippet: {
            title: string
            thumbnails: {
                medium: {
                    url: string
                }
            }
        }
        statistics: {
            subscriberCount: number
        }
    }[]

}

interface Props {
    chId: string,
    type?: string,
}


const ChIcon = ({ chId, type }: Props) => {
    const query = {
        type: 'channels',
        params: {
            part: ['snippet', 'statistics'],
            id: chId
        }
    }

    const [chData, setCh] = useState<ICh | null>(null)
    const { rawData, done, fetcher } = useLink(query)
    useEffect(() => {
        if (done) {
            setCh(rawData)
        }
    }, [rawData, done])

    useEffect(() => {
        fetcher()
    }, [chId])

    const subIcon = () => {
        return (
            <>
                {chData !== null ?
                    <img src={chData.items[0].snippet.thumbnails.medium.url} alt="" className='w-8 h-8 rounded-full mt-1 mr-1'></img>
                    : null}
            </>
        )
    }

    const subTitle = () => {
        return (
            <>
                {chData !== null ?
                    <>
                        <img src={chData.items[0].snippet.thumbnails.medium.url} alt="" className='w-4 h-4 rounded-full mt-1 mr-1'></img>
                        <p className='text-textCol'>{chData.items[0].snippet.title}</p>
                    </>
                    : null}
            </>
        )
    }

    const subDetails = () => {
        return (
            <>
                {chData !== null ?
                    <div className='flex items-center'>
                        <img src={chData.items[0].snippet.thumbnails.medium.url} alt="" className='w-12 h-12 rounded-full mt-2 mr-4 mb-1'></img>
                        <div className='flex flex-col'>
                            <p className='text-sm font-bold'>{chData.items[0].snippet.title}</p>
                            <p className='text-xs font-light text-textCol'>{subForm(chData.items[0].statistics.subscriberCount)} subscribers</p>
                        </div>
                    </div>
                    : null}
            </>
        )
    }
    return (
        <>
            {
                (() => {
                    if (type === 'details') { return subDetails() }
                    else if (type === 'title') { return subTitle() }
                    else { return subIcon() }
                })()
            }
        </>

    )
}

export default ChIcon
