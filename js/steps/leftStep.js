import setTileStyle from '../setTileStyle.js';
import { isThereCurrentArrowStep, isReach2048 } from '../checkValues.js';
import { tile_live_values } from '../liveValues.js';
import randome_tile from '../random.js';
import { currentScore, bestScore } from '../score.js';

function leftStepNull(){
    for(let i = 0; i < tile_live_values.length; i++){
        for(let j = 1; j < tile_live_values.length; j++){ // j = 1 -> exclude 1 -th column
            if(tile_live_values[i][j] !== null && tile_live_values[i][j-1] === null){
                let tile_live = document.getElementsByClassName(`tile_live${i}${j}`)[0]
                tile_live.classList.remove(`tile_live${i}${j}`)
                tile_live.classList.add(`tile_live${i}${j-1}`)
                tile_live_values[i][j-1] = tile_live_values[i][j]
                tile_live_values[i][j] = null
            } 
        }
    }
}

function leftStepSum(){
    for(let i = 0; i < tile_live_values.length; i++){
        for(let j = 1; j < tile_live_values.length; j++){ // j = 1 -> exclude 1 -th column
            
            let currentValue = tile_live_values[i][j],
                nextValue = tile_live_values[i][j-1]

            if(currentValue !== null && nextValue !== null && currentValue === nextValue){
                
                let current_tile_live = document.getElementsByClassName(`tile_live${i}${j}`)[0]
                current_tile_live.classList.remove(`tile_live${i}${j}`)
                current_tile_live.classList.add(`tile_live_${i}${j-1}`)
                current_tile_live.style.zIndex = '10'
                
                let next_tile_live = document.getElementsByClassName(`tile_live${i}${j-1}`)[0]
                next_tile_live.style.zIndex = '20'

                let value = tile_live_values[i][j-1] * 2
                currentScore['value'] += value
                document.getElementById('current-score-value').textContent = currentScore['value']
                bestScore(currentScore['value'])
                setTileStyle(next_tile_live, value)
                tile_live_values[i][j] = null
                tile_live_values[i][j-1] = value
                leftStepNull()

                setTimeout(()=>{
                    current_tile_live.remove()
                    next_tile_live.style.zIndex = '10'
                    next_tile_live.style.transform = 'scale(1.25)'
                    setTimeout(()=>{
                        next_tile_live.style.transform = 'scale(1)'
                    },100)
                },100)                    
            } 
        }
    }    
}

/*  tile appearing is possible when available at least one step(neighbour value is equal to it or equal to null) 
    or after any step which already have been completed */

export default function arrowLeft(){ 
    let firstTime = true
    if(firstTime){
        if(isThereCurrentArrowStep('left')){
            firstTime = false
            for(let i = 0; i < tile_live_values.length-1; i++){
                leftStepNull()
            }
            leftStepSum()  
            if(isReach2048()){
                setTimeout(()=>document.getElementById('game_win').style.display = 'flex',200) 
            }
            setTimeout(()=>randome_tile(),200) 
        }
    } 
    else{
        for(let i = 0; i < tile_live_values.length-1; i++){
            leftStepNull()
        }
        leftStepSum()  
        if(isReach2048()){
            setTimeout(()=>document.getElementById('game_win').style.display = 'flex',200) 
        }
        if(isThereCurrentArrowStep('left')){
            setTimeout(()=>randome_tile(),200) 
        }        
    }
}