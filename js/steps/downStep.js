import setTileStyle from '../setTileStyle.js';
import { isThereCurrentArrowStep, isReach2048 } from '../checkValues.js';
import { tile_live_values } from '../liveValues.js';
import randome_tile from '../random.js';
import { currentScore, bestScore } from '../score.js';

function downStepNull(){
    for(let j = 0; j < tile_live_values.length; j++){
        for(let i = tile_live_values.length-2; i >= 0; i--){ // i = tile_live_values.length-2 -> exclude 4th row
            if(tile_live_values[i][j] !== null && tile_live_values[i+1][j] === null){
                let tile_live = document.getElementsByClassName(`tile_live${i}${j}`)[0]
                tile_live.classList.remove(`tile_live${i}${j}`)
                tile_live.classList.add(`tile_live${i+1}${j}`)
                tile_live_values[i+1][j] = tile_live_values[i][j]
                tile_live_values[i][j] = null
            } 
        }
    }
}

function downStepSum(){
    for(let j = 0; j < tile_live_values.length; j++){
        for(let i = tile_live_values.length-2; i >= 0; i--){ // i = tile_live_values.length-2 -> exclude 4th row
            
            let currentValue = tile_live_values[i][j],
                nextValue = tile_live_values[i+1][j]

            if(currentValue !== null && nextValue !== null && currentValue === nextValue){
                let current_tile_live = document.getElementsByClassName(`tile_live${i}${j}`)[0]
                current_tile_live.classList.remove(`tile_live${i}${j}`)
                current_tile_live.classList.add(`tile_live_${i+1}${j}`)
                current_tile_live.style.zIndex = '10'

                let next_tile_live = document.getElementsByClassName(`tile_live${i+1}${j}`)[0]
                next_tile_live.style.zIndex = '20'

                let value = tile_live_values[i+1][j] * 2
                currentScore['value'] += value
                document.getElementById('current-score-value').textContent = currentScore['value']
                bestScore(currentScore['value'])
                setTileStyle(next_tile_live, value)
                tile_live_values[i][j] = null
                tile_live_values[i+1][j] = value
                downStepNull()

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
    
export default function arrowDown(){
    let firstTime = true
    if(firstTime){
        if(isThereCurrentArrowStep('down')){
            firstTime = false
            for(let i = 0; i < tile_live_values.length-1; i++){
                downStepNull()
            }

            downStepSum()  

            if(isReach2048()){
                setTimeout(()=>document.getElementById('game_win').style.display = 'flex',200) 
            }            
            setTimeout(()=>randome_tile(),200) 
        }
    } 
    else{
        for(let i = 0; i < tile_live_values.length-1; i++){
            downStepNull()
        }

        downStepSum()  

        if(isReach2048()){
            setTimeout(()=>document.getElementById('game_win').style.display = 'flex',200) 
        }
        if(isThereCurrentArrowStep('down')){
            setTimeout(()=>randome_tile(),200) 
        }        
    }
}

