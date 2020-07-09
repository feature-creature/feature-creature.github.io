/*
 * Agent Instance
 *
 */

function Agent (p5i,xPos,yPos,xDir,yDir,diameter){

  this.pos = p5i.createVector(xPos,yPos);
  this.dir = p5i.createVector(xDir,yDir);
  this.normalizedBool = function(x){return Math.random() <= x;} 
  this.exampleBoo = this.normalizedBool(0.5); 
  this.d = diameter;


  this.state = p5i.random() <= 0.5 ? "a" : "b";
  var parent = this;
  this.states = {
    "a" : {
      move:function(){parent.defaultWalk()},
      color:p5i.color(255,255,255),
      stroke:p5i.color(75,75,75)
    },
    "b" : {
      move:function(){parent.defaultWalk()},
      color:p5i.color(0,0,0),
      stroke:p5i.color(75,75,75)
    }
  };



  this.update = function(){
    this.states[this.state].move();
  }


  this.show = function(){
    p5i.push();
    p5i.translate(this.pos.x, this.pos.y);
    p5i.strokeWeight(3);
    p5i.stroke(this.colorStroke);
    p5i.fill(this.colorFill);
    p5i.ellipse(0,0,this.d,this.d);
    p5i.pop();
  }


  this.defaultWalk = function(){
    this.randomWalk(
      -1, 1, 0.5, p5i.origin[0][0]+this.d, p5i.origin[1][0],
      -1, 1, 0.5, p5i.origin[0][1]+this.d, p5i.origin[1][1]-this.d
    );
  } 


  this.randomWalk = function(xStepMin,xStepMax,xSpread,xMin,xMax,yStepMin,yStepMax,ySpread,yMin,yMax){
    nextMove = this.pos.copy().add(p5i.random() >= xSpread ? xStepMin : xStepMax,p5i.random() >= ySpread ? yStepMin : yStepMax);
    if((nextMove.x >= xMin && nextMove.x <= xMax) && (nextMove.y >= yMin && nextMove.y <= yMax))this.pos = nextMove;
  }
}
