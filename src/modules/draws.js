export function fillCircle(x, y, r, color, ctx){
    ctx.beginPath()
    ctx.fillStyle = color;
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
}