import { isArrFull, isThereAnyStep } from './checkValues.js';
import arrowRight from './steps/rightStep.js';
import arrowLeft from './steps/LeftStep.js';
import arrowUp from './steps/UpStep.js';
import arrowDown from './steps/DownStep.js';
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
