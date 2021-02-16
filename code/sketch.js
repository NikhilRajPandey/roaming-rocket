let random_point = []; // These will be stars
let noOfpoint = 65;
let rocketAngle = 95;
let starVel = 5;
let rocketImg;
let rocketSize = 100;
let limitStarVel = 125;

function limit(starVelocity,max_vel){
    if(starVelocity < 0){return 0;}
    else if(starVelocity > max_vel){return max_vel;}
    else{return starVelocity;}
}

function preload(){
    rocketImg = loadImage('https://nikhilrajpandey.github.io/roaming-rocket/images/rocket.png')
}
function setup(){ 
    createCanvas(window.innerWidth, window.innerHeight);
    for (let i = 0; i < noOfpoint; i++) {
        random_point.push([int(random(0,width)),int(random(0,height))]);
    }
}
function isInBtw(a,b,c){
    return (a <= c) && (c < b);
}

function leftEdge(){ // Give Cordinates on leftedge
    return [0,int(random(0,height))];
}
function rightEdge(){ // Give Cordinates on rightedge
    return [width,int(random(0,height))];
}
function topEdge(){
    return [int(random(0,width)),0];
}
function bottomEdge(){
    return [int(random(0,width)),height];
}

function rndChoice(a,b){
    if(round(random(0,1)) == 0){return a;}
    return b;
}

function givePoint(angle){ // Give Point on the edge of the screen
    let cordinate = [-1,-1];
    if(angle == 0 || angle == 360){return rightEdge();}
    else if(angle == 90){return topEdge();}
    else if(angle == 180){return leftEdge();}
    else if(angle == 270){return bottomEdge();}

    else if(isInBtw(0,90,angle)){
        return rndChoice(topEdge(),rightEdge());
    }
    else if(isInBtw(90,180,angle)){
        return rndChoice(topEdge(),leftEdge());
    }
    else if(isInBtw(180,270,angle)){
        return rndChoice(bottomEdge(),leftEdge());
    }
    else if(isInBtw(270,360,angle)){
        return rndChoice(bottomEdge(),rightEdge())
    }
}
function isOutOfsc(cordinates){ // isoutofscreen
    if(isInBtw(0,width,cordinates[0]) && isInBtw(0,height,cordinates[1])){
        return false;
    }
    return true;
}
function moveStar(angle,star,velocity){ // start will be in form of [x,y]
    let newStarLocation = star;
    if(angle <= 90){
        newStarLocation[0] += cos(radians(angle))*velocity;
        newStarLocation[1] -= sin(radians(angle))*velocity;
    }
    else if(angle <= 180){
        newStarLocation[0] -= cos(radians(180-angle))*velocity;
        newStarLocation[1] -= sin(radians(180-angle))*velocity;
    }
    else if(angle <= 270){
        newStarLocation[0] -= cos(radians(angle-180))*velocity;
        newStarLocation[1] += sin(radians(angle-180))*velocity;
    }
    else{
        newStarLocation[0] += cos(radians(360-angle))*velocity;
        newStarLocation[1] += sin(radians(360-angle))*velocity;
    }
    return newStarLocation;
}

  
function draw(){
    background("black");
    stroke("white");
    strokeWeight(4);
    for (let index = 0; index < random_point.length; index++) {
        if(isOutOfsc(random_point[index])){
            random_point[index] = givePoint(rocketAngle);
        }
        point(random_point[index][0],random_point[index][1]);

        if( 180 > rocketAngle ){ // Deciding the angle of the star if object angle is in between 0 and 180
            random_point[index] = moveStar(rocketAngle+180,random_point[index],starVel);
        }
        else{ // else between 180 and 360
            random_point[index] = moveStar(rocketAngle-180,random_point[index],starVel);
        }
    }
    // Displaying rocket
    translate(width/2,height/2);
    rotate(radians(360-rocketAngle));
    imageMode(CENTER);
    image(rocketImg,0,0,rocketSize*2,rocketSize);

    // Checking keyboard moves
    keyMoves();
    starVel = limit(starVel,limitStarVel);

    // Checking the angle
    if(rocketAngle > 360){rocketAngle = rocketAngle - 360;}
    else if(rocketAngle < 0){rocketAngle = rocketAngle + 360;}

}
function keyMoves() {
    if (keyIsDown(LEFT_ARROW) ){
        rocketAngle += 1;
    }if (keyIsDown(RIGHT_ARROW) ){
        rocketAngle -= 1;
    }
    if (keyIsDown(UP_ARROW)){
        starVel += 1;
    }
    if (keyIsDown(DOWN_ARROW)){
        starVel -= 1;
    }
}