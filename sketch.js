//Create variables here

var dog,dogImg,happyDog,database,foodS,foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  strokeWeight(3);

  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  
}


function draw() {  

  background("green");


  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  fill("white");
  text("Food:"+foodS,400,50);

  text("Prees up arrow to feed the cute Doggo",150,50);

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x--;
  }

  database.ref('/').update({
    Food:x
  });
}