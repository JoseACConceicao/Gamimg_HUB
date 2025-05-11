// Classe da plataforma
class Plataforma {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.isMiniGame = false; //Inicialmente false é defenido no Setup
        this.imagem = fundo.plataforma;
    }

    show() {
        fill(0, 255, 0);
        image(this.imagem, this.x, this.y, this.width, this.height);
    }
}

class Carta {
    constructor(imagem){
        this.imagem = imagem;
        this.virada = false; //Carta começa virada para baixo
        this.pareada = false; //Indica se a carta já foi pareada
    }
    
}

// Bird class
class Bird {
    constructor() {
        this.x = 100;
        this.y = height / 2;
        this.velocity = 0;
        this.size = 30;
    }

    update() {
        if (!gameOver) {
            this.velocity += gravityBird;
            this.y += this.velocity;

            // Check if bird hits the ground or ceiling
            if (this.y > height - this.size/2 || this.y < this.size/2) {
                gameOver = true;
            }
        }
    }

    jump() {
        if (!gameOver) {
            this.velocity = jumpForceBird;
        }
    }

    show() {
        fill(255, 255, 0);
        ellipse(this.x, this.y, this.size, this.size);
    }
}


// Pipe class
class Pipe {
    constructor() {
        this.spacing = pipeGapBird;
        this.top = random(height - this.spacing - 100);
        this.bottom = this.top + this.spacing;
        this.x = width;
        this.w = 50;
        this.passed = false;
    }

    update() {
        this.x -= pipeSpeedBird;
    }

    show() {
        fill(0, 255, 0);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, this.bottom, this.w, height - this.bottom);
    }

    offscreen() {
        return this.x < -this.w;
    }

    hits(bird) {
        if (bird.y - bird.size/2 < this.top || bird.y + bird.size/2 > this.bottom) {
            if (bird.x + bird.size/2 > this.x && bird.x - bird.size/2 < this.x + this.w) {
                return true;
            }
        }
        return false;
    }
}

class Player {
    constructor() {
        this.x = spawnX;
        this.y = spawnY;
        
        this.velocityX = 0;
        this.velocityY = 0;
        this.jumping = true;
        this.isDead = false;
        this.spriteSheet = jogador;
        this.sprites = [];

        //Animação do jogador
        this.spriteWidth = 30; // Largura de cada frame
        this.spriteHeight = 80; // Altura de cada frame
        this.animations = {
            idle: { frames: 6, row: 0, currentFrame: 0 },
            walkLeft: { frames: 8, row: 1, currentFrame: 0 },
            walkRight: { frames: 8, row: 2, currentFrame: 0 },
            jumpRight: { frames: 10, row: 3, currentFrame: 0 },
            jumpLeft: { frames: 10, row: 4, currentFrame: 0 }
        };
        this.currentAnim = 'idle';
        this.lastFrameTime = 0;
        this.animationSpeed = 100; // ms entre frames
        this.facing = 'right'; // Direção inicial
    }

    update() {
        //Aplicar gravidade
        this.velocityY += gravity;
        this.y += this.velocityY;

        // Controles de movimento
        if (keyIsDown(65) || keyIsDown(97)) { // A ou a
            this.x -= 3;
            this.facing = 'left';
            if (!sons.andar.isPlaying()) {
                sons.andar.play(0, 1, 0.05, 0, 1);
            }
        }
        if (keyIsDown(68) || keyIsDown(100)) { // D ou d
            this.x += 3;
            this.facing = 'right';
            if (!sons.andar.isPlaying()) {
                sons.andar.play(0, 1, 0.05, 0, 1);
            }
        }
        
        // Parar o som quando não estiver se movendo
        if (!keyIsDown(65) && !keyIsDown(97) && !keyIsDown(68) && !keyIsDown(100)) {
            sons.andar.stop();
        }

        // Verificar colisão com plataformas
        for (let plataforma of plataformas) {
            if (this.isColliding(plataforma)) {
                // Determinar a direção da colisão
                let overlapX = Math.min(this.x + this.width, plataforma.x + plataforma.width) - Math.max(this.x, plataforma.x);
                let overlapY = Math.min(this.y + this.height, plataforma.y + plataforma.height) - Math.max(this.y, plataforma.y);

                if (overlapX < overlapY) {
                    // Colisão lateral
                    if (this.x < plataforma.x) {
                        this.x = plataforma.x - this.width;
                    } else {
                        this.x = plataforma.x + plataforma.width;
                    }
                } else {
                    // Colisão vertical
                    if (this.y < plataforma.y) {
                        this.y = plataforma.y - this.height;
                        this.velocityY = 0;
                        this.jumping = false;
                    } else {
                        this.y = plataforma.y + plataforma.height;
                        this.velocityY = 0;
                    }
                }
            }
        }

        //Limites do Canvas (lados e topo)
        if(this.x < 0) this.x = 0;
        else if(this.x + this.width > width) this.x = width - this.width;
        
        if(this.y < 0){
            this.y = 0;
            this.velocityY = 0;
        }

        //Verificar queda no precipício
        if(this.y > height) this.die();

        // Determinar animação com base no movimento
        if(this.jumping) {
            if (this.facing === 'right') this.currentAnim = 'jumpRight';
            else this.currentAnim = 'jumpLeft'; 
        } else if (keyIsDown(65) || keyIsDown(97) || keyIsDown(68) || keyIsDown(100)) {
            if (this.facing === 'right') this.currentAnim = 'walkRight';
            else this.currentAnim = 'walkLeft';
        } else {
            this.currentAnim = 'idle';
        }

        // Atualizar animação
        this.updateAnimation();
    }

    updateAnimation() {
        if(millis() - this.lastFrameTime > this.animationSpeed) {
            const anim = this.animations[this.currentAnim];
            anim.currentFrame = (anim.currentFrame + 1) % anim.frames;
            this.lastFrameTime = millis();
        }
    }

    show() {
        if(!this.isDead) {
            const anim = this.animations[this.currentAnim];
            let sx = anim.currentFrame * this.spriteWidth;
            let sy = anim.row * this.spriteHeight;
            
            // Desenhar o sprite com as dimensões corretas
            image(
                this.spriteSheet,
                this.x, this.y, 
                this.width, this.height,
                sx, sy,
                this.spriteWidth, this.spriteHeight
            );
        }
    }

    jump() {
        if (!this.jumping && !this.isDead) {
            this.velocityY = jumpForce;
            this.jumping = true;
            if (estado === 'menu') sons.saltar.play(0, 1, 0.01);
        }
    }

    die() {
        this.isDead = true;
        deathTime = millis();
        sons.morte.play(0, 1, 0.05);
    }

    respawn() {
        this.x = spawnX;
        this.y = spawnY;
        this.velocityX = 0;
        this.velocityY = 0;
        this.jumping = false;
        this.isDead = false;
    }

    isColliding(plataforma) {
        return this.x < plataforma.x + plataforma.width &&
            this.x + this.width > plataforma.x &&
            this.y < plataforma.y + plataforma.height &&
            this.y + this.height > plataforma.y;
    }

    isOnPlatform(plataforma) {
        return this.x + this.width > plataforma.x && this.x < plataforma.x + plataforma.width &&
            this.y + this.height == plataforma.y;
    }
}