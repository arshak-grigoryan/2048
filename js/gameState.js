import randome_tile from './random.js';
import { tile_live_values } from './liveValues.js';
import { current_score_value, bestScore } from './score.js';

function newGame(){
    let live_tiles = document.getElementsByClassName('tile_live')
    let leng = live_tiles.length
    for(let i = leng-1; i >= 0; i--){
        live_tiles[i].remove()
    }
    for(let key in tile_live_values){
        for(let nkey in tile_live_values[key]){
            tile_live_values[key][nkey] = null
        }
    }
    document.getElementById('game_over').style.display = 'none'
    gameState['bool'] = true
    gameState['boolContinue'] = true
    document.getElementById('game_win').style.display = 'none'

    current_score_value['value'] = 0
    document.getElementById('current-score-value').textContent = current_score_value['value']

    bestScore(current_score_value['value'])
    randome_tile()
    randome_tile()
}

function continueGame(){
    document.getElementById('game_win').style.display = 'none'
    gameState['bool'] = true
}

let gameState = {
    bool: true,
    boolContinue: true
}

export { newGame, continueGame, gameState }