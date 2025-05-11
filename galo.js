// Jogo do Galo
function jogoGalo() {
    resizeCanvas(900, 600);
    background(135, 206, 235);
    
    // Garantir que o tabuleiro está inicializado
    if (!tabuleiro) {
        iniciarJogoGalo();
        
    }

    if (jogoAcabou) {
        noFill();
        stroke(0);
        strokeWeight(4);
        textSize(32);
        textAlign(CENTER, CENTER);
        if (verificarVitoriaGalo() === 'empate') text('Empate!', width / 2, height / 2);
        else text(`Jogador ${jogadorAtual} ganhou!`, width / 2, height / 2);
        strokeWeight(2);
        textSize(16);
        text('Pressione ENTER para reiniciar', width / 2, 50);
        return;
    }
    desenharTabuleiro();
    let resultado = verificarVitoriaGalo();
    if (resultado) {
        jogoAcabou = true;
        if (resultado !== 'empate') jogadorAtual = resultado;
    }
}

//Função para iniciar o jogo do galo
function iniciarJogoGalo() {
    tabuleiro = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    jogadorAtual = 'X';
    jogadorAcabou = false;
    jogoAcabou = false;
}

//Função para desenhar o tabuleiro
function desenharTabuleiro() {
    background(135, 206, 235);
    image(fundo.galo, 0, 0, width, height);
    stroke(0);
    strokeWeight(4);
    fill(0);
    
    //Desenhar linhas verticais
    line(width/3, 0, width/3, height);
    line(2 * width/3,0 , 2 * width/3, height);
    //Desenhar linhas horizontais
    line(0, height/3, width, height/3);
    line(0, height/3 * 2, width, height/3 * 2);

    //Desenhar X e O
    for (let i = 0; i < LINHAS; i++) {
        for (let j = 0; j < COLUNAS; j++) {
            let x = j * width/3 + (width/3) / 2;
            let y = i * height/3 + (height/3) / 2;
            if (tabuleiro[i][j] === 'X') {
                desenharX(x, y);
            } else if (tabuleiro[i][j] === 'O') {
                desenharO(x, y);
            }
        }
    }
}

//Função para desenhar X
function desenharX(x, y) {
    stroke(0);
    strokeWeight(4);
    let offset = (width / 3) / 4;
    line(x - offset, y - offset, x + offset, y + offset);
    line(x - offset, y + offset, x + offset, y - offset);
}

//Função para desenhar O
function desenharO(x, y) {
    stroke(0);
    strokeWeight(4);
    noFill();
    let size = (width / 3) / 2;
    ellipse(x, y, size, size);
}

//Funnção para verificar vitória
function verificarVitoriaGalo() {
    //Verificar linhas
    for (let i = 0; i < LINHAS; i++) {
        if (tabuleiro[i][0] !== '' && tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][1] === tabuleiro[i][2]) return tabuleiro[i][0];
    }
    //Verificar colunas
    for (let j = 0; j < COLUNAS; j++) {
        if (tabuleiro[0][j] !== '' && tabuleiro[0][j] === tabuleiro[1][j] && tabuleiro[1][j] === tabuleiro[2][j]) return tabuleiro[0][j];
    }
    //Verificar diagonais
    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) return tabuleiro[0][0];
    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) return tabuleiro[0][2];
    //Verificar empate
    let empate = true;
    for (let i = 0; i < LINHAS; i++) {
        for (let j = 0; j < COLUNAS; j++) {
            if (tabuleiro[i][j] === '') {
                empate = false;
                break;
            }
        }
        if (!empate) break;
    }
    if (empate) return 'empate';
    return null;
}

//Função para lidar com os cliques do rato
function mousePressedGalo() {
    console.log('Clique registrado no jogo do Galo');
    if (jogoAcabou) return;
    let i = floor(mouseY / TAMANHO_CELULA_Y);
    let j = floor(mouseX / TAMANHO_CELULA_X);
    if (i >= 0 && i < LINHAS && j >= 0 && j < COLUNAS && tabuleiro[i][j] === '') {
        tabuleiro[i][j] = jogadorAtual;
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    }
}

//Função para reiniciar o jogo
function reiniciarJogoGalo() {
    iniciarJogoGalo();
}

//Função KeyPressed para reiniciar o jogo
function keyPressedGalo() {
    if (keyCode === ENTER && jogoAcabou) reiniciarJogoGalo();
    if (keyCode === ESCAPE) estado = 'menu';
}