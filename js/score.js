let current_score_value = {
    value:0
}

function bestScore(current_score_value){
    let bestElement = document.getElementById('best-score-value');
    let firstTime = true;
    if(typeof(Storage) !== "undefined"){
        if(localStorage.best_score_value){
            if(localStorage.best_score_value < current_score_value){
                localStorage.best_score_value = current_score_value
                bestElement.textContent = localStorage.best_score_value
            } else{
                bestElement.textContent = localStorage.best_score_value
            }
        } else{
            localStorage.best_score_value = current_score_value
            bestElement.textContent = localStorage.best_score_value
        }
    } else{
        if(firstTime){
            firstTime = false;
            alert("Sorry, your browser does not support web storage and your best score is not saved after page refresh")
        }
        bestElement.textContent = current_score_value
    }
}

export { current_score_value, bestScore }