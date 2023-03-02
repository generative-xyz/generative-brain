class toadDraw {
  constructor(wCanvas,hCanvas,paperColor,strokeColor) {
    this.graphic = createGraphics(wCanvas,hCanvas);
    this.w = this.graphic.width;
    this.h = this.graphic.height;
  }
  
  draw(color1) {
    if (color1 == 0) {
      this.graphic.fill(strokeColor);    
    } else {this.graphic.fill(paperColor)}
    this.graphic.noStroke();
    
    this.graphic.beginShape();
    this.graphic.vertex(200,700);
    this.graphic.vertex(200,650);
    this.graphic.vertex(100,650);
    this.graphic.vertex(100,700);
    this.graphic.vertex(100,750);
    this.graphic.vertex(150,750);
    this.graphic.vertex(150,700);
    this.graphic.vertex(200,700);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(250,600);
    this.graphic.vertex(300,600);
    this.graphic.quadraticVertex(300,600,300,600);
    this.graphic.vertex(300,650);
    this.graphic.quadraticVertex(300,650,300,650);
    this.graphic.vertex(250,650);
    this.graphic.quadraticVertex(250,650,250,650);
    this.graphic.vertex(250,600);
    this.graphic.quadraticVertex(250,600,250,600);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(50,500);
    this.graphic.vertex(100,500);
    this.graphic.quadraticVertex(100,500,100,500);
    this.graphic.vertex(100,650);
    this.graphic.quadraticVertex(100,650,100,650);
    this.graphic.vertex(50,650);
    this.graphic.quadraticVertex(50,650,50,650);
    this.graphic.vertex(50,500);
    this.graphic.quadraticVertex(50,500,50,500);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(100,450);
    this.graphic.vertex(150,450);
    this.graphic.quadraticVertex(150,450,150,450);
    this.graphic.vertex(150,500);
    this.graphic.quadraticVertex(150,500,150,500);
    this.graphic.vertex(100,500);
    this.graphic.quadraticVertex(100,500,100,500);
    this.graphic.vertex(100,450);
    this.graphic.quadraticVertex(100,450,100,450);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(900,500);
    this.graphic.vertex(900,650);
    this.graphic.vertex(800,650);
    this.graphic.vertex(800,700);
    this.graphic.vertex(850,700);
    this.graphic.vertex(850,750);
    this.graphic.vertex(900,750);
    this.graphic.vertex(900,700);
    this.graphic.vertex(950,700);
    this.graphic.vertex(950,650);
    this.graphic.vertex(950,500);
    this.graphic.vertex(900,500);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(700,600);
    this.graphic.vertex(800,600);
    this.graphic.quadraticVertex(800,600,800,600);
    this.graphic.vertex(800,650);
    this.graphic.quadraticVertex(800,650,800,650);
    this.graphic.vertex(700,650);
    this.graphic.quadraticVertex(700,650,700,650);
    this.graphic.vertex(700,600);
    this.graphic.quadraticVertex(700,600,700,600);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(600,700);
    this.graphic.vertex(700,700);
    this.graphic.vertex(700,650);
    this.graphic.vertex(550,650);
    this.graphic.vertex(550,600);
    this.graphic.vertex(500,600);
    this.graphic.vertex(500,650);
    this.graphic.vertex(500,700);
    this.graphic.vertex(550,700);
    this.graphic.vertex(550,750);
    this.graphic.vertex(400,750);
    this.graphic.vertex(400,700);
    this.graphic.vertex(450,700);
    this.graphic.vertex(450,650);
    this.graphic.vertex(450,600);
    this.graphic.vertex(400,600);
    this.graphic.vertex(400,650);
    this.graphic.vertex(300,650);
    this.graphic.vertex(300,700);
    this.graphic.vertex(350,700);
    this.graphic.vertex(350,750);
    this.graphic.vertex(150,750);
    this.graphic.vertex(150,800);
    this.graphic.vertex(850,800);
    this.graphic.vertex(850,750);
    this.graphic.vertex(600,750);
    this.graphic.vertex(600,700);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(150,400);
    this.graphic.vertex(200,400);
    this.graphic.quadraticVertex(200,400,200,400);
    this.graphic.vertex(200,450);
    this.graphic.quadraticVertex(200,450,200,450);
    this.graphic.vertex(150,450);
    this.graphic.quadraticVertex(150,450,150,450);
    this.graphic.vertex(150,400);
    this.graphic.quadraticVertex(150,400,150,400);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(850,600);
    this.graphic.vertex(850,500);
    this.graphic.vertex(900,500);
    this.graphic.vertex(900,450);
    this.graphic.vertex(850,450);
    this.graphic.vertex(850,400);
    this.graphic.vertex(800,400);
    this.graphic.vertex(800,600);
    this.graphic.vertex(850,600);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(250,250);
    this.graphic.vertex(300,250);
    this.graphic.quadraticVertex(300,250,300,250);
    this.graphic.vertex(300,300);
    this.graphic.quadraticVertex(300,300,300,300);
    this.graphic.vertex(250,300);
    this.graphic.quadraticVertex(250,300,250,300);
    this.graphic.vertex(250,250);
    this.graphic.quadraticVertex(250,250,250,250);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(250,450);
    this.graphic.vertex(350,450);
    this.graphic.vertex(350,400);
    this.graphic.vertex(450,400);
    this.graphic.vertex(450,350);
    this.graphic.vertex(250,350);
    this.graphic.vertex(250,300);
    this.graphic.vertex(200,300);
    this.graphic.vertex(200,400);
    this.graphic.vertex(250,400);
    this.graphic.vertex(250,450);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(750,550);
    this.graphic.vertex(750,500);
    this.graphic.vertex(150,500);
    this.graphic.vertex(150,550);
    this.graphic.vertex(200,550);
    this.graphic.vertex(200,600);
    this.graphic.vertex(250,600);
    this.graphic.vertex(250,550);
    this.graphic.vertex(750,550);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(600,400);
    this.graphic.vertex(700,400);
    this.graphic.vertex(700,350);
    this.graphic.vertex(500,350);
    this.graphic.vertex(500,400);
    this.graphic.vertex(500,450);
    this.graphic.vertex(600,450);
    this.graphic.vertex(600,400);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(750,300);
    this.graphic.vertex(800,300);
    this.graphic.quadraticVertex(800,300,800,300);
    this.graphic.vertex(800,400);
    this.graphic.quadraticVertex(800,400,800,400);
    this.graphic.vertex(750,400);
    this.graphic.quadraticVertex(750,400,750,400);
    this.graphic.vertex(750,300);
    this.graphic.quadraticVertex(750,300,750,300);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(300,200);
    this.graphic.vertex(700,200);
    this.graphic.quadraticVertex(700,200,700,200);
    this.graphic.vertex(700,250);
    this.graphic.quadraticVertex(700,250,700,250);
    this.graphic.vertex(300,250);
    this.graphic.quadraticVertex(300,250,300,250);
    this.graphic.vertex(300,200);
    this.graphic.quadraticVertex(300,200,300,200);
    this.graphic.endShape();
    
    this.graphic.beginShape();
    this.graphic.vertex(700,250);
    this.graphic.vertex(750,250);
    this.graphic.quadraticVertex(750,250,750,250);
    this.graphic.vertex(750,300);
    this.graphic.quadraticVertex(750,300,750,300);
    this.graphic.vertex(700,300);
    this.graphic.quadraticVertex(700,300,700,300);
    this.graphic.vertex(700,250);
    this.graphic.quadraticVertex(700,250,700,250);
    this.graphic.endShape();
  }
}