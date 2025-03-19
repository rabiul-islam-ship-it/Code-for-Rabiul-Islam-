console.clear();


class Sprite {
    constructor({position,imageSrc,scale= 1,framemax = 1,offset = {x:0,y:0,}}) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framemax = framemax;
        this.framesCurent = 0;
        this.frameElapsed = 0;
        this.frameHold = 5;
        this.offset = offset;
     
    };

    draw(){
        c.drawImage(this.image,
            this.framesCurent*(this.image.width / this.framemax),
            0,
            this.image.width / this.framemax,
            this.image.height,
             this.position.x-this.offset.x,
             this.position.y-this.offset.y,
              (this.image.width/this.framemax) * this.scale,
               this.image.height * this.scale)       
    };

    animateFrames(){
        this.frameElapsed++
        if (this.frameElapsed%this.frameHold===0) {
            if (this.framesCurent<this.framemax-1) {
                this.framesCurent++
            }else{this.framesCurent = 0}
               };
    }

    

    update(){
        this.draw();
        this.animateFrames();
        
        };


       
};

class Fighter extends Sprite{
    constructor({position,velocity,color = 'red', 
        imageSrc,scale= 1,
        framemax = 1,
        offset = {x:0,y:0,},
        Sprites,
        attackBox = {offset: {}, width: undefined, height: undefined,}}) {
        super({
            position,
            imageSrc,
            scale,
            framemax,
            offset,
        })
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        };
        this.color = color;
        this.isAttacking;
        this.health = 100;
        this.framesCurent = 0;
        this.frameElapsed = 0;
        this.frameHold = 5;
        this.Sprites = Sprites;
        this.dead = false;

        for (const Sprite in this.Sprites) {
            Sprites[Sprite].image = new Image();
            Sprites[Sprite].image.src = Sprites[Sprite].imageSrc;
        };
    };

    

    update(){
        this.draw();
        if (!this.dead)
        this.animateFrames();
        //attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        //draw the attackbox
        /*c.fillRect(this.attackBox.position.x,
             this.attackBox.position.y,
             this.attackBox.width,
             this.attackBox.height)*/

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        //Gravity functions
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 0) {
            this.velocity.y = 0
            this.position.y = 426.26;
        }else this.velocity.y += gravity;

    };

    attack(){
        this.switchSprite('attack1')
        this.isAttacking = true;
        
    };

    takeHit(){
        this.health -= 20

        if (this.health<=0) {
            this.switchSprite('Death');
        }else{this.switchSprite('takeHit');
        }

    }

    switchSprite(Sprite){

        if (this.image === this.Sprites.Death.image){
            
            if(this.framesCurent === this.Sprites.Death.framemax-1)
                this.dead =true;
                return} 
            
        
        //over writing all other animation with the attack animation
        if (this.image === this.Sprites.attack1.image &&
            this.framesCurent < this.Sprites.attack1.framemax-1
        )return

        //Over Write when fighter gets hit
        if (this.image === this.Sprites.takeHit.image && 
            this.framesCurent < this.Sprites.takeHit.framemax-1
        )return 
            
        
            
        switch (Sprite) {
            case 'idle':
            if (this.image !== this.Sprites.idle.image) {
                this.image = this.Sprites.idle.image
                this.framemax = this.Sprites.idle.framemax;
                this.framesCurent = 0;
            }
            break;
            case "run":
            if (this.image !== this.Sprites.run.image) {
                this.image = this.Sprites.run.image
                this.framemax = this.Sprites.run.framemax;
                this.framesCurent = 0;
                }
            break;
            case 'jump':
            if (this.image !== this.Sprites.jump.image) {
                this.image = this.Sprites.jump.image;
                this.framemax = this.Sprites.jump.framemax; 
                this.framesCurent = 0;
                }
            break;
            case 'fall':
            if (this.image !== this.Sprites.fall.image) {
                this.image = this.Sprites.fall.image;
                this.framemax = this.Sprites.fall.framemax; 
                this.framesCurent = 0;
                }
            break;
            case 'attack1':
            if (this.image !== this.Sprites.attack1.image) {
                this.image = this.Sprites.attack1.image;
                this.framemax = this.Sprites.attack1.framemax; 
                this.framesCurent = 0;
                }
            break;
            case 'takeHit':
            if (this.image !== this.Sprites.takeHit.image) {
                this.image = this.Sprites.takeHit.image;
                this.framemax = this.Sprites.takeHit.framemax; 
                this.framesCurent = 0;
                }
            break;
            case 'Death':
            if (this.image !== this.Sprites.Death.image) {
                this.image = this.Sprites.Death.image;
                this.framemax = this.Sprites.Death.framemax; 
                this.framesCurent = 0;
                }
            break;

        
            default:
                break;
        }
    }

};