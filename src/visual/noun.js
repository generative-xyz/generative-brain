class nounDraw {
  constructor(wCanvas,hCanvas,paperColor,strokeColor) {
    this.graphic = createGraphics(wCanvas,hCanvas);
    this.w = this.graphic.width;
    this.h = this.graphic.height;
  }
  
  draw(color4) {
    if (color4 == 0) {
      this.graphic.fill(strokeColor);    
    } else {this.graphic.fill(paperColor)}
    this.graphic.noStroke();
    
    this.graphic.beginShape();
    this.graphic.vertex(600,650);
    this.graphic.vertex(650,650);
    this.graphic.vertex(650,350);
    this.graphic.vertex(600,350);
    this.graphic.endShape()

    this.graphic.beginShape();
    this.graphic.vertex(300,350);
    this.graphic.vertex(250,350);
    this.graphic.vertex(250,450);
    this.graphic.vertex(100,450);
    this.graphic.vertex(100,500);
    this.graphic.vertex(100,600);
    this.graphic.vertex(150,600);
    this.graphic.vertex(150,500);
    this.graphic.vertex(250,500);
    this.graphic.vertex(250,650);
    this.graphic.vertex(300,650);
    this.graphic.endShape()

    this.graphic.beginShape();
    this.graphic.vertex(400,350);
    this.graphic.vertex(550,350);
    this.graphic.quadraticVertex(550,350,550,350);
    this.graphic.vertex(550,650);
    this.graphic.quadraticVertex(550,650,550,650);
    this.graphic.vertex(400,650);
    this.graphic.quadraticVertex(400,650,400,650);
    this.graphic.vertex(400,350);
    this.graphic.quadraticVertex(400,350,400,350);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(750,350);
    this.graphic.vertex(900,350);
    this.graphic.quadraticVertex(900,350,900,350);
    this.graphic.vertex(900,650);
    this.graphic.quadraticVertex(900,650,900,650);
    this.graphic.vertex(750,650);
    this.graphic.quadraticVertex(750,650,750,650);
    this.graphic.vertex(750,350);
    this.graphic.quadraticVertex(750,350,750,350);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(300,350);
    this.graphic.vertex(400,350);
    this.graphic.quadraticVertex(400,350,400,350);
    this.graphic.vertex(400,400);
    this.graphic.quadraticVertex(400,400,400,400);
    this.graphic.vertex(300,400);
    this.graphic.quadraticVertex(300,400,300,400);
    this.graphic.vertex(300,350);
    this.graphic.quadraticVertex(300,350,300,350);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(300,600);
    this.graphic.vertex(400,600);
    this.graphic.quadraticVertex(400,600,400,600);
    this.graphic.vertex(400,650);
    this.graphic.quadraticVertex(400,650,400,650);
    this.graphic.vertex(300,650);
    this.graphic.quadraticVertex(300,650,300,650);
    this.graphic.vertex(300,600);
    this.graphic.quadraticVertex(300,600,300,600);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(650,350);
    this.graphic.vertex(750,350);
    this.graphic.quadraticVertex(750,350,750,350);
    this.graphic.vertex(750,400);
    this.graphic.quadraticVertex(750,400,750,400);
    this.graphic.vertex(650,400);
    this.graphic.quadraticVertex(650,400,650,400);
    this.graphic.vertex(650,350);
    this.graphic.quadraticVertex(650,350,650,350);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(650,600);
    this.graphic.vertex(750,600);
    this.graphic.quadraticVertex(750,600,750,600);
    this.graphic.vertex(750,650);
    this.graphic.quadraticVertex(750,650,750,650);
    this.graphic.vertex(650,650);
    this.graphic.quadraticVertex(650,650,650,650);
    this.graphic.vertex(650,600);
    this.graphic.quadraticVertex(650,600,650,600);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(550,450);
    this.graphic.vertex(600,450);
    this.graphic.quadraticVertex(600,450,600,450);
    this.graphic.vertex(600,500);
    this.graphic.quadraticVertex(600,500,600,500);
    this.graphic.vertex(550,500);
    this.graphic.quadraticVertex(550,500,550,500);
    this.graphic.vertex(550,450);
    this.graphic.quadraticVertex(550,450,550,450);
    this.graphic.endShape();
  }
}