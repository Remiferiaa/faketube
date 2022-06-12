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
    const { rawData, done } = useLink(query)
    useEffect(() => {
        if (done) {
            setCh(rawData)
        }
    }, [rawData, done])

    const subIcon = () => {
        return (
            <>
                {chData !== null ?
                    <img src={chData.items[0].snippet.thumbnails.medium.url} alt=""></img>
                    : null}
            </>
        )
    }

    const subTitle = () => {
        return (
            <>
                {chData !== null ?
                    <>
                        <img src={chData.items[0].snippet.thumbnails.medium.url} alt=""></img>
                        <p>{chData.items[0].snippet.title}</p>
                    </>
                    : null}
            </>
        )
    }

    const subDetails = () => {
        return (
            <>
                {chData !== null ?
                    <>
                        <img src={chData.items[0].snippet.thumbnails.medium.url} alt=""></img>
                        <div>
                            <p>{chData.items[0].snippet.title}</p>
                            <p>{subForm(chData.items[0].statistics.subscriberCount)}</p>
                        </div>
                    </>
                    : null}
            </>
        )
    }
    return (
        <>
            {
                (() => {
                    if (type === 'details') { return subDetails() }
                    else if (type === 'title') { return subTitle()}
                    else {return subIcon()}
                })()
            }
        </>

    )
}

export default ChIcon
