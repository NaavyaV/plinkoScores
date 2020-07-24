var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle, status = 'Calculating Skill...';
var turn = 0;
var plinkos = [];
var divisions = [];
var gameState = 'play';

var divisionHeight=300;
var score = 0;

function setup() {

  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
    
}
 


function draw() {

  background("black");

  textSize(20);
  text("Score: "+score,20,30);

  text('100', 102, 600)
  text('100', 22, 600)

  text('200', 182, 600)
  text('200', 262, 600)

  text('500', 342, 600)
  text('500', 422, 600)

  text('200', 502, 600)
  text('200', 582, 600)

  text('100', 662, 600)
  text('100', 742, 600)

  text('What the computer says: ' + status, 150, 30)

  Engine.update(engine);

  
  console.log(gameState)

   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   if(particle != null){
    particle.display()

    if(particle.body.position.y > 760){

      if(particle.body.position.x < 150){
        score += 100
        particle = null;
      } else if(particle.body.position.x < 300 && particle.body.position.x > 150){
        score += 200
        particle = null;
      } else if(particle.body.position.x < 450 && particle.body.position.x > 300){
        score += 500
        particle = null;
      } else if(particle.body.position.x < 600 && particle.body.position.x > 450){
        score += 200
        particle = null;
      } else if(particle.body.position.x < 750 && particle.body.position.x > 600){
        score += 100
        particle = null;
      }

      if(turn >= 5){
        gameState = 'end';
        GameEnd()
      }
    }
  }
}

function mousePressed(){
  if(gameState !== 'end'){
    turn ++;
    particle = new Particle(mouseX, 10, 10, 10)
  }
}

function GameEnd(){
  if(score >= 2000){
    status = 'Game over, Awesome skills!!'
  } else if(score >= 1000){
    status = 'Game over, keep up the good skills!'
  } else if(score > 0){
    status = 'Game over, you did not score much, try again!'
  }
}