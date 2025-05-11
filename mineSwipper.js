function setupMinesweeper() {
    grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
        for (let j = 0; j < rows; j++) {
            grid[i][j] = {
                mine: false,
                revealed: false,
                flagged: false,
                adjacentMines: 0
            };
        }
    }
    gameOverMinesweeper = false;
    firstClickMinesweeper = true;
    flagsPlacedMinesweeper = 0;
    cellsRevealedMinesweeper = 0;
}

function placeMines(firstX, firstY) {
    let minesPlaced = 0;
    while (minesPlaced < mines) {
        let x = floor(random(cols));
        let y = floor(random(rows));
        
        // Não colocar mina na primeira célula clicada ou ao redor dela
        if (!grid[x][y].mine && 
            (abs(x - firstX) > 1 || abs(y - firstY) > 1)) {
            grid[x][y].mine = true;
            minesPlaced++;
        }
    }
    calculateAdjacentMines();
}

function calculateAdjacentMines() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (!grid[i][j].mine) {
                let count = 0;
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        let newX = i + x;
                        let newY = j + y;
                        if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
                            if (grid[newX][newY].mine) count++;
                        }
                    }
                }
                grid[i][j].adjacentMines = count;
            }
        }
    }
}

function revealCell(x, y) {
    if (x < 0 || x >= cols || y < 0 || y >= rows || grid[x][y].revealed || grid[x][y].flagged) {
        return;
    }

    grid[x][y].revealed = true;
    cellsRevealedMinesweeper++;

    if (grid[x][y].mine) {
        gameOverMinesweeper = true;
        revealAllMines();
        return;
    }

    if (grid[x][y].adjacentMines === 0) {
        // Reveal adjacent cells if no adjacent mines
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                revealCell(x + i, y + j);
            }
        }
    }

    checkWin();
}

function revealAllMines() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j].mine) {
                grid[i][j].revealed = true;
            }
        }
    }
}

function toggleFlag(x, y) {
    if (!grid[x][y].revealed) {
        if (grid[x][y].flagged) {
            grid[x][y].flagged = false;
            flagsPlacedMinesweeper--;
        } else {
            grid[x][y].flagged = true;
            flagsPlacedMinesweeper++;
        }
    }
}

function checkWin() {
    if (cellsRevealedMinesweeper === (cols * rows - mines)) {
        gameOverMinesweeper = true;
        // You win!
    }
}

function drawMinesweeper() {
    background(220);
    image(fundo.minesweeper, 0, 0, width, height);
    
    // // Desenhar cabeçalho
    // fill(50);
    // noStroke();
    // rect(0, 0, width, 80);
    // fill(255);
    // textSize(32);
    // textAlign(CENTER, CENTER);
    // text('MINESWEEPER', width/2, 40);
    
    // Desenhar contadores
    stroke(0);
    strokeWeight(2);
    fill(255);
    rect(18, 27, 95, 30, 10, 10, 10, 10);
    rect(width - 170, 27, 153, 30, 10, 10, 10, 10);
    noStroke();
    textSize(20);
    textAlign(LEFT, CENTER);
    fill(0);
    text(`Minas: ${mines - flagsPlacedMinesweeper}`, 20, 44);
    textAlign(RIGHT, CENTER);
    text(`Reveladas: ${cellsRevealedMinesweeper}/${cols * rows - mines}`, width - 20, 44);

    // Calcular posição inicial da grade para centralizar
    let gridWidth = cols * (cellSize + ESPACO_CELULA_MINESWEEPER) - ESPACO_CELULA_MINESWEEPER;
    let startX = (width - gridWidth) / 2;
    let startY = 120; // Começa abaixo do cabeçalho e contadores

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = startX + i * (cellSize + ESPACO_CELULA_MINESWEEPER);
            let y = startY + j * (cellSize + ESPACO_CELULA_MINESWEEPER);

            // Adicionar sombra
            drawingContext.shadowColor = 'rgba(0,0,0,0.2)';
            drawingContext.shadowBlur = 4;
            drawingContext.shadowOffsetX = 2;
            drawingContext.shadowOffsetY = 2;

            //Início da transformação
            push();
            translate(0, -10);

            // Desenhar célula com cantos arredondados
            fill(grid[i][j].revealed ? colors.revealed : colors.hidden);
            stroke(200);
            strokeWeight(2);
            rect(x, y, cellSize, cellSize, 5);

            //Fim da transformação
            pop();
            // Resetar sombra
            drawingContext.shadowColor = 'transparent';

            // Resetar transformações e alinhamento para os números e bandeiras
            push();
            translate(0, -10);

            if (grid[i][j].revealed) {
                if (grid[i][j].mine) {
                    fill(colors.mine);
                    ellipse(x + cellSize/2, y + cellSize/2, cellSize * 0.6);
                } else if (grid[i][j].adjacentMines > 0) {
                    fill(colors.numbers[grid[i][j].adjacentMines - 1]);
                    textSize(cellSize * 0.7);
                    textAlign(CENTER, CENTER);
                    text(grid[i][j].adjacentMines, x + cellSize/2, y + cellSize/2);
                }
            } else if (grid[i][j].flagged) {
                textSize(cellSize * 0.7);
                textAlign(CENTER, CENTER);
                text('🚩', x + cellSize/2, y + cellSize/2);
            }

            pop();
        }
    }

    // Desenhar mensagem de fim de jogo
    if (gameOverMinesweeper) {
        fill(0, 0, 0, 200);
        rect(0, 0, width, height);
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(cellsRevealedMinesweeper === (cols * rows - mines) ? 'You Win!' : 'Game Over!', width/2, height/2);
        textSize(24);
        text('Press R to restart', width/2, height/2 + 40);
    }
}

function mousePressedMinesweeper() {
    if (gameOverMinesweeper) return;


    let gridWidth = cols * (cellSize + ESPACO_CELULA_MINESWEEPER) - ESPACO_CELULA_MINESWEEPER;
    let gridHeight = rows * (cellSize + ESPACO_CELULA_MINESWEEPER) - ESPACO_CELULA_MINESWEEPER;
    let startX = (width - gridWidth) / 2;
    let startY = 120;

    // Verificar se o clique está dentro da grade
    if (mouseX < startX || mouseX > startX + gridWidth ||
        mouseY < startY || mouseY > startY + gridHeight) {
        return;
    }

    // Calcular a célula clicada
    let x = floor((mouseX - startX) / (cellSize + ESPACO_CELULA_MINESWEEPER));
    let y = floor((mouseY - startY) / (cellSize + ESPACO_CELULA_MINESWEEPER));

    if (x >= 0 && x < cols && y >= 0 && y < rows) {
        if (mouseButton === LEFT) {
            if (firstClickMinesweeper) {
                placeMines(x, y);
                firstClickMinesweeper = false;
            }
            revealCell(x, y);
        }
    }
}

function keyPressedMinesweeper() {
    if (key === 'r' || key === 'R') {
        setupMinesweeper();
    } else if (key === 'f' || key === 'F') {
        let gridWidth = cols * (cellSize + ESPACO_CELULA_MINESWEEPER) - ESPACO_CELULA_MINESWEEPER;
        let gridHeight = rows * (cellSize + ESPACO_CELULA_MINESWEEPER) - ESPACO_CELULA_MINESWEEPER;
        let startX = (width - gridWidth) / 2;
        let startY = 120;

        // Verificar se o mouse está dentro da grade
        if (mouseX < startX || mouseX > startX + gridWidth ||
            mouseY < startY || mouseY > startY + gridHeight) {
            return;
        }

        // Calcular a célula sob o mouse
        let x = floor((mouseX - startX) / (cellSize + ESPACO_CELULA_MINESWEEPER));
        let y = floor((mouseY - startY) / (cellSize + ESPACO_CELULA_MINESWEEPER));
        
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
            toggleFlag(x, y);
        }
    } else  if (keyCode === ESCAPE) {
        estado = 'menu';
        reiniciarJogoCobra();
        pausedCobra = false;
        return;
    }
}

function jogoMineswipper() {
    if (firstClickMinesweeper) {
        setupMinesweeper();
    }
    drawMinesweeper();
}
