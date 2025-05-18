// Função para iniciar o jogo da cobra
function iniciarJogoCobra() {
    // Inicializar a cobra com 3 segmentos
    cobra = [
        {x: 400, y: 300},
        {x: 380, y: 300},
        {x: 360, y: 300}
    ];
    
    // Gerar primeira comida
    gerarComida();
    
    // Resetar variáveis
    direcao = 'RIGHT';
    proximaDirecao = 'RIGHT';
    pontuacao = 0;
    jogoAcabouCobra = false;
    velocidade = VELOCIDADE_INICIAL;
    ultimoUpdate = 0;
    document.body.classList.add('jogando-cobra');
}

// Função principal do jogo da cobra
function jogoCobra() {
    resizeCanvas(900, 600);
    document.body.classList.add('jogando-cobra');
    background(135, 206, 235);
    noFill();
    stroke(0);
    strokeWeight(2);
    image(fundo.cobra, 0, 0, width, height);
    rect(0, 0, width, height);
    
    
    // Desenhar pontuação
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(20, 20, 150, 40, 10, 10, 10, 10);
    noStroke();
    fill(0);
    textSize(20);
    textAlign(LEFT, CENTER);
    text(`Pontuação: ${pontuacao}`, 30, 40);
    
    if (pausedCobra) {
        fill(0, 0, 0, 180);
        rect(0, 0, width, height);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(32);
        text('PAUSADO', width / 2, height / 2 - 20);
        textSize(16);
        text('Pressiona P para continuar\nESC para sair', width / 2, height / 2 + 20);
        return; // Não atualiza o jogo enquanto está pausado
    }
    
    if (jogoAcabouCobra) {
        // Tela de game over
        fill(0, 0, 0, 200);
        rect(0, 0, width, height);
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('Game Over!', width/2, height/2 - 30);
        textSize(20);
        text(`Pontuação final: ${pontuacao}`, width/2, height/2 + 10);
        text('Pressione ENTER para reiniciar ou ESC para voltar ao Menu', width/2, height/2 + 50);
        return;
    }
    
    // Atualizar posição da cobra
    let agora = millis();
    if (agora - ultimoUpdate > 1000 / velocidade) {
        atualizarCobra();
        ultimoUpdate = agora;
    }
    
    // Desenhar cobra
    desenharCobra();
    
    // Desenhar comida
    desenharComida();
}

// Função para atualizar a posição da cobra
function atualizarCobra() {
    // Atualizar direção
    direcao = proximaDirecao;
    
    // Calcular nova posição da cabeça
    let novaCabeca = {x: cobra[0].x, y: cobra[0].y};
    
    switch(direcao) {
        case 'UP':
            novaCabeca.y -= TAMANHO_CELULA_COBRA;
            break;
        case 'DOWN':
            novaCabeca.y += TAMANHO_CELULA_COBRA;
            break;
        case 'LEFT':
            novaCabeca.x -= TAMANHO_CELULA_COBRA;
            break;
        case 'RIGHT':
            novaCabeca.x += TAMANHO_CELULA_COBRA;
            break;
    }
    
    // Verificar colisões
    if (verificarColisao(novaCabeca)) {
        jogoAcabouCobra = true;
        return;
    }
    
    // Adicionar nova cabeça
    cobra.unshift(novaCabeca);
    
    // Verificar se comeu a comida
    if (novaCabeca.x === comida.x && novaCabeca.y === comida.y) {
        pontuacao += 10;
        velocidade = VELOCIDADE_INICIAL + Math.floor(pontuacao / 100);
        sons.comer.play(0, 1, 0.05);
        gerarComida();
    } else {
        // Remover cauda se não comeu
        cobra.pop();
    }
}

// Função para desenhar a cobra
function desenharCobra() {
    for (let i = 0; i < cobra.length; i++) {
        fill(0, 150, 0);
        if (i === 0) fill(0, 200, 0); // Cabeça mais clara
        noStroke();
        rect(cobra[i].x, cobra[i].y, TAMANHO_CELULA_COBRA, TAMANHO_CELULA_COBRA);
    }
}

// Função para desenhar a comida
function desenharComida() {
    fill(255, 0, 0);
    noStroke();
    //rect(comida.x, comida.y, TAMANHO_CELULA_COBRA, TAMANHO_CELULA_COBRA);
    image(cobraImg.maca, comida.x, comida.y, TAMANHO_CELULA_COBRA, TAMANHO_CELULA_COBRA)
}

// Função para gerar nova comida
function gerarComida() {
    let x = Math.floor(random(width / TAMANHO_CELULA_COBRA)) * TAMANHO_CELULA_COBRA;
    let y = Math.floor(random(4, (height - 80) / TAMANHO_CELULA_COBRA)) * TAMANHO_CELULA_COBRA + 80;
    
    // Verificar se a comida não está sobre a cobra
    for (let segmento of cobra) {
        if (segmento.x === x && segmento.y === y) {
            return gerarComida(); // Recursão para encontrar posição válida
        }
    }
    
    comida = {x: x, y: y};
    console.log(comida);
}

// Função para verificar colisões
function verificarColisao(cabeca) {
    // Colisão com paredes
    if (cabeca.x < 0 || cabeca.x >= width || cabeca.y < 0 || cabeca.y >= height || cabeca.x < 170 && cabeca.y < 60) {
        return true;
    }
    
    // Colisão com a própria cobra
    for (let i = 1; i < cobra.length; i++) {
        if (cabeca.x === cobra[i].x && cabeca.y === cobra[i].y) {
            return true;
        }
    }
    
    return false;
}

// Função para lidar com teclas pressionadas
function keyPressedCobra() {
    if (keyCode === ESCAPE) {
        document.body.classList.remove('jogando-cobra');
        estado = 'menu';
        reiniciarJogoCobra();
        pausedCobra = false;
        return;
    }
    // Pausa/despausa com a tecla P
    if (key === 'p' || key === 'P') {
        pausedCobra = !pausedCobra;
        return;
    }
    if (!jogoAcabouCobra && !pausedCobra) {
        if ((key === 'w' || key === 'W') && direcao !== 'DOWN') {
            proximaDirecao = 'UP';
            return false;
        } else if ((key === 's' || key === 'S') && direcao !== 'UP') {
            proximaDirecao = 'DOWN';
            return false;
        } else if ((key === 'a' || key === 'A') && direcao !== 'RIGHT') {
            proximaDirecao = 'LEFT';
            return false;
        } else if ((key === 'd' || key === 'D') && direcao !== 'LEFT') {
            proximaDirecao = 'RIGHT';
            return false;
        }
    } else if (jogoAcabouCobra && keyCode === ENTER) {
        iniciarJogoCobra();
    }
}

function reiniciarJogoCobra() {
    cobra = [
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 }
    ];
    direcao = 'RIGHT';
    proximaDirecao = 'RIGHT';
    pontuacao = 0;
    jogoAcabouCobra = false;
    velocidade = VELOCIDADE_INICIAL;
    ultimoUpdate = 0;
}
