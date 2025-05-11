//Wortle.js
// Função para iniciar o jogo
function iniciarJogoWortle() {
    // Filtrar palavras sem acentos
    let palavrasSemAcentos = palavras.filter(palavra => {
        return /^[a-z]+$/.test(palavra); // Apenas letras minúsculas sem acentos
    });
    
    palavraSecreta = palavrasSemAcentos[Math.floor(Math.random() * palavrasSemAcentos.length)];
    console.log(palavraSecreta);
    tentativaAtual = [];
    tentativas = [];
    linhaAtual = 0;
    jogoAcabouWortle = false;
    mensagemErro = '';
    teclasUsadas = {};
}

// Função principal para o jogo do Wortle
function jogoWortle() {
    resizeCanvas(900, 800);
    background(240);
    image(fundo.wortle, 0, 0, width, height);
    
    
    // Desenhar grade
    desenharGrade();
    
    // Desenhar teclado virtual
    desenharTeclado();
    
    // Mensagem de erro
    if (mensagemErro) {
        fill(255, 0, 0);
        textSize(16);
        textAlign(CENTER);
        text(mensagemErro, width / 2, height - 30);
    }
    
    if (jogoAcabouWortle) {
        fill(0, 0, 0, 200);
        rect(0, 0, width, height);
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        if (tentativas[linhaAtual - 1] && tentativas[linhaAtual - 1].join('') === palavraSecreta) {
            text('Parabéns! Venceu o jogo!', width / 2, height/2 - 30);
        } else {
            text(`Fim de Jogo! A palavra era: ${palavraSecreta}`, width / 2, height/2 - 30);
        }
        textSize(16);
        text('Pressione ENTER para reiniciar ou ESC para voltar ao Menu', width / 2, height/2 + 20);
    }
}

// Função para desenhar a grade do Wortle
function desenharGrade() {
    let inicioX = (width - (TAMANHO_CELULA_WORTLE * TAMANHO_PALAVRA + ESPACO_CELULA * (TAMANHO_PALAVRA - 1))) / 2;
    let inicioY = 100; // Começa abaixo do cabeçalho

    for (let i = 0; i < MAX_TENTATIVAS; i++) {
        for (let j = 0; j < TAMANHO_PALAVRA; j++) {
            let x = inicioX + j * (TAMANHO_CELULA_WORTLE + ESPACO_CELULA);
            let y = inicioY + i * (TAMANHO_CELULA_WORTLE + ESPACO_CELULA);

            // Determinar a cor de fundo
            if (i < linhaAtual && tentativas[i]) {
                let letra = tentativas[i][j];
                if (letra === palavraSecreta[j]) {
                    fill(106, 170, 100); // Verde mais suave
                } else if (palavraSecreta.includes(letra)) {
                    fill(201, 180, 88); // Amarelo mais suave
                } else {
                    fill(120, 124, 126); // Cinza mais suave
                }
            } else {
                fill(255);
            }
            
            // Adicionar sombra
            drawingContext.shadowColor = 'rgba(0,0,0,0.2)';
            drawingContext.shadowBlur = 4;
            drawingContext.shadowOffsetX = 2;
            drawingContext.shadowOffsetY = 2;
            
            stroke(200);
            strokeWeight(2);
            rect(x, y, TAMANHO_CELULA_WORTLE, TAMANHO_CELULA_WORTLE, 5);
            
            // Resetar sombra
            drawingContext.shadowColor = 'transparent';
            
            // Desenhar a letra
            if ((i === linhaAtual && j < tentativaAtual.length) || (i < linhaAtual && tentativas[i])) {
                fill(0);
                textAlign(CENTER, CENTER);
                textSize(32);
                let letra = i === linhaAtual ? tentativaAtual[j] : tentativas[i][j];
                text(letra.toUpperCase(), x + TAMANHO_CELULA_WORTLE / 2, y + TAMANHO_CELULA_WORTLE / 2);
            }
        }
    }
}

// Função para desenhar o teclado virtual
function desenharTeclado() {
    let teclas = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ];
    
    let tamanhoTecla = 40;
    let espacoTecla = 5;
    let inicioY = height - 200;
    
    for (let i = 0; i < teclas.length; i++) {
        let linha = teclas[i];
        let inicioX = (width - (linha.length * (tamanhoTecla + espacoTecla) - espacoTecla)) / 2;
        
        for (let j = 0; j < linha.length; j++) {
            let tecla = linha[j];
            let x = inicioX + j * (tamanhoTecla + espacoTecla);
            let y = inicioY + i * (tamanhoTecla + espacoTecla);
            
            // Determinar cor da tecla
            let corTecla = 255;
            if (teclasUsadas[tecla] === 1) {
                corTecla = color(201, 180, 88); // Amarelo
            } else if (teclasUsadas[tecla] === 2) {
                corTecla = color(106, 170, 100); // Verde
            } else if (teclasUsadas[tecla] === 3) {
                corTecla = color(120, 124, 126); // Cinza
            }
            
            fill(corTecla);
            stroke(200);
            strokeWeight(1);
            rect(x, y, tamanhoTecla, tamanhoTecla, 5);
            
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(16);
            text(tecla.toUpperCase(), x + tamanhoTecla/2, y + tamanhoTecla/2);
        }
    }
}

// Função para lidar com teclas pressionadas
function keyPressedWortle() {
    if (keyCode === ESCAPE) {
        estado = 'menu';
        reiniciarJogoWortle();
    }
    if (jogoAcabouWortle) {
        if (keyCode === ENTER) {
            reiniciarJogoWortle();
        }
        return;
    }
    
    if (keyCode === BACKSPACE) {
        if (tentativaAtual.length > 0) {
            tentativaAtual.pop();
            mensagemErro = '';
        }
    } else if (keyCode === ENTER) {
        if (tentativaAtual.length === TAMANHO_PALAVRA) {
            let palavra = tentativaAtual.join('');
            // Verificar se a palavra contém apenas letras sem acentos
            if (/^[a-z]+$/.test(palavra) && palavras.includes(palavra)) {
                tentativas.push([...tentativaAtual]);
                
                // Atualizar estado das teclas
                for (let i = 0; i < tentativaAtual.length; i++) {
                    let letra = tentativaAtual[i];
                    if (letra === palavraSecreta[i]) {
                        teclasUsadas[letra] = 2; // Verde
                    } else if (palavraSecreta.includes(letra)) {
                        if (teclasUsadas[letra] !== 2) {
                            teclasUsadas[letra] = 1; // Amarelo
                        }
                    } else {
                        teclasUsadas[letra] = 3; // Cinza
                    }
                }
                
                linhaAtual++;
                tentativaAtual = [];
                mensagemErro = '';
                
                if (palavra === palavraSecreta || linhaAtual === MAX_TENTATIVAS) {
                    jogoAcabouWortle = true;
                }
            } else {
                mensagemErro = 'Palavra inválida! Use apenas letras sem acentos.';
            }
        }
    } else if (key >= 'a' && key <= 'z' && tentativaAtual.length < TAMANHO_PALAVRA) {
        tentativaAtual.push(key.toLowerCase());
        mensagemErro = '';
    }
}

// Função para reiniciar o jogo
function reiniciarJogoWortle() {
    iniciarJogoWortle();
    teclasUsadas = {};
}