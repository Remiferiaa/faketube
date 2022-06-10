const timeFormat = (timer: number) => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${parseInt(minutes) % 60}`.slice(-2)
    const getHours = Math.floor(timer / 3600) < 100 ? `0${Math.floor(timer / 3600)}`.slice(-2) : `${Math.floor(timer / 3600)}`.slice(-3)
    return `${getHours} : ${getMinutes} : ${getSeconds}`
}

const vidDuration = (dura: string) => {
    const pattern = /(?:([\d]+)D)?T(?:([\d]+)H)?(?:([\d]+)M)?(?:([\d]+)S)/
    const groups = dura.match(pattern)
    if (groups !== null) {
        const days = groups[1] === undefined ? 0 : parseInt(groups[1])
        const hours = groups[2] === undefined ? 0 : parseInt(groups[2])
        const minutes = groups[3] === undefined ? 0 : parseInt(groups[3])
        const seconds = groups[4] === undefined ? 0 : parseInt(groups[4])
        const totalSeconds = (days * 86400) + (hours * 3600) + (minutes * 60) + seconds
        return timeFormat(totalSeconds)
    }
}

export default vidDuration
