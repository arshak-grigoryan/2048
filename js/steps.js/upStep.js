import setNewTileStyle from '../newTileStyle.js';
import { isThereCurrentArrowStep, isReach2048 } from '../checkValues.js';
import { tile_live_values } from '../liveValues.js';
import randome_tile from '../random.js';
import { current_score_value, bestScore } from '../score.js';

function upStepNull(){
    for(let j = 0; j < tile_live_values.length; j++){
        for(let i = 1; i < tile_live_values.length; i++){
            if(tile_live_values[i][j] !== null && tile_live_values[i-1][j] === null){
                let tile_live = document.getElementsByClassName(`tile_live${i}${j}`)[0]
                // console.log(`up${i}${j}`)
                tile_live.classList.remove(`tile_live${i}${j}`)
                tile_live.classList.add(`tile_live${i-1}${j}`)
                tile_live_values[i-1][j] = tile_live_values[i][j]
                tile_live_values[i][j] = null
            } 
        }
    }
}

function upStepSum(){
    for(let j = 0; j < tile_live_values.length; j++){
        for(let i = 1; i < tile_live_values.length; i++){
            
            let currentValue = tile_live_values[i][j],
                nextValue = tile_live_values[i-1][j]

            if(currentValue !== null && nextValue !== null && currentValue === nextValue){
                let current_tile_live = document.getElementsByClassName(`tile_live${i}${j}`)[0]
                current_tile_live.classList.remove(`tile_live${i}${j}`)
                current_tile_live.classList.add(`tile_live_${i-1}${j}`)
                current_tile_live.style.zIndex = '10'

                let next_tile_live = document.getElementsByClassName(`tile_live${i-1}${j}`)[0]
                next_tile_live.style.zIndex = '20'

                let value = tile_live_values[i-1][j] * 2
                current_score_value['value'] += value
                document.getElementById('current-score-value').textContent = current_score_value['value']
                bestScore(current_score_value['value'])
                setNewTileStyle(next_tile_live, value)
                tile_live_values[i][j] = null
                tile_live_values[i-1][j] = value
                upStepNull()

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

export default function arrowUp(){
    let firstTime = true
    if(firstTime){
        // tox stugi qayl hnaravor a teche u qatlery ani u nor vandak haytnvi
        if(isThereCurrentArrowStep('up')){
            firstTime = false
            for(let i = 0; i < tile_live_values.length-1; i++){
                upStepNull()
            }

            upStepSum()  
            if(isReach2048()){
                setTimeout(()=>document.getElementById('game_win').style.display = 'flex',200) 
            }
            setTimeout(()=>randome_tile(),200) 
        }
    } 
    // tox qayler ani heto ete eli qayler hnaravor klinen tox nor vandak haytnvi
    else{
        for(let i = 0; i < tile_live_values.length-1; i++){
            upStepNull()
        }

        upStepSum()  
        if(isReach2048()){
            setTimeout(()=>document.getElementById('game_win').style.display = 'flex',200) 
        }
        if(isThereCurrentArrowStep('up')){
            setTimeout(()=>randome_tile(),200) 
        }        
    }

    console.log(tile_live_values,'up')
}