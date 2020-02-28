import setTileStyle from './setTileStyle.js';
import { tile_live_values } from './liveValues.js';
import { isArrFull } from './checkValues.js';

function random2or4(){
    return Math.floor(Math.random() * 10) === 4 ? 4 : 2
}

function random1to4(){
    return String(Math.floor(Math.random() * 4))
}

function randomCoordinates(){
    let x = random1to4(),
        y = random1to4();
    let bool = isArrFull()

    if(!bool){
        if(tile_live_values[x][y] === null){
            return x + y
        } else{
            return randomCoordinates()
        }
    } else{
        return undefined
    }
}

export default function randome_tile(){
    let board_live = document.getElementById('board_live'),
        tile_live = document.createElement('div')
        tile_live.classList.add('tile_live')
    let value = random2or4()

    setTileStyle(tile_live, value)

    let ranCoord = randomCoordinates()

    if(ranCoord !== undefined){
        tile_live.classList.add(`tile_live${ranCoord}`)
        tile_live_values[ranCoord[0]][ranCoord[1]] = value
        board_live.append(tile_live)
    }
}