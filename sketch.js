var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets = 70;
var life = 3;

var gameState = "fight"


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionar a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//criar o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //criar sprites para representar as vidas restantes
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //criar o grupo para os zumbis e as balas
    bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(0); 


if(gameState === "fight"){

  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  //vá para gameState "lost" (perdeu) quando restar 0 vidas 
  if(life===0){
    heart1.visible = false
    heart3.visible = false
    heart2.visible = false
    gameState = "lost"
    
  }


  //mover o jogador para cima e para baixo e tornar o jogo compatível com dispositivos móveis usando touches (toques)
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//disparar as balas e mudar a imagem do atirador para a posição de tiro quando a tecla espaço for pressionada
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
}

//o jogador volta à imagem original quando paramos de pressionar a tecla espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//vá para gameState (estado do jogo) "bala" quando o jogador ficar sem balas
if(bullets==0){
  gameState = "bullet"
    
}

//destruir o zumbi quando a bala tocar nele
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      //escreva uma condição para quando o zombiegroup (grupo de zumbi) tocar bulletGroup (grupo de bala)
   if(zombieGroup[i].isTouching(bulletGroup)){
//destruir o zumbi
        zombieGroup.destroyEach();
        bulletGroup.destroyEach();
       
        } 
  
  }
}

//destruir o zumbi quando o jogador tocar nele
if(zombieGroup.isTouching(player)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
//Diminua a vida
      life = life-1;
       } 
 
 }
}

//chamar a função para gerar os zumbis
enemy();
}

drawSprites();

//destrua o zumbi e o jogador e exiba uma mensagem no gameState "lost" (perdeu)
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  //use texto para mostrar que você perdeu
  text("Game Over", 700, 300);
  //destrua o grupo de zumbis
  zombieGroup.destroyEach();
  //destrua o jogador
  player.destroy();
 

}

//destrua o zumbi e o jogador e exiba uma mensagem no gameState "won" (ganhou)
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("Você Ganhou ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destruir o zumbi, jogador e balas e exibir uma mensagem no gameState "bala"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("Você ficou sem balas!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


//criar função para gerar os zumbis
function enemy(){
  if(frameCount%50===0){

    //atribuir posições x e y aleatórias para o zumbi aparecer
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
