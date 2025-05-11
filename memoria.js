//Função primcipal do jogo da memória
function jogoMemoria() {
    background(135, 206, 235);
    image(fundo.memoria, 0, 0, width, height);
    let titulo = nivelAtual === 1 ? "Nível 1" : "Nível 2";
    textSize(32);
    textAlign(CENTER);
    fill(255);
    text(titulo, width / 2, 50); // Desenha o título do nível
    if (cartasDoNivel.length === 0) iniciarNivel(); // Inicia o nível se ainda não foi iniciado
    desenharCartas(); // Desenha as cartas
}

function gerarCartas(nivel) {
    let numPares = nivel === 1 ? 3 : 4;
    let imagensDisponiveis = [cartas.Batman, cartas.BayMax, cartas.GodFather, cartas.X_Men].slice(0, numPares); //Slecionar as imagens conforme o nível
    let deck = [];
    imagensDisponiveis.forEach(imagem => {
        deck.push(new Carta(imagem));
        deck.push(new Carta(imagem)); // Adiciona o par
    })
    //Embaralhar o deck
    deck.sort(() => Math.random() - 0.5);
    return deck;
}

//Função para iniciar um nível
function iniciarNivel() {
    cartasDoNivel = gerarCartas(nivelAtual);
    cartasViradas = [];
    podeVirar = true;
}

//Função para virar uma carta
function virarCarta(carta) {
    if (!podeVirar || carta.virada || carta.pareada) return;
    carta.virada = true;
    cartasViradas.push(carta);
    if (cartasViradas.length === 2) {
        podeVirar = false;
        setTimeout(verificarPar, 1000); // Espera 1 segundo antes de verificar o par
    }
}

//Função para verificar se as cartas viradas formam um par
function verificarPar() {
    let [carta1, carta2] = cartasViradas;
    if (carta1.imagem === carta2.imagem) {
        carta1.pareada = true;
        carta2.pareada = true;
        verificarVitoriaMemoria();
    } else {
        carta1.virada = false;
        carta2.virada = false;
    }
    cartasViradas = [];
    podeVirar = true;
}

//Função para verificar se o jogador venceu
function verificarVitoriaMemoria() {
    if (cartasDoNivel.every(carta => carta.pareada)) {
        if (nivelAtual === 1) {
            setTimeout(nivelAtual = 2, 2000); //Passa para o próximo nível após 2 segundos
            iniciarNivel();
        } else {
            setTimeout(() => estado = "menu", 2000); //Volta para o menu após 2 segundos
        }
    }
}

//Função para desenhar as cartas
function desenharCartas() {
    let larguraCarta = 100;
    let alturaCarta = 150;
    let espaco = 20;
    let colunas = nivelAtual === 1 ? 3 : 4;
    let linhas = 2;
    let inicioX = (width - (colunas * larguraCarta + (colunas - 1) * espaco)) / 2;
    let inicioY = (height - (linhas * alturaCarta + (linhas - 1) * espaco)) / 2;

    cartasDoNivel.forEach((carta, index) => {
        let col = index % colunas;
        let lin = Math.floor(index / colunas);
        let x = inicioX + col * (larguraCarta + espaco);
        let y = inicioY + lin * (alturaCarta + espaco);
        if (carta.virada || carta.pareada) {
            image(carta.imagem, x, y, larguraCarta, alturaCarta);
        } else {
            fill(240);
            rect(x, y, larguraCarta, alturaCarta);
        }
    });
}

//Função para detetar os cliques nas cartas
function mousePressedMemoria() {
    let larguraCarta = 100;
    let alturaCarta = 150;
    let espaco = 20;
    let colunas = nivelAtual === 1 ? 3 : 4;
    let linhas = 2;
    let inicioX = (width - (colunas * larguraCarta + (colunas - 1) * espaco)) / 2;
    let inicioY = (height - (linhas * alturaCarta + (linhas - 1) * espaco)) / 2;

    for (let index = 0; index < cartasDoNivel.length; index++) {
        let col = index % colunas;
        let lin = Math.floor(index / colunas);
        let x = inicioX + col * (larguraCarta + espaco);
        let y = inicioY + lin * (alturaCarta + espaco);
        if (mouseX >= x && mouseX <= x + larguraCarta && mouseY >= y && mouseY <= y + alturaCarta) {
            virarCarta(cartasDoNivel[index]);
            break;
        }
    }
    
}

function reiniciarJogoMemoria() {
    nivelAtual = 1;
    cartasDoNivel = [];
    cartasViradas = [];
    podeVirar = true;
}

function keyPressedMemoria() {
    if (keyCode === ESCAPE) {
        estado = 'menu';
        reiniciarJogoMemoria();
        return;
    }
}