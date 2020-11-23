//Create variables here
var dog, happyDog,dogimg,happydogimg;
var  database;
var foodS, foodStock, lastFed, fedTime;
var foodObj, feed, addFood, food1, foodCount, input, milk, milkImg;
 
 

function preload(){
  //load images here
  dogimg= loadImage("images/dogImg.png");
  happydogimg = loadImage("images/dogImg1.png");
  milkImg = loadImage('images/Milk.png');
}

function setup() {
	createCanvas(500,500);
   
  dog = createSprite(250,300,30,40);
  dog.addImage(dogimg);
  dog.scale = 0.2;

  milk = createSprite(565, 300);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  milk.visible = false;
  milk.rotation = 55;

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  food1 = new Food();
  
  food1.start();

  addFood = createButton("Add food");
  addFood.position(400, 80);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed your Dog");
  feed.position(700,80);
  feed.mousePressed(feedDog);

}
 



function draw() {  
background(46,139,87)




  drawSprites();
  //add styles here
  fill("red");
  textSize(20);
text("Food Left :"+ foodS,200,100);


}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
if(x<= 0){
  x =0;
}else{
  x = x-1;
}

database.ref('/').update({
  Food: x,
})
}


function draw() {  
  background(46, 139, 87);

  food1.display();

  drawSprites();
}

function feedDog() {
  food1.getFoodStock();
  food1.updateFedTime();
  //dog.addImage(happyDogImg);

  if(foodCount === 0) {
    foodCount = 0;
    milk.visible = false;
    //dog.changeImage(dogImg);
  } else {
    food1.updateFoodStock(foodCount - 1);
    milk.visible = true;
   
  }
}

function addFoods() {
 food1.getFoodStock();

 food1.updateFoodStock(foodCount + 1); 
}

