class moonDraw {
  constructor(wCanvas,hCanvas,paperColor,strokeColor) {
    this.graphic = createGraphics(wCanvas,hCanvas);
    this.w = this.graphic.width;
    this.h = this.graphic.height;
  }
  
  draw(color3) {
    if (color3 == 0) {
      this.graphic.fill(strokeColor);    
    } else {this.graphic.fill(paperColor)}
    this.graphic.noStroke();
    
    this.graphic.beginShape();
    this.graphic.vertex(450,450);
    this.graphic.vertex(500,450);
    this.graphic.quadraticVertex(500,450,500,450);
    this.graphic.vertex(500,500);
    this.graphic.quadraticVertex(500,500,500,500);
    this.graphic.vertex(450,500);
    this.graphic.quadraticVertex(450,500,450,500);
    this.graphic.vertex(450,450);
    this.graphic.quadraticVertex(450,450,450,450);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(425,575);
    this.graphic.vertex(375,575);
    this.graphic.vertex(375,525);
    this.graphic.vertex(325,525);
    this.graphic.vertex(325,625);
    this.graphic.bezierVertex(349.9,625,400.1,625,425,625);
    this.graphic.vertex(425,575);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(725,520.3);
    this.graphic.vertex(725,620.3);
    this.graphic.bezierVertex(749.9,620.3,800.1,620.3,825,620.3);
    this.graphic.vertex(825,570.3);
    this.graphic.vertex(775,570.3);
    this.graphic.vertex(775,520.3);
    this.graphic.vertex(725,520.3);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(625.2,775);
    this.graphic.bezierVertex(625.2,750.1,625.2,699.9,625.2,675);
    this.graphic.vertex(525.2,675);
    this.graphic.vertex(525.2,725);
    this.graphic.vertex(575.2,725);
    this.graphic.vertex(575.2,775);
    this.graphic.vertex(625.2,775);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(650.4,450);
    this.graphic.vertex(700.4,450);
    this.graphic.quadraticVertex(700.4,450,700.4,450);
    this.graphic.vertex(700.4,500);
    this.graphic.quadraticVertex(700.4,500,700.4,500);
    this.graphic.vertex(650.4,500);
    this.graphic.quadraticVertex(650.4,500,650.4,500);
    this.graphic.vertex(650.4,450);
    this.graphic.quadraticVertex(650.4,450,650.4,450);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(250,450);
    this.graphic.vertex(300,450);
    this.graphic.quadraticVertex(300,450,300,450);
    this.graphic.vertex(300,500);
    this.graphic.quadraticVertex(300,500,300,500);
    this.graphic.vertex(250,500);
    this.graphic.quadraticVertex(250,500,250,500);
    this.graphic.vertex(250,450);
    this.graphic.quadraticVertex(250,450,250,450);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(250,650);
    this.graphic.vertex(300,650);
    this.graphic.quadraticVertex(300,650,300,650);
    this.graphic.vertex(300,700);
    this.graphic.quadraticVertex(300,700,300,700);
    this.graphic.vertex(250,700);
    this.graphic.quadraticVertex(250,700,250,700);
    this.graphic.vertex(250,650);
    this.graphic.quadraticVertex(250,650,250,650);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(300,700);
    this.graphic.vertex(300,750);
    this.graphic.vertex(350,750);
    this.graphic.vertex(450,750);
    this.graphic.vertex(450,700);
    this.graphic.vertex(350,700);
    this.graphic.vertex(300,700);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(750,850);
    this.graphic.vertex(800,850);
    this.graphic.quadraticVertex(800,850,800,850);
    this.graphic.vertex(800,900);
    this.graphic.quadraticVertex(800,900,800,900);
    this.graphic.vertex(750,900);
    this.graphic.quadraticVertex(750,900,750,900);
    this.graphic.vertex(750,850);
    this.graphic.quadraticVertex(750,850,750,850);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(400,800);
    this.graphic.vertex(400,850);
    this.graphic.vertex(350,850);
    this.graphic.vertex(350,900);
    this.graphic.vertex(300,900);
    this.graphic.vertex(300,950);
    this.graphic.vertex(300,1000);
    this.graphic.vertex(350,1000);
    this.graphic.vertex(350,950);
    this.graphic.vertex(400,950);
    this.graphic.vertex(400,900);
    this.graphic.vertex(450,900);
    this.graphic.vertex(450,850);
    this.graphic.vertex(750,850);
    this.graphic.vertex(750,800);
    this.graphic.vertex(400,800);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(200,500);
    this.graphic.vertex(250,500);
    this.graphic.quadraticVertex(250,500,250,500);
    this.graphic.vertex(250,650);
    this.graphic.quadraticVertex(250,650,250,650);
    this.graphic.vertex(200,650);
    this.graphic.quadraticVertex(200,650,200,650);
    this.graphic.vertex(200,500);
    this.graphic.quadraticVertex(200,500,200,500);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(300,400);
    this.graphic.vertex(450,400);
    this.graphic.quadraticVertex(450,400,450,400);
    this.graphic.vertex(450,450);
    this.graphic.quadraticVertex(450,450,450,450);
    this.graphic.vertex(300,450);
    this.graphic.quadraticVertex(300,450,300,450);
    this.graphic.vertex(300,400);
    this.graphic.quadraticVertex(300,400,300,400);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(700,150);
    this.graphic.vertex(650,150);
    this.graphic.vertex(650,200);
    this.graphic.vertex(600,200);
    this.graphic.vertex(600,300);
    this.graphic.vertex(500,300);
    this.graphic.vertex(500,250);
    this.graphic.vertex(450,250);
    this.graphic.vertex(450,200);
    this.graphic.vertex(400,200);
    this.graphic.vertex(400,150);
    this.graphic.bezierVertex(368.3,150,282.8,150,250,150);
    this.graphic.vertex(250,200);
    this.graphic.vertex(200,200);
    this.graphic.bezierVertex(200,224.9,200,275.1,200,300);
    this.graphic.vertex(150,300);
    this.graphic.vertex(150,400);
    this.graphic.vertex(200,400);
    this.graphic.vertex(200,350);
    this.graphic.vertex(250,350);
    this.graphic.bezierVertex(250,325.1,250,274.9,250,250);
    this.graphic.vertex(300,250);
    this.graphic.vertex(300,200);
    this.graphic.vertex(350,200);
    this.graphic.vertex(350,250);
    this.graphic.vertex(400,250);
    this.graphic.vertex(400,300);
    this.graphic.vertex(450,300);
    this.graphic.vertex(450,350);
    this.graphic.bezierVertex(483.2,350,614.4,350,650,350);
    this.graphic.bezierVertex(650,325.1,650,274.9,650,250);
    this.graphic.vertex(700,250);
    this.graphic.vertex(700,200);
    this.graphic.vertex(750,200);
    this.graphic.vertex(750,250);
    this.graphic.vertex(800,250);
    this.graphic.bezierVertex(800,225.1,800,174.9,800,150);
    this.graphic.vertex(700,150);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(850,300);
    this.graphic.vertex(850,250);
    this.graphic.vertex(800,250);
    this.graphic.vertex(800,350);
    this.graphic.vertex(850,350);
    this.graphic.vertex(850,400);
    this.graphic.vertex(700.4,400);
    this.graphic.vertex(700.4,450);
    this.graphic.vertex(850,450);
    this.graphic.vertex(850,500);
    this.graphic.vertex(900,500);
    this.graphic.bezierVertex(900,466.8,900,335.6,900,300);
    this.graphic.vertex(850,300);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(900,500);
    this.graphic.vertex(900,650);
    this.graphic.vertex(850,650);
    this.graphic.vertex(850,700);
    this.graphic.vertex(900,700);
    this.graphic.vertex(900,1000);
    this.graphic.vertex(950,1000);
    this.graphic.bezierVertex(950,896.1,950,599.3,950,500);
    this.graphic.vertex(900,500);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(100,400);
    this.graphic.vertex(150,400);
    this.graphic.quadraticVertex(150,400,150,400);
    this.graphic.vertex(150,600);
    this.graphic.quadraticVertex(150,600,150,600);
    this.graphic.vertex(100,600);
    this.graphic.quadraticVertex(100,600,100,600);
    this.graphic.vertex(100,400);
    this.graphic.quadraticVertex(100,400,100,400);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(50,600);
    this.graphic.vertex(100,600);
    this.graphic.quadraticVertex(100,600,100,600);
    this.graphic.vertex(100,1000);
    this.graphic.quadraticVertex(100,1000,100,1000);
    this.graphic.vertex(50,1000);
    this.graphic.quadraticVertex(50,1000,50,1000);
    this.graphic.vertex(50,600);
    this.graphic.quadraticVertex(50,600,50,600);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(450,650);
    this.graphic.vertex(500,650);
    this.graphic.quadraticVertex(500,650,500,650);
    this.graphic.vertex(500,700);
    this.graphic.quadraticVertex(500,700,500,700);
    this.graphic.vertex(450,700);
    this.graphic.quadraticVertex(450,700,450,700);
    this.graphic.vertex(450,650);
    this.graphic.quadraticVertex(450,650,450,650);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(650,650);
    this.graphic.vertex(700,650);
    this.graphic.quadraticVertex(700,650,700,650);
    this.graphic.vertex(700,700);
    this.graphic.quadraticVertex(700,700,700,700);
    this.graphic.vertex(650,700);
    this.graphic.quadraticVertex(650,700,650,700);
    this.graphic.vertex(650,650);
    this.graphic.quadraticVertex(650,650,650,650);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(700,750);
    this.graphic.bezierVertex(733.2,750,817.9,750,850,750);
    this.graphic.vertex(850,700);
    this.graphic.bezierVertex(818.3,700,732.8,700,700,700);
    this.graphic.vertex(700,750);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(550,650);
    this.graphic.bezierVertex(550,616.8,550,532.1,550,500);
    this.graphic.vertex(500,500);
    this.graphic.bezierVertex(500,531.7,500,617.2,500,650);
    this.graphic.vertex(550,650);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(649.8,550);
    this.graphic.vertex(649.8,500);
    this.graphic.vertex(599.8,500);
    this.graphic.vertex(599.8,550);
    this.graphic.vertex(600,550);
    this.graphic.vertex(600,650);
    this.graphic.vertex(650,650);
    this.graphic.vertex(650,550);
    this.graphic.vertex(649.8,550);
    this.graphic.endShape();

    this.graphic.beginShape();
    this.graphic.vertex(800,900);
    this.graphic.vertex(850,900);
    this.graphic.quadraticVertex(850,900,850,900);
    this.graphic.vertex(850,1000);
    this.graphic.quadraticVertex(850,1000,850,1000);
    this.graphic.vertex(800,1000);
    this.graphic.quadraticVertex(800,1000,800,1000);
    this.graphic.vertex(800,900);
    this.graphic.quadraticVertex(800,900,800,900);
    this.graphic.endShape();
  }
}