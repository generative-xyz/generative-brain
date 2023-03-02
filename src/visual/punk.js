class punkDraw {
  constructor(wCanvas,hCanvas,paperColor,strokeColor) {
    this.graphic = createGraphics(wCanvas,hCanvas);
    this.w = this.graphic.width;
    this.h = this.graphic.height;
  }
  
  draw(color2) {
    if (color2 == 0) {
      this.graphic.fill(strokeColor);    
    } else {this.graphic.fill(paperColor)}
    this.graphic.noStroke();
    
    this.graphic.beginShape();
    this.graphic.vertex(550,550);
    this.graphic.vertex(650,550);
    this.graphic.quadraticVertex(650,550,650,550);
    this.graphic.vertex(650,600);
    this.graphic.quadraticVertex(650,600,650,600);
    this.graphic.vertex(550,600);
    this.graphic.quadraticVertex(550,600,550,600);
    this.graphic.vertex(550,550);
    this.graphic.quadraticVertex(550,550,550,550);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(150,500);
    this.graphic.vertex(200,500);
    this.graphic.quadraticVertex(200,500,200,500);
    this.graphic.vertex(200,550);
    this.graphic.quadraticVertex(200,550,200,550);
    this.graphic.vertex(150,550);
    this.graphic.quadraticVertex(150,550,150,550);
    this.graphic.vertex(150,500);
    this.graphic.quadraticVertex(150,500,150,500);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(200,200);
    this.graphic.vertex(250,200);
    this.graphic.quadraticVertex(250,200,250,200);
    this.graphic.vertex(250,300);
    this.graphic.quadraticVertex(250,300,250,300);
    this.graphic.vertex(200,300);
    this.graphic.quadraticVertex(200,300,200,300);
    this.graphic.vertex(200,200);
    this.graphic.quadraticVertex(200,200,200,200);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(250,150);
    this.graphic.vertex(300,150);
    this.graphic.quadraticVertex(300,150,300,150);
    this.graphic.vertex(300,200);
    this.graphic.quadraticVertex(300,200,300,200);
    this.graphic.vertex(250,200);
    this.graphic.quadraticVertex(250,200,250,200);
    this.graphic.vertex(250,150);
    this.graphic.quadraticVertex(250,150,250,150);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(300,100);
    this.graphic.vertex(350,100);
    this.graphic.quadraticVertex(350,100,350,100);
    this.graphic.vertex(350,150);
    this.graphic.quadraticVertex(350,150,350,150);
    this.graphic.vertex(300,150);
    this.graphic.quadraticVertex(300,150,300,150);
    this.graphic.vertex(300,100);
    this.graphic.quadraticVertex(300,100,300,100);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(700,100);
    this.graphic.vertex(750,100);
    this.graphic.quadraticVertex(750,100,750,100);
    this.graphic.vertex(750,150);
    this.graphic.quadraticVertex(750,150,750,150);
    this.graphic.vertex(700,150);
    this.graphic.quadraticVertex(700,150,700,150);
    this.graphic.vertex(700,100);
    this.graphic.quadraticVertex(700,100,700,100);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(750,150);
    this.graphic.vertex(800,150);
    this.graphic.quadraticVertex(800,150,800,150);
    this.graphic.vertex(800,200);
    this.graphic.quadraticVertex(800,200,800,200);
    this.graphic.vertex(750,200);
    this.graphic.quadraticVertex(750,200,750,200);
    this.graphic.vertex(750,150);
    this.graphic.quadraticVertex(750,150,750,150);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(800,200);
    this.graphic.vertex(800,300);
    this.graphic.vertex(750,300);
    this.graphic.vertex(750,350);
    this.graphic.vertex(300,350);
    this.graphic.vertex(300,300);
    this.graphic.vertex(250,300);
    this.graphic.vertex(250,400);
    this.graphic.vertex(200,400);
    this.graphic.vertex(200,500);
    this.graphic.vertex(250,500);
    this.graphic.vertex(250,450);
    this.graphic.vertex(300,450);
    this.graphic.vertex(300,400);
    this.graphic.vertex(400,400);
    this.graphic.vertex(400,500);
    this.graphic.vertex(500,500);
    this.graphic.vertex(500,400);
    this.graphic.vertex(650,400);
    this.graphic.vertex(650,500);
    this.graphic.vertex(750,500);
    this.graphic.vertex(750,600);
    this.graphic.vertex(700,600);
    this.graphic.vertex(700,650);
    this.graphic.vertex(650,650);
    this.graphic.vertex(500,650);
    this.graphic.vertex(400,650);
    this.graphic.vertex(400,600);
    this.graphic.vertex(350,600);
    this.graphic.vertex(350,550);
    this.graphic.vertex(300,550);
    this.graphic.vertex(300,500);
    this.graphic.vertex(250,500);
    this.graphic.vertex(250,550);
    this.graphic.vertex(200,550);
    this.graphic.vertex(200,600);
    this.graphic.vertex(250,600);
    this.graphic.vertex(250,1000);
    this.graphic.vertex(300,1000);
    this.graphic.vertex(300,800);
    this.graphic.vertex(350,800);
    this.graphic.vertex(350,900);
    this.graphic.vertex(400,900);
    this.graphic.vertex(400,950);
    this.graphic.vertex(450,950);
    this.graphic.vertex(450,1000);
    this.graphic.vertex(500,1000);
    this.graphic.vertex(500,950);
    this.graphic.vertex(700,950);
    this.graphic.vertex(700,900);
    this.graphic.vertex(750,900);
    this.graphic.vertex(750,800);
    this.graphic.vertex(800,800);
    this.graphic.vertex(800,300.1);
    this.graphic.vertex(850,300.1);
    this.graphic.vertex(850,200);
    this.graphic.vertex(800,200);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(650,700);
    this.graphic.vertex(650,750);
    this.graphic.vertex(500,750);
    this.graphic.vertex(500,700);
    this.graphic.vertex(650,700);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(350,50);
    this.graphic.vertex(700,50);
    this.graphic.quadraticVertex(700,50,700,50);
    this.graphic.vertex(700,100);
    this.graphic.quadraticVertex(700,100,700,100);
    this.graphic.vertex(350,100);
    this.graphic.quadraticVertex(350,100,350,100);
    this.graphic.vertex(350,50);
    this.graphic.quadraticVertex(350,50,350,50);
    this.graphic.endShape();
  }
}