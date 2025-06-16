let jogador = { x: 50, y: 350, tamanho: 30, noCarro: false };
let carro = { x: 500, y: 350, coletandoVerduras: false };
let cidade = { x: 50, y: 50, tamanho: 100 };
let verduras = [
  { x: 150, y: 320, coletada: false },
  { x: 300, y: 330, coletada: false },
  { x: 400, y: 310, coletada: false }
];
let verdurasColetadas = 0;
let venceu = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);

  // Desenho da cidade
  fill(0, 0, 255);
  rect(cidade.x, cidade.y, cidade.tamanho, cidade.tamanho);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Cidade", cidade.x + cidade.tamanho / 2, cidade.y + cidade.tamanho / 2);

  // Desenho do carro
  fill(255, 0, 0);
  rect(carro.x, carro.y, 60, 40);

  // Desenho das verduras
  fill(0, 150, 0);
  verduras.forEach(verdura => {
    if (!verdura.coletada) ellipse(verdura.x, verdura.y, 20);
  });

  // Desenho do jogador (ou dentro do carro)
  fill(0);
  if (jogador.noCarro) {
    ellipse(carro.x + 30, carro.y + 20, jogador.tamanho); // Dentro do carro
  } else {
    ellipse(jogador.x, jogador.y, jogador.tamanho); // Fora do carro
  }

  // Lógica de movimento
  if (!venceu) {
    if (!jogador.noCarro) {
      moverJogador();
      coletarVerduras();
      entrarNoCarro();
    } else {
      moverCarro();
      verificarVitoria();
    }
  }

  // Mensagem de vitória
  if (venceu) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Você entregou as verduras!", width / 2, height / 2);
  }
}

function moverJogador() {
  if (keyIsDown(LEFT_ARROW)) jogador.x -= 3;
  if (keyIsDown(RIGHT_ARROW)) jogador.x += 3;
  if (keyIsDown(UP_ARROW)) jogador.y -= 3;
  if (keyIsDown(DOWN_ARROW)) jogador.y += 3;
  
  // Limitar os movimentos dentro da tela
  jogador.x = constrain(jogador.x, 0, width);
  jogador.y = constrain(jogador.y, 0, height);
}

function coletarVerduras() {
  verduras.forEach(verdura => {
    let distancia = dist(jogador.x, jogador.y, verdura.x, verdura.y);
    if (distancia < 25 && !verdura.coletada) {
      verdura.coletada = true;
      verdurasColetadas++;
    }
  });
}

function entrarNoCarro() {
  let distanciaCarro = dist(jogador.x, jogador.y, carro.x + 30, carro.y + 20);
  if (verdurasColetadas === verduras.length && distanciaCarro < 40) {
    jogador.noCarro = true;
    jogador.x = carro.x + 30; // Ajusta a posição do jogador dentro do carro
    jogador.y = carro.y + 20;
  }
}

function moverCarro() {
  if (keyIsDown(LEFT_ARROW)) carro.x -= 3;
  if (keyIsDown(RIGHT_ARROW)) carro.x += 3;
  if (keyIsDown(UP_ARROW)) carro.y -= 3;
  if (keyIsDown(DOWN_ARROW)) carro.y += 3;

  // Limitar os movimentos do carro
  carro.x = constrain(carro.x, 0, width - 60);
  carro.y = constrain(carro.y, 0, height - 40);
}

function verificarVitoria() {
  let dentroDaCidade = carro.x + 60 > cidade.x && carro.x < cidade.x + cidade.tamanho &&
                       carro.y + 40 > cidade.y && carro.y < cidade.y + cidade.tamanho;
  if (dentroDaCidade) {
    venceu = true;
  }
}


