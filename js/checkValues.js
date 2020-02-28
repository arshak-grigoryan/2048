import { tile_live_values } from './liveValues.js';
import { gameState } from './gameState.js';

function isArrFull(){
    let arr = tile_live_values
    let counter = 0
    for(let key in arr){
        for(let val of arr[key]){
            if(val !== null ){
                counter++
            }
        }
    }
    if(counter === 16){
        return true
    } else{
        return false
    }
}

function fillArrWithCurrentValues(arr){
    for(let key in tile_live_values){
        for(let nkey in tile_live_values[key]){
            arr[key][nkey] = tile_live_values[key][nkey]
        }
    }
    return arr
}
function addFrameWithUndefinedValues(arr){
    arr.unshift([undefined,undefined,undefined,undefined])
    arr.push([undefined,undefined,undefined,undefined])
    for(let key in arr){
        arr[key].unshift(undefined)
        arr[key].push(undefined)
    }
    return arr   
}

function isThereCurrentArrowStep(arrowType){
    let arr_empty = [[],[],[],[]]
    let arr = addFrameWithUndefinedValues(fillArrWithCurrentValues(arr_empty))
    let counter_values = 0,
        check_for_step = 0

    for(let i = 1; i < arr.length-1; i++){
        for(let j = 1; j < arr.length-1; j++){
            if(arr[i][j] >= 2){
                counter_values++
                if(arrowType === 'right'){
                    if(arr[i][j+1] !== undefined && arr[i][j+1] !== null && arr[i][j] !== arr[i][j+1]){
                        check_for_step++
                    } 
                    if(arr[i][j+1] === undefined){
                        check_for_step++
                    }
                }
                else if(arrowType === 'left'){
                    if(arr[i][j-1] !== undefined && arr[i][j-1] !== null && arr[i][j] !== arr[i][j-1]){
                        check_for_step++
                    } 
                    if(arr[i][j-1] === undefined){
                        check_for_step++
                    }
                }
                else if(arrowType === 'up'){
                    if(arr[i-1][j] !== undefined && arr[i-1][j] !== null && arr[i][j] !== arr[i-1][j]){
                        check_for_step++
                    } 
                    if(arr[i-1][j] === undefined){
                        check_for_step++
                    }
                }
                else if(arrowType === 'down'){
                    if(arr[i+1][j] !== undefined && arr[i+1][j] !== null && arr[i][j] !== arr[i+1][j]){
                        check_for_step++
                    } 
                    if(arr[i+1][j] === undefined){
                        check_for_step++
                    }
                }
            }
        }
    }
    if(check_for_step === counter_values){
        return false
    } else{
        return true
    }
}


function isThereAnyStep(){

    let arr_empty = [[],[],[],[]]
    let arr = addFrameWithUndefinedValues(fillArrWithCurrentValues(arr_empty))
    let counter = 0

    for(let i = 1; i < arr.length-1; i++){
        for(let j = 1; j < arr.length-1; j++){
            if(
                arr[i][j] !== arr[i][j+1] &&
                arr[i][j] !== arr[i][j-1] &&
                arr[i][j] !== arr[i+1][j] &&
                arr[i][j] !== arr[i-1][j]
            ){
                counter++   
            }
        }
    }
    if(counter !== 16){
        return true
    } else{
        return false
    }
}

function isReach2048(){
    if(gameState['boolContinue']){
        for(let key in tile_live_values){
            for(let val of tile_live_values[key]){
                if(val === 2048){
                    gameState['boolContinue'] = false
                    gameState['bool'] = false
                    return true
                }
            }
        }
        return false
    }
    return false
}

export { isArrFull, isThereCurrentArrowStep, isThereAnyStep, isReach2048 }