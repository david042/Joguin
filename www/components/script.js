window.onload = function(){
  inicioJogo();

  document.querySelector("#subir").addEventListener("click", function(){
    subir();
    setTimeout(parar, 1000);
  });
  document.querySelector("#descer").addEventListener("click", function(){
    descer();
    setTimeout(parar, 1000);
  });
  document.querySelector("#direita").addEventListener("click", function(){
    direita();
    setTimeout(parar, 1000);
  });
  document.querySelector("#esquerda").addEventListener("click", function(){
    esquerda();
    setTimeout(parar, 1000);
  });
}

var personagemObj;

var obstaculo = [];

function inicioJogo(){
  areaJogo.start();
  personagemObj = new componente("#FFF", 10, 120, 30, 30);
}

let areaJogo = {
  canvas: document.createElement("canvas"),

  start: function(){
    this.canvas.height = 300,
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frame = 0;
    this.intervalo = setInterval(atualizaAreaJogo, 20);
  },
  
  limpar: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  parar: function(){
    clearInterval(this.interval);
  }
}

function contarIntervalo(n){
  if((areaJogo.frame / n) % 1 == 0){
    return true;
  }else{
    return false;
  }
}

function componente(cor, x, y, altura, largura){
  this.altura = altura,
  this.largura = largura,
  this.x = x,
  this.y = y,
  this.velocidadeX = 0,
  this.velocidadeY = 0,

  this.atualiza = function(){
    contexto = areaJogo.context;
    contexto.fillStyle = cor;
    contexto.fillRect(this.x, this.y, this.altura, this.largura);
  },

  this.novaPosicao = function(){
    this.x += this.velocidadeX;
    this.y += this.velocidadeY;
  },

  this.bater = function(obj){
    //posição do personagem
    let esquerda = this.x;
    let direita = this.x + this.altura;
    let superior = this.y;
    let inferior = this.y + this.largura;
    //posição do obstáculo
    let objEsquerda = obj.x;
    let objDireita = obj.x + obj.altura;
    let objSuperior = obj.y;
    let objInferior = obj.y + obj.largura;

    let batida = true;

    if(
      (inferior < objSuperior) || (superior > objInferior) || 
      (direita < objEsquerda) || (esquerda > objDireita)
    ){
      batida = false;
    }
    return batida;
  }
}

function atualizaAreaJogo(){
  let x, y;

  for(i = 0; i < obstaculo.length; i++){
    if(personagemObj.bater(obstaculo[i])){
      areaJogo.parar();

      return;
    }
  }

  areaJogo.limpar();
  areaJogo.frame += 1;

  if(areaJogo.frame == 1 || contarIntervalo(150)){
    x = areaJogo.canvas.width;
    minAltura = 20;
    maxAltura = 200;
    altura = Math.floor(Math.random() * (maxAltura - minAltura + 1) + minAltura);
    minVazio = 50;
    maxVazio = 200;
    vazio = Math.floor(Math.random() * (maxVazio - minVazio + 1) + minVazio);
    obstaculo.push(new componente("green", x, 0, 10, altura));
    obstaculo.push(new componente("green", x, altura + vazio, 10, x - altura - vazio));
  }

  for(i = 0; i < obstaculo.length; i++){
    obstaculo[i].x += -1;
    obstaculo[i].atualiza();
  }

  personagemObj.novaPosicao();
  personagemObj.atualiza();
}

function subir(){
  personagemObj.velocidadeY -= 1;
}

function descer(){
  personagemObj.velocidadeY += 1;
}

function direita(){
  personagemObj.velocidadeX += 1;
}

function esquerda(){
  personagemObj.velocidadeX -= 1;
}

function parar(){
  personagemObj.velocidadeX = 0;
  personagemObj.velocidadeY = 0;
}