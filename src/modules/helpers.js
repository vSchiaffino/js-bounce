export default function getBlock(i, j, map) {
    for (let ii = 0; ii < map.length; ii++) {
        const block = map[ii];
        if(block.i === i && block.j === j)
            return block;
    }
}