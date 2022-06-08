const subForm = (x: number) => {
    if (1e9 < x) {return +(x/1e9).toFixed(2) + 'B'}
    if (1e9 > x && x > 1e6 ) {return +(x/1e6).toFixed(2) + 'M'}
    if (1e6 > x && x > 1e3 ) {return +(x/1e3).toFixed(2) + 'K'}
    if (1e3 > x) {return x}
}

const viewForm = (x: number) => {
    if (1e9 < x) {return +Math.floor(x/1e9) + 'B'}
    if (1e9 > x && x > 1e6 ) {return +Math.floor(x/1e6) + 'M'}
    if (1e6 > x && x > 1e3 ) {return +Math.floor(x/1e3) + 'K'}
    if (1e3 > x) {return x}
}

export {subForm, viewForm}