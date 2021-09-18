window.onload = function(){
  inicioJogo();

  document.querySelector("#subir").addEventListener("click", function(){
    subir();
  });
  document.querySelector("#descer").addEventListener("click", function(){
    descer();
  });
  document.querySelector("#direita").addEventListener("click", function(){
    direita();
  });
  document.querySelector("#esquerda").addEventListener("click", function(){
    esquerda();
  });
}

var personagemObj;

var obstaculo;

function inicioJogo(){
  areaJogo.start();
  personagemObj = new componente("#FFF", 10, 120, 30, 30);
  obstaculo = new componente("green", 150, 80, 10, 120);
}

let areaJogo = {
  canvas: document.createElement("canvas"),

  start: function(){
    this.canvas.height = 300,
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.intervalo = setInterval(atualizaAreaJogo, 20);
  },
  
  limpar: function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  parar: function(){
    clearInterval(this.interval);
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
  if(personagemObj.bater(obstaculo)){
    areaJogo.parar();
  }else{
    areaJogo.limpar();
    obstaculo.atualiza();
    personagemObj.novaPosicao();
    personagemObj.atualiza();
  }
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