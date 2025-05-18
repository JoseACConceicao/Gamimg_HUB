// Controles do teclado
function keyPressed() {
  if (key === 'w' || key === 'W') player.jump();
  if (estado === 'menu') keyPressedMenu();
  if (estado === 'jogoGalo') keyPressedGalo();
  if (estado === 'jogoWortle') keyPressedWortle();
  if (estado === 'jogoCobra') keyPressedCobra();
  if (estado === 'jogoFlappyBird') keyPressedFlappy();
  if (estado === 'jogoMineswipper') keyPressedMinesweeper();
  if (estado === 'jogoMemoria') keyPressedMemoria();
}

//Cliques do rato
function mousePressed() {
  if (estado === "jogoMemoria") mousePressedMemoria();
  else if (estado === 'jogoGalo') mousePressedGalo();
  else if (estado === 'jogoMineswipper') mousePressedMinesweeper();
}

function preload() {

  jogador = loadImage('assets/sprites/Menu_SpriteSheet2.png');
  cartas = {
    logo: loadImage('assets/Cartas/logo.png'),
    Batman: loadImage('assets/Cartas/Batman_Vs_Superman/BatmanVsSuperman.png'),
    BayMax: loadImage('assets/Cartas/BigHero/BigHero.png'),
    GodFather: loadImage('assets/Cartas/GodFather/GodFather.png'),
    X_Men: loadImage('assets/Cartas/X-Men/X-Men.png'),
  };
  galo = loadImage('assets/Galo/logo.png');
  wortle = loadImage('assets/wortle/logo.png');
  cobraImg = {
    logo: loadImage('assets/cobra/logo_cobra.png'),
    maca: loadImage('assets/cobra/maca1.png'),
  };
  flappyImg = {
    logo: loadImage('assets/flappyBird/bird.png'),
  };
  minesweeperImg = {
    logo: loadImage('assets/mineSwipper/logo.png'),
  };
  fundo = {
    plataforma: loadImage('assets/Fundo/Plataformas/fundo.png'),
    minesweeper: loadImage('assets/Fundo/Background/background2.png'),
    wortle: loadImage('assets/Fundo/Background/background3.png'),
    memoria: loadImage('assets/Fundo/Background/background1_1.png'),
    cobra: loadImage('assets/Fundo/Background/background5.png'),
    galo: loadImage('assets/Fundo/Background/background4.png'),
    menu: loadImage('assets/Fundo/Background/background5.png'),
  }
  sons = {
    morte: loadSound('assets/Som/dead.wav'),
    comer: loadSound('assets/Som/eating.wav'),
    saltar: loadSound('assets/Som/jump.wav'),
    perder: loadSound('assets/Som/lose.wav'),
    entrarJogo: loadSound('assets/Som/entrada_jogo.wav'),
    andar: loadSound('assets/Som/walk.wav'),
    background: loadSound('assets/Som/background.mp3'),
  }
}


function setup() {
  createCanvas(900, 600);
  player = new Player();
  // Redimensionar o jogador para tamanho adequado
  player.width = 15; // Ajuste conforme necessário
  player.height = 25;

  //Adicionar Plataformas para o menu
  plataformas.push(new Plataforma(350, 275, 100, 25)); //Plataforma de Spawn
  plataformas.push(new Plataforma(0, 100, 150, 25));   //Plataforma para o Jogo do Galo
  plataformas.push(new Plataforma(175, 150, 50, 25));  //Caminho para o Jogo do Galo
  plataformas.push(new Plataforma(275, 215, 50, 25));  //Caminho para o Jogo do Galo
  plataformas.push(new Plataforma(650, 100, 150, 25)); //Plataforma para o Jogo da FlappyBird
  plataformas.push(new Plataforma(750 - 175, 150, 50, 25)); //Caminho para o Jogo da FappyBird
  plataformas.push(new Plataforma(750 - 275, 215, 50, 25)); //Caminho para o Jogo da FlappyBird
  plataformas.push(new Plataforma(325, 115, 150, 25)); //Plataforma Jogo do Wordle
  plataformas.push(new Plataforma(50, 400, 150, 25));  //Plataforma Jogo da Memória
  plataformas.push(new Plataforma(260, 335, 50, 25));  //Caminho para o Jogo da Memória
  plataformas.push(new Plataforma(350, 550, 150, 25)); //Plataforma Jogo da Cobra
  plataformas.push(new Plataforma(260, 475, 50, 25));  //Caminho para o Jogo da Cobra
  plataformas.push(new Plataforma(350, 550, 150, 25)); //Plataforma Jogo da Cobra
  plataformas.push(new Plataforma(650, 400, 150, 25)); //Plataforma Jogo do Mineswipeer
  plataformas.push(new Plataforma(550, 475, 50, 25)); //Caminho para o Jogo do Mineswipper
  plataformas.push(new Plataforma(500, 350, 50, 25)); //Caminho para o Jogo do Mineswipper


  // Definir as plataformas que vão albergar os minijogos (largura >= 150)
  for (plataforma of plataformas) {
    plataforma.isMiniGame = plataforma.width >= 150;
  }
  
  //Música de fundo
  sons.background.loop(0, 1, 0.02);
}

function draw() {
  switch (estado) {
    case "menu":
      count = 0;
      menu();
      break;
    case "jogoGalo":
      while (count < 1) {
        reiniciarJogoGalo();
        count++;
      }
      jogoGalo();
      break;
    case "jogoFlappyBird":
      while (count < 1) {
        iniciarJogoFlappy();
        count++;
      }
      jogoFlappy();
      break;
    case "jogoWortle":
      while (count < 1) {
        iniciarJogoWortle();
        count++;
      }
      jogoWortle();
      break;
    case "jogoMemoria":
      while (count < 1) {
        reiniciarJogoMemoria();
        count++;
      }
      jogoMemoria();
      break;
    case "jogoCobra":
      while (count < 1) {
        iniciarJogoCobra();
        count++;
      }
      jogoCobra();
      break;
    case "jogoMineswipper":
      jogoMineswipper();
      break;
  }
}
