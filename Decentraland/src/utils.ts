export function randomInt(min: number, max: number){
    return Math.round(Math.random() * (max - min)) + min;
}

export function isValidKey(key: string | number | symbol, object: object) : key is keyof typeof object {
    return key in object;
}

export function randomDirection() {
    return Math.random() < 0.5 ? -1 : 1;
}