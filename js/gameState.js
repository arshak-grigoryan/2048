import randome_tile from './random.js';
import { tile_live_values } from './liveValues.js';
import { currentScore, bestScore } from './score.js';

let gameState = {
    bool: true,
    boolContinue: true
}

function removeLiveTiles(){
    let live_tiles = document.getElementsByClassName('tile_live')
    for(let i = live_tiles.length-1; i >= 0; i--){
        live_tiles[i].remove()
    }    
}

function removeLiveValues(){
    for(let key in tile_live_values){
        for(let nkey in tile_live_values[key]){
            tile_live_values[key][nkey] = null
        }
    }    
}

function removeCurrentScore(){
    currentScore['value'] = 0
    document.getElementById('current-score-value').textContent = currentScore['value']
}

function hideGameMessages(){
    document.getElementById('game_over').style.display = 'none'
    gameState['bool'] = true
    gameState['boolContinue'] = true
    document.getElementById('game_win').style.display = 'none'    
}

function newGame(){
    removeLiveTiles()
    removeLiveValues()
    hideGameMessages()
    removeCurrentScore()
    bestScore(currentScore['value'])
    randome_tile()
    randome_tile()
}

function continueGame(){
    document.getElementById('game_win').style.display = 'none'
    gameState['bool'] = true
}

export { gameState, newGame, continueGame }