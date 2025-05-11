//Variáveis globais gerias

let player;
let plataformas = [];
const gravity = 0.5;
const jumpForce = -10;
const spawnX = 400;
const spawnY = 150;
const respawnTime = 1000; //1 segundo
let deathTime = 0;
let cartas;
let estado = "menu"; // Estado inicial do jogo
let estadoAnterior = null;
let count;


//Variáveis globais do jogo da memória
let nivelAtual = 1;
let cartasDoNivel = [];
let cartasViradas = [];
let podeVirar = true;

//Variáveis globais do jogo do Galo
let tabuleiro;
let jogadorAtual;
let jogadorAcabou;
let jogoAcabou = false;
const TAMANHO_CELULA_X = 300;
const TAMANHO_CELULA_Y = 200;
const LINHAS = 3;
const COLUNAS = 3;

//Variáveis Globais do Jogo do wortle
let palavraSecreta;
let tentativaAtual = [];
let tentativas = [];
let linhaAtual = 0;
let jogoAcabouWortle = false;
let mensagemErro = '';
let teclasUsadas = {};
const MAX_TENTATIVAS = 6;
const TAMANHO_PALAVRA = 5;
const TAMANHO_CELULA_WORTLE = 60;
const ESPACO_CELULA = 10;

// Variáveis globais do jogo da cobra
let cobra = [];
let comida;
let direcao = 'RIGHT';
let proximaDirecao = 'RIGHT';
let pontuacao = 0;
let jogoAcabouCobra = false;
const TAMANHO_CELULA_COBRA = 20;
const VELOCIDADE_INICIAL = 5;
let velocidade = VELOCIDADE_INICIAL;
let ultimoUpdate = 0;
let pausedCobra = false;

// Flappy Bird game variables
let bird;
let pipes = [];
let score = 0;
let gameOver = false;
let paused = false;
let gravityBird = 0.6;
let jumpForceBird = -8;
let pipeSpeedBird = 2;
let pipeGapBird = 150;
let pipeFrequencyBird = 100; // frames entre tubos

// Variáveis do jogo Minesweeper
let grid;
let cols = 10;
let rows = 10;
let cellSize = 40;
let mines = 20;
let gameOverMinesweeper = false;
let firstClickMinesweeper = true;
let flagsPlacedMinesweeper = 0;
let cellsRevealedMinesweeper = 0;
const ESPACO_CELULA_MINESWEEPER = 5; // Espaço entre células
// Cores
const colors = {
    hidden: '#bdbdbd',
    revealed: '#e0e0e0',
    mine: '#ff0000',
    flag: '#ffd700',
    text: '#000000',
    numbers: ['#0000ff', '#008000', '#ff0000', '#000080', '#800000', '#008080', '#000000', '#808080']
};