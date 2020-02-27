import setNewTileStyle from '../newTileStyle.js';
import { isThereCurrentArrowStep, isReach2048 } from '../checkValues.js';
import { tile_live_values } from '../liveValues.js';
import randome_tile from '../random.js';
import { current_score_value, bestScore } from '../score.js';

function leftStepNull(){
    for(let i = 0; i < tile_live_values.length; i++){
        for(let j = 1; j < tile_live_values.length; j++){ // 1 -> exclude 1 -th column
            if(tile_live_values[i][j] !== null && tile_live_values[i][j-1] === null){
                let tile_live = document.getElementsByClassName(`tile_live${i}${j}`)[0]
                // console.log(`left${i}${j}`)
                if(tile_live === undefined){debugger}
                tile_live.classList.remove(`tile_live${i}${j}`)
                tile_live.classList.add(`tile_live${i}${j-1}`)
                tile_live_values[i][j-1] = tile_live_values[i][j]
                tile_live_values[i][j] = null
                if(tile_live === undefined){debugger}

            } 
        }
    }
}

function leftStepSum(){
    for(let i = 0; i < tile_live_values.length; i++){
        for(let j = 1; j < tile_live_values.length; j++){ // 1 -> exclude 1 -th column
            
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
                current_score_value['value'] += value
                document.getElementById('current-score-value').textContent = current_score_value['value']
                bestScore(current_score_value['value'])
                setNewTileStyle(next_tile_live, value)
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

export default function arrowLeft(){ 
    let firstTime = true
    if(firstTime){
        // tox stugi qayl hnaravor a teche u qatlery ani u nor vandak haytnvi
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
    // tox qayler ani heto ete eli qayler hnaravor klinen tox nor vandak haytnvi
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

    console.log(tile_live_values,'left')
}

