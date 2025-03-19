console.clear();

function rectengularCollision({rectengle1, rectengle2}) {
    return(rectengle1.attackBox.position.x + rectengle1.attackBox.width >= rectengle2.position.x 
        && rectengle1.attackBox.position.x <= rectengle2.position.x + rectengle2.width 
        && rectengle1.attackBox.position.y + rectengle1. attackBox.height >= rectengle2.position.y
        && rectengle1.attackBox.position.y <= rectengle2.position.y + rectengle2.height)
}

function determineWiner({player,enemy,timerId}) {
    clearTimeout(timerId)
    document.querySelector('.tie').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('.tie').innerHTML = 'Tie';
    }else if (player.health>enemy.health) {
        document.querySelector('.tie').innerHTML = 'player 1 wins';
    }else if (player.health<enemy.health) {
        document.querySelector('.tie').innerHTML = 'player 2 wins';
    }
};

let timer = 60;
let timerId
function decreaseTimer() {
    if (timer > 0) {
        document.querySelector('.timer').innerHTML = timer;
        timer --
       timerId =  setTimeout(decreaseTimer,1000)

    };

    if (timer === 0) {
        determineWiner({player,enemy,timerId}) 
    };
    
};