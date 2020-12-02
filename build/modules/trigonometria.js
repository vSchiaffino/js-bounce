export function normalizar(ang) {
    ang = ang % 360
    if (ang < 0){
        ang = 360 + ang
    }
    return ang
}

//#region Shorthands
export function toRad(deg) {
    return deg * Math.PI / 180
}

export function toDeg(rad) {
    return rad * 180 / Math.PI
}

export function degSin(deg) {
    return Math.sin(toRad(deg))
}

export function degCos(deg) {
    return Math.cos(toRad(deg))
}
//#endregion

export function descomponerMov(movt, ang) {
    let movx = degSin(ang) * movt
    let movy = degCos(ang) * movt
    let parte = getParteAng(ang)
    let signo_por_parte = [[1, -1], [1, 1], [-1, 1], [-1, -1]]
    let signo = signo_por_parte[parte]
    let mov = [signo[0] * Math.abs(movx), signo[1] * Math.abs(movy)]
    return mov
}

export function getParteAng(ang){
    return Math.floor(normalizar(ang) / 90) % 4
}

//#region Collision handlers
export function hCollide(ang) {
    return normalizar(180 - ang)
}

export function wCollide(ang) {
    return normalizar(-ang)
}
//#endregion

//#region Collision checkers
export function circleRect(circle, rect){
    let testX = circle.x
    let testY = circle.y

    if(circle.x < rect.x)
        testX = rect.x;
    else if (circle.x > rect.x + rect.w)
        testX = rect.x + rect.w;
    if(circle.y < rect.y)
        testY = rect.y;
    else if (circle.y > rect.y + rect.h)
        testY = rect.y + rect.h;
    
    let dx = Math.abs(circle.x - testX)
    let dy = Math.abs(circle.y - testY)
    let d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

    return d <= circle.r
}
//#endregion
