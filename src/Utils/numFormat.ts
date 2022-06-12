const subForm = (x: number) => {
    let pattern = /(\d{1,3}).(\d{1,3})/
    if (1e9 < x) {
        let y = String(x / 1e9).match(pattern)!
        if (y[1].length < 3) {
            let endPoint = 3 - y[1].length
            return `${y[1]}.${y[2].slice(0, endPoint)}B`
        } else {
            return `${y[1]}B`
        }
    }
    if (1e9 > x && x > 1e6) {
        let y = String(x / 1e6).match(pattern)!
        if (y[1].length < 3) {
            let endPoint = 3 - y[1].length
            return `${y[1]}.${y[2].slice(0, endPoint)}M`
        } else {
            return `${y[1]}M`
        }
    }
    if (1e6 > x && x > 1e3) {
        let y = String(x / 1e3).match(pattern)!
        if (y[1].length < 3) {
            let endPoint = 3 - y[1].length
            return `${y[1]}.${y[2].slice(0, endPoint)}K`
        } else {
            return `${y[1]}K`
        }
    }
    if (1e3 > x) { return x }
}

const viewForm = (x: number) => {
    if (1e9 < x) { 
        let results = x/1e9
        if(results > 10) {
            return +Math.floor(results) + 'B'
        } else {
            return results.toFixed(1) + 'B'
        }
    }
    if (1e9 > x && x > 1e6)  { 
        let results = x/1e6
        if(results > 10) {
            return +Math.floor(results) + 'M'
        } else {
            return results.toFixed(1) + 'M'
        }
    }
    if (1e6 > x && x > 1e3)  { 
        let results = x/1e3
        if(results > 10) {
            return +Math.floor(results) + 'K'
        } else {
            return results.toFixed(1) + 'K'
        }
    }
    if (1e3 > x) { return x }
}

export { subForm, viewForm }