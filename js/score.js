let currentScore = {
    value:0
}

function bestScore(current_score){
    let bestElement = document.getElementById('best-score-value');
    let firstTime = true;
    if(typeof(Storage) !== "undefined"){
        if(localStorage.best_score_value){
            if(localStorage.best_score_value < current_score){
                localStorage.best_score_value = current_score
                bestElement.textContent = localStorage.best_score_value
            } else{
                bestElement.textContent = localStorage.best_score_value
            }
        } else{
            localStorage.best_score_value = current_score
            bestElement.textContent = localStorage.best_score_value
        }
    } else{
        if(firstTime){
            firstTime = false;
            alert("Sorry, your browser does not support web storage and your best score is not saved after page refresh")
        }
        bestElement.textContent = current_score
    }
}

export { currentScore, bestScore }