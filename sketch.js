var dog1,dog2,dog,store,stock = 0,lastfed = 0,eat,add;
var meat = [],toe;

function preload(){
  dog1 = loadImage("images/Dog.png");
  dog2 = loadImage("images/happydog.png");
}
function setup(){
  createCanvas(1200,700);

  dog = createSprite(900,500,10,10);
  dog.addImage(dog2);
  dog.addImage(dog1);
  dog.scale = 0.35;

  //linking the code with the Database // only once
  store = firebase.database();
 
  //food linking
  store.ref("food").on("value",function(data){
    stock = data.val();
  })
  
  //time linking
  store.ref("time").on("value",function(data){
    lastfed = data.val();
  })

  //creating loop for the milks
  for(i = 40;i<440;i = i+40){
    meat.push(ko = new milk(i,280));
    meat.push(kol = new milk(i,380));
  }

  //creating Button to feed
  eat = createButton("FEED ABBY");
  eat.position(550,130);

  //function to feed ABBY and updating time accordingly
  eat.mousePressed(function(){
    if(stock <= 0){
      stock = 0;
    }
    if(stock >= 0){
      stock = stock-1;
    }
    store.ref("/").update({
      food:stock
    })
    lastfed = lastfed + 1;
    store.ref("/").update({
      time:lastfed
    })
    meat.pop(ko);
  });

  //creating button to add food
  add = createButton("ADD FOOD");
  add.position(400,130);

  //function for adding food
  add.mousePressed(function(){
    store = store + 1;

    store.ref("/").update({
      food:stock
    })
  });
}
function draw(){
  background("brown");

  for(i = 0;i < stock;i++){
    meat[i].display();
  }

  drawSprites();

  push();
  textSize(20);
  fill("blue");
  text(" PRESS THE FEED BUTTON TO FEED 'ABBY'",380,50);
  pop();

  //displaying lastfeed time in text
  if(lastfed >= 12 && lastfed < 24){
    textSize(12);
    fill("blue");
    text("LAST TIME ABBY WAS FED:"+lastfed%12+"pm",30,70);
  }
  else if(lastfed === 0){
    textSize(12);
    fill("blue");
    text("LAST TIME ABBY WAS FED:12am",30,70);
  }
  else if(lastfed < 12){
    textSize(12);
    fill("blue");
    text("LAST TIME ABBY WAS FED:"+lastfed%12+"am",30,70);
  }
  else{
    textSize(12);
    fill("blue");
    text("LAST TIME ABBY WAS FED:"+lastfed+"am",30,70);
  }
    
  console.log(lastfed);
}

