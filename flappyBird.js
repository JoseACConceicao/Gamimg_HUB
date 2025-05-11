// Inicializar o jogo
function iniciarJogoFlappy() {
    bird = new Bird();
    pipes = [];
    score = 0;
    gameOver = false;
    paused = false;
    document.body.classList.add('jogando-flappy');
}

// Função principal do jogo
function jogoFlappy() {
    background(135, 206, 235); // Fundo azul céu

    // Atualizar e mostrar o pássaro
    if (!paused && !gameOver) {
        bird.update();
    }
    bird.show();

    // Lidar com os tubos
    if (!paused && !gameOver && frameCount % pipeFrequencyBird === 0) {
        pipes.push(new Pipe());
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        if (!paused && !gameOver) {
            pipes[i].update();
        }
        pipes[i].show();

        if (!paused && !gameOver && pipes[i].hits(bird)) {
            gameOver = true;
        }

        if (!paused && !gameOver && !pipes[i].passed && pipes[i].x + pipes[i].w < bird.x) {
            pipes[i].passed = true;
            score++;
        }

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
    }

    // Mostrar a pontuação
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text(score, width/2, 50);

    // Mensagem de game over
    if (gameOver) {
        fill(0, 0, 0, 150);
        rect(0, 0, width, height);
        fill(255);
        textSize(64);
        text("Perdeste", width/2, height/2);
        textSize(32);
        text("Prime R para recomeçar", width/2, height/2 + 50);
        text("Prime ESC para voltar ao menu", width/2, height/2 + 100);
    }

    // Mostrar mensagem de pause
    if (paused) {
        fill(0, 0, 0, 150);
        rect(0, 0, width, height);
        fill(255);
        textSize(64);
        text("PAUSA", width/2, height/2);
        textSize(32);
        text("Prime P para continuar", width/2, height/2 + 50);
    }
}

// Lidar com as teclas pressionadas para Flappy Bird
function keyPressedFlappy() {
    if (key === 'j' || key === 'J') {
        if (!paused) {
            bird.jump();
            return false;
        }
    }
    if (key === 'r' || key === 'R') {
        iniciarJogoFlappy();
    }
    if (keyCode === ESCAPE) {
        document.body.classList.remove('jogando-flappy');
        estado = 'menu';
    }
    if (key === 'p' || key === 'P') {
        paused = !paused;
    }
}
