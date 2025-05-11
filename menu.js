// menu.js
function menu() {
    resizeCanvas(900, 600);
    background(135, 206, 235);
    image(fundo.menu, 0, 0, width, height);
    noStroke();

    //Iniciar transformação
    push();
    translate(50, 10);

    //Desenhar as imagens dos jogos
    image(cartas.logo, 70, 300, 100, 100); //Jogo da Memória
    image(galo, 25, 0 ,100, 100); //Jogo do Galo
    image(wortle, 337.5, 30, 120, 100); //Jogo do Wortle
    image(cobraImg.logo, 375, 450, 100, 100); //Jogo da Cobra
    image(flappyImg.logo, 575, -80, 300, 300); //Jogo da FlappyBird
    image(minesweeperImg.logo, 665, 300, 120, 100); //Jogo do Minesweeper

    //Confirmar a queda do player
    if (player.isDead) {
        //Dar respawn ao player após um certo tempo
        if (millis() - deathTime > respawnTime) player.respawn();
    } else {
        player.update();
    }

    player.show();

    //Mostrar plataformas e verificar interação
    for (let plataforma of plataformas) {
        plataforma.show();
        if (player.isOnPlatform(plataforma) && !player.isDead && plataforma.isMiniGame) {
            fill(0);
            textSize(20);
            textAlign(CENTER);
            text('Pressione ENTER para jogar', (width / 2) - 50, 30);
            if (!player.isDead && keyIsDown(ENTER) && player.x >= 50 && player.x <= 200 && player.y <= 400 && player.y >= 300) {
                estado = 'jogoMemoria';
                sons.entrarJogo.play(0, 1, 0.05);
            }
            if (!player.isDead && keyIsDown(ENTER) && player.x >= 0 && player.x <= 150 && player.y >= 0 && player.y <= 100) {
                estado = 'jogoGalo';
                sons.entrarJogo.play(0, 1, 0.05);
            }
            if (!player.isDead && keyIsDown(ENTER) && player.x >= 325 && player.x <= 475 && player.y >= 0 && player.y <= 115) {
                estado = 'jogoWortle';
                sons.entrarJogo.play(0, 1, 0.05);
            }
            if (!player.isDead && keyIsDown(ENTER) && player.x >= 350 && player.x <= 500 && player.y >= 450 && player.y <= 550) {
                estado = 'jogoCobra';
                sons.entrarJogo.play(0, 1, 0.05);
            }
            if (!player.isDead && keyIsDown(ENTER) && player.x >= 650 && player.x <= 800 && player.y >= 0 && player.y <= 100) {
                estado = 'jogoFlappyBird';
                sons.entrarJogo.play(0, 1, 0.05);
            }
            if (!player.isDead && keyIsDown(ENTER) && player.x >= 650 && player.x <= 800 && player.y >= 300 && player.y <= 400) {
                estado = 'jogoMineswipper';
                sons.entrarJogo.play(0, 1, 0.05);
            }
        }
    }

    //Fim da transformação
    pop();
}

// Adicionar função para prevenir o comportamento padrão das setas no menu
function keyPressedMenu() {
    if (key === 'w' || key === 'W' || key === 'a' || key === 'A' || 
        key === 's' || key === 'S' || key === 'd' || key === 'D') {
        if (key === 'w' || key === 'W') {
            player.jump();
        }
        return false;
    }
}


