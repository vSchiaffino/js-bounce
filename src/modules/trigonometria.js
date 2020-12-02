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

export function linePoint(line, point){
    let dx = Math.abs(line.p1.x - line.p2.x)
    let dy = Math.abs(line.p1.y - line.p2.y)
    let d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

    let d1x = Math.abs(line.p1.x - circle.x)
    let d1y = Math.abs(line.p1.y - circle.y)
    let d1 = Math.sqrt(Math.pow(d1x, 2) + Math.pow(d1y, 2))

    let d2x = Math.abs(line.p2.x - circle.x)
    let d2y = Math.abs(line.p2.y - circle.y)
    let d2 = Math.sqrt(Math.pow(d2x, 2) + Math.pow(d2y, 2))

    return d1 + d2 == d
}

export function pointCircle(point, circle) {
    let dx = Math.abs(point.x - circle.x)
    let dy = Math.abs(point.y - circle.y)
    let d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    return d <= r
}

export function lineCircle(line, circle) {
    let inside1 = pointCircle(line.p1, circle)
    let inside2 = pointCircle(line.p2, circle)
    if ( inside1 || inside2)
        return true;
    let dx = line.p1.x - line.p2.x
    let dy = line.p1.y - line.p2.y
    let len = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

    let dot = ( ((circle.x - line.p1.x)* (line.p2.x - line.p1.x)) + ((circle.y - line.p1.y)*(line.p2.y - line.p1.y)) ) / Math.pow(len, 2)
    let closestX = line.p1.x + (dot * ( line.p2.x - line.p1.x ) )
    let closestY = line.p1.y + (dot * ( line.p2.y - line.p1.y ) )
    let onSegment = linePoint(line, {x: closestX, y: closestY})
    if(!onSegment) return false

    let distX = closestX - circle.x
    let distY = closestY - circle.y
    let distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))
    return distance <= circle.r
}
//#endregion
