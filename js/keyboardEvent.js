import { isArrFull, isThereAnyStep } from './checkValues.js';
import arrowRight from './steps.js/rightStep.js';
import arrowLeft from './steps.js/LeftStep.js';
import arrowUp from './steps.js/UpStep.js';
import arrowDown from './steps.js/DownStep.js';
import { gameState } from './gameState.js';

export default function arrow(event){
    if(gameState.bool){
    if(isArrFull()){
        if(!isThereAnyStep()){
            setTimeout(()=>document.getElementById('game_over').style.display = 'flex',200)
        } else{
            switch(event.key){
                case 'ArrowLeft': return arrowLeft()
                case 'ArrowUp': return arrowUp()
                case 'ArrowRight': return arrowRight()
                case 'ArrowDown': return arrowDown()
            }
        }
    } else{
        switch(event.key){
            case 'ArrowLeft': return arrowLeft()
            case 'ArrowUp': return arrowUp()
            case 'ArrowRight': return arrowRight()
            case 'ArrowDown': return arrowDown()
        }
    }
    }        
}
