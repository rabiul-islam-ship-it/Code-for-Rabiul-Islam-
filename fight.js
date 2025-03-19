console.clear();

const canvas = document.querySelector('.canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height);

const gravity = 0.7;
const backGround = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './fightingPng/background_layer_3.png'
});

const shop = new Sprite({
    position: {
        x: 600,
        y: 222,
    },
    imageSrc: './fightingPng/shop_anim.png',
    scale: 2.75,
    framemax: 6,
});


const player = new Fighter({
    position: { 
    x: 0,
    y: 0,
    },
    velocity: { 
    x: 0,
    y: 10,
    },
    offset: {
    x: 0,
    y: 0,
    },
    imageSrc: './fightingPng/samuraimac/Idle.png',
    framemax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 158,
    },
    Sprites: {
        idle: {
        imageSrc: './fightingPng/samuraimac/Idle.png',
        framemax: 8,
        },
        run: {
            imageSrc: './fightingPng/samuraimac/Run.png',
            framemax: 8,
            },
        jump: {
            imageSrc: './fightingPng/samuraimac/Jump.png',
            framemax: 2,
                },
        fall: {
            imageSrc: './fightingPng/samuraimac/Fall.png',
            framemax: 2,
        },
        attack1: {
        imageSrc: './fightingPng/samuraimac/Attack1.png',
        framemax: 6,
        },
        takeHit: {
            imageSrc: './fightingPng/samuraimac/Take Hit - white silhouette.png',
            framemax: 4,
            },
        Death: {
            imageSrc: './fightingPng/samuraimac/Death.png',
            framemax: 6,
            }
    },
    attackBox: {
        offset:{
            x: 100,
            y: 50,
        },
        width: 160,
        height: 50,
    }


});

const enemy = new Fighter({
    position: { 
    x: 400,
    y: 100,
    },
    velocity: { 
    x: 0,
    y: 0,
    },
    
    offset: {
    x: -50,
    y: 0,
    },
    color: 'blue',
    imageSrc: './fightingPng/kenji/Idle.png',
    framemax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 173,
    },
    Sprites: {
        idle: {
        imageSrc: './fightingPng/kenji/Idle.png',
        framemax: 4,
        },
        run: {
            imageSrc: './fightingPng/kenji/Run.png',
            framemax: 8,
            },
        jump: {
            imageSrc: './fightingPng/kenji/Jump.png',
            framemax: 2,
                },
        fall: {
            imageSrc: './fightingPng/kenji/Fall.png',
            framemax: 2,
        },
        attack1: {
        imageSrc: './fightingPng/kenji/Attack1.png',
        framemax: 4,
        },
        takeHit: {
        imageSrc: './fightingPng/kenji/Take hit.png',
        framemax: 3,
        },
        Death: {
            imageSrc: './fightingPng/kenji/Death.png', 
            framemax: 7,
        },
        
    },
    attackBox: {
        offset:{
            x: -170,
            y: 50,
        },
        width: 170,
        height: 50,
    }

});

const keys = {
a: {
    pressed: false,
},
d: {
    pressed: false,
},
w: {
    pressed: false,
},
ArrowRight: {
    pressed: false,
},
ArrowLeft: {
    pressed: false,
},

};



decreaseTimer();


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'rgba(255,255,255,0.15)'
    c.fillRect(0,0,canvas.width,canvas.height)
    c.fillStyle = 'black';
    c.fillRect(0,0,canvas.width,canvas.height);
    backGround.update();
    shop.update();
    player.update();
    enemy.update();

    //player movement
    player.velocity.x = 0;
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.switchSprite('run');
    }else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.switchSprite('run')
        }else{player.switchSprite('idle');


    };

    if (player.velocity.y < 0 ) {
        player.switchSprite('jump');
        
    }else if (player.velocity.y > 0 ) {
        player.switchSprite('fall');

    }

     //enemy movement
     enemy.velocity.x = 0;
     if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
         enemy.velocity.x = -5
         enemy.switchSprite('run');
     }else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
         enemy.velocity.x = 5
         enemy.switchSprite('run');
     }else{enemy.switchSprite('idle');
     };

     if (enemy.velocity.y < 0 ) {
        enemy.switchSprite('jump');
        
    }else if (enemy.velocity.y > 0 ) {
        enemy.switchSprite('fall');

    }

     //Detect for Collission and enemy gets hit
     if (rectengularCollision({
        rectengle1: player,
        rectengle2: enemy
     })
        && player.isAttacking & player.framesCurent === 4) {
        enemy.takeHit();
        player.isAttacking = false;
        document.querySelector('.enemyHealth2').style.width = enemy.health + '%';
     };

     //if player misses
     if (player.isAttacking & player.framesCurent ===4) {
        player.isAttacking = false;

     }

// this is where our player gets hit 
     if (rectengularCollision({
        rectengle1: enemy,
        rectengle2: player
     })
        && enemy.isAttacking & enemy.framesCurent === 2) {
        player.takeHit();
        enemy.isAttacking = false;
        document.querySelector('.playerHealth2').style.width = player.health + '%';
     };

     //if enemy misses
     if (enemy.isAttacking & enemy.framesCurent ===2) {
        enemy.isAttacking = false;

     }

     //end game based on health
     if (enemy.health<=0 || player.health<=0) {
        determineWiner({player,enemy,timerId});

     }

};


animate();



window.addEventListener('keydown', (event)=>{
    if (!player.dead) {
        
    
    switch (event.key) {
        case 'd':
        keys.d.pressed = true; 
        player.lastKey = 'd'   
        break;
        case 'a':
        keys.a.pressed = true;  
        player.lastKey = 'a' 
        break;
        case 'w':
        player.velocity.y = -20;
        break;
        case ' ':
        player.attack();
        break;}}

    if (!enemy.dead) {
        
    
        switch (event.key) {
        case 'ArrowRight':
        keys.ArrowRight.pressed = true; 
        enemy.lastKey = 'ArrowRight'   
        break;
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = true;  
        enemy.lastKey = 'ArrowLeft' 
        break;
        case 'ArrowUp':
        enemy.velocity.y = -20;
        break;
        case 'ArrowDown':
        enemy.attack();
        break;
    
    
        default:
            break;
    }};
})

window.addEventListener('keyup', (event)=>{
    switch (event.key) {
        case 'd':
        keys.d.pressed = false;
        break;
        case 'a':
        keys.a.pressed = false;  
        break;
        case 'w':
        keys.w.pressed = false;  
        break;

        case 'ArrowRight':
        keys.ArrowRight.pressed = false;
        break;
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false;  
        break;
        


        default:
            break;
    };

    //Enemy Keys
    switch (event.key) {
        
        case 'ArrowRight':
        keys.ArrowRight.pressed = false;
        break;
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false;  
        break;
       

        default:
            break;
    }
})
