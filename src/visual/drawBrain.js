function drawDecay(canvas,scale) {
  setEraseMode(canvas);
  canvas.fill(0);
  canvas.rect(0,0,500,500);
  setNoEraseMode(canvas);
  canvas.noStroke();
  canvas.fill(addAlpha(hexToRgb('#000000'),0.5));
  // canvas.fill(paperColor);
  
  canvas.push();
  canvas.translate(250,250);
  canvas.scale(scale);
  canvas.translate(-250,-250);
  canvas.beginShape();
  canvas.vertex(235.2,24.9);
  canvas.bezierVertex(215,24.6,185,11.4,164.8,11);
  canvas.bezierVertex(147.20000000000002,10.7,129.3,10.4,112.20000000000002,14.7);
  canvas.bezierVertex(95.10000000000002,19,78.5,28.5,69.6,43.8);
  canvas.bezierVertex(57.699999999999996,64.19999999999999,61.599999999999994,90.19999999999999,70.19999999999999,112.2);
  canvas.bezierVertex(78.79999999999998,134.20000000000002,91.6,154.6,97.19999999999999,177.5);
  canvas.bezierVertex(102.49999999999999,199.2,100.89999999999999,222.5,92.79999999999998,243.2);
  canvas.bezierVertex(83,268,64.6,288.3,48.9,310);
  canvas.bezierVertex(33.2,331.7,24.5,337.5,26.599999999999998,364.1);
  canvas.bezierVertex(28.2,384.1,61.39999999999999,404.20000000000005,75.7,418.3);
  canvas.bezierVertex(90,432.40000000000003,73.7,488.20000000000005,91.9,496.70000000000005);
  canvas.bezierVertex(124.2,511.6,159,472.50000000000006,194.3,468.1);
  canvas.bezierVertex(211.60000000000002,465.90000000000003,267.4,501.5,283.9,495.90000000000003);
  canvas.bezierVertex(340.7,476.70000000000005,298.59999999999997,428.90000000000003,355.4,409.70000000000005);
  canvas.bezierVertex(370.79999999999995,404.50000000000006,454.5,407.6,464.4,394.80000000000007);
  canvas.bezierVertex(478.59999999999997,376.30000000000007,474.7,349.30000000000007,464.29999999999995,328.4000000000001);
  canvas.bezierVertex(453.9,307.5000000000001,438.09999999999997,289.5000000000001,428.69999999999993,268.2000000000001);
  canvas.bezierVertex(412,230,419,182.6,446.1,150.9);
  canvas.bezierVertex(449.70000000000005,146.70000000000002,453.6,142.70000000000002,455.8,137.6);
  canvas.bezierVertex(459.40000000000003,129.29999999999998,457.5,119.6,454.8,111);
  canvas.bezierVertex(443.2,73.4,417.3,40.400000000000006,383.6,20.299999999999997);
  canvas.bezierVertex(358.1,5,343.2,-0.4,313.5,0);
  canvas.bezierVertex(287.5,0.4,261.6,25.4,235.2,24.9);
  canvas.endShape();
  canvas.pop();
}

function drawBrain(canvas,backgroundCanvas,patternColor,paperColor,state,age) {
  setEraseMode(backgroundCanvas);
  backgroundCanvas.fill(0);
  backgroundCanvas.rect(0,0,500,500);
  setNoEraseMode(backgroundCanvas);
  backgroundCanvas.noStroke();
  backgroundCanvas.fill(addAlpha(patternColor,0.5));
  let brainFill,ageMin,ageMax;
  if (state == 1) {ageMin = 0; ageMax = 25; brainFill = map(age,ageMin,ageMax,500,0)}
  else {brainFill = 0}
  backgroundCanvas.rect(0,brainFill,500,500);
  
  canvas.noStroke();
  canvas.fill(paperColor);
  canvas.rect(0,0,500,500);

  canvas.beginShape();
  canvas.vertex(435.2,373.8);
  canvas.bezierVertex(433.7,384.1,433.3,393.7,430.8,402.7);
  canvas.bezierVertex(424.1,426.3,408.90000000000003,442.9,386.3,452.5);
  canvas.bezierVertex(383.2,453.8,381,455.5,379,458.3);
  canvas.bezierVertex(348.6,501.7,285,502.40000000000003,253.5,459.8);
  canvas.bezierVertex(252.5,458.40000000000003,251.4,457.1,250.3,455.6);
  canvas.bezierVertex(246.20000000000002,460.3,242.70000000000002,465.1,238.5,469.1);
  canvas.bezierVertex(203.8,502.8,148.8,497.40000000000003,120.7,457.8);
  canvas.bezierVertex(119.3,455.8,117,453.90000000000003,114.7,452.90000000000003);
  canvas.bezierVertex(84.9,440.6,66.2,412.90000000000003,66.4,380.70000000000005);
  canvas.bezierVertex(66.4,376.30000000000007,65.30000000000001,373.70000000000005,61.7,371.1);
  canvas.bezierVertex(33.5,350.40000000000003,25.300000000000004,313.20000000000005,41.800000000000004,282.40000000000003);
  canvas.bezierVertex(43.2,279.90000000000003,43.6,278.00000000000006,42.1,275.1);
  canvas.bezierVertex(28.200000000000003,247.70000000000002,30.400000000000002,221.60000000000002,49.6,197.3);
  canvas.bezierVertex(51.7,194.60000000000002,51.7,192.3,51.2,189.4);
  canvas.bezierVertex(46.800000000000004,164.8,53.5,143.7,71.1,126.10000000000001);
  canvas.bezierVertex(77.69999999999999,119.60000000000001,85.39999999999999,114.80000000000001,94,111.50000000000001);
  canvas.bezierVertex(96.1,110.70000000000002,98.3,109.90000000000002,100.7,109.00000000000001);
  canvas.bezierVertex(100.2,106.00000000000001,99.8,103.20000000000002,99.4,100.40000000000002);
  canvas.bezierVertex(96.60000000000001,79.70000000000002,107.10000000000001,58.70000000000002,125.2,48.20000000000002);
  canvas.bezierVertex(129.4,45.80000000000002,133.4,43.20000000000002,137.3,40.30000000000002);
  canvas.bezierVertex(154.20000000000002,28.000000000000018,172.3,18.000000000000018,192.5,12.10000000000002);
  canvas.bezierVertex(202.7,9.10000000000002,213.1,7.200000000000019,223.8,8.800000000000018);
  canvas.bezierVertex(233.8,10.300000000000018,242.4,14.900000000000018,249.70000000000002,22.40000000000002);
  canvas.bezierVertex(250.70000000000002,21.70000000000002,251.60000000000002,21.20000000000002,252.3,20.50000000000002);
  canvas.bezierVertex(263.8,9.900000000000022,277.5,6.800000000000022,292.6,9.000000000000021);
  canvas.bezierVertex(316.90000000000003,12.600000000000021,338.1,23.50000000000002,358.1,37.10000000000002);
  canvas.bezierVertex(364.3,41.300000000000026,370.5,45.50000000000002,376.90000000000003,49.50000000000002);
  canvas.bezierVertex(395.00000000000006,61.00000000000002,404.3,82.90000000000002,400.00000000000006,104.50000000000003);
  canvas.bezierVertex(399.70000000000005,105.90000000000003,399.50000000000006,107.30000000000003,399.20000000000005,108.90000000000003);
  canvas.bezierVertex(402.70000000000005,110.30000000000004,406.00000000000006,111.40000000000003,409.30000000000007,112.90000000000003);
  canvas.bezierVertex(438.50000000000006,125.80000000000004,455.1000000000001,157.30000000000004,449.00000000000006,188.70000000000005);
  canvas.bezierVertex(448.30000000000007,192.40000000000003,448.6000000000001,195.20000000000005,451.30000000000007,198.40000000000003);
  canvas.bezierVertex(469.00000000000006,219.50000000000003,471.6000000000001,249.70000000000005,458.1000000000001,274.90000000000003);
  canvas.bezierVertex(456.7000000000001,277.50000000000006,456.50000000000006,279.40000000000003,458.00000000000006,282.20000000000005);
  canvas.bezierVertex(475.1000000000001,314.20000000000005,466.50000000000006,351.1,437.00000000000006,372.30000000000007);
  canvas.bezierVertex(436.2,373.1,435.1,373.8,435.2,373.8);
  canvas.endShape();
  
  canvas.fill(patternColor);
  canvas.beginShape();
  canvas.vertex(435.2,373.8);
  canvas.bezierVertex(433.7,384.1,433.3,393.7,430.8,402.7);
  canvas.bezierVertex(424.1,426.3,408.90000000000003,442.9,386.3,452.5);
  canvas.bezierVertex(383.2,453.8,381,455.5,379,458.3);
  canvas.bezierVertex(348.6,501.7,285,502.40000000000003,253.5,459.8);
  canvas.bezierVertex(252.5,458.40000000000003,251.4,457.1,250.3,455.6);
  canvas.bezierVertex(246.20000000000002,460.3,242.70000000000002,465.1,238.5,469.1);
  canvas.bezierVertex(203.8,502.8,148.8,497.40000000000003,120.7,457.8);
  canvas.bezierVertex(119.3,455.8,117,453.90000000000003,114.7,452.90000000000003);
  canvas.bezierVertex(84.9,440.6,66.2,412.90000000000003,66.4,380.70000000000005);
  canvas.bezierVertex(66.4,376.30000000000007,65.30000000000001,373.70000000000005,61.7,371.1);
  canvas.bezierVertex(33.5,350.40000000000003,25.300000000000004,313.20000000000005,41.800000000000004,282.40000000000003);
  canvas.bezierVertex(43.2,279.90000000000003,43.6,278.00000000000006,42.1,275.1);
  canvas.bezierVertex(28.200000000000003,247.70000000000002,30.400000000000002,221.60000000000002,49.6,197.3);
  canvas.bezierVertex(51.7,194.60000000000002,51.7,192.3,51.2,189.4);
  canvas.bezierVertex(46.800000000000004,164.8,53.5,143.7,71.1,126.10000000000001);
  canvas.bezierVertex(77.69999999999999,119.60000000000001,85.39999999999999,114.80000000000001,94,111.50000000000001);
  canvas.bezierVertex(96.1,110.70000000000002,98.3,109.90000000000002,100.7,109.00000000000001);
  canvas.bezierVertex(100.2,106.00000000000001,99.8,103.20000000000002,99.4,100.40000000000002);
  canvas.bezierVertex(96.60000000000001,79.70000000000002,107.10000000000001,58.70000000000002,125.2,48.20000000000002);
  canvas.bezierVertex(129.4,45.80000000000002,133.4,43.20000000000002,137.3,40.30000000000002);
  canvas.bezierVertex(154.20000000000002,28.000000000000018,172.3,18.000000000000018,192.5,12.10000000000002);
  canvas.bezierVertex(202.7,9.10000000000002,213.1,7.200000000000019,223.8,8.800000000000018);
  canvas.bezierVertex(233.8,10.300000000000018,242.4,14.900000000000018,249.70000000000002,22.40000000000002);
  canvas.bezierVertex(250.70000000000002,21.70000000000002,251.60000000000002,21.20000000000002,252.3,20.50000000000002);
  canvas.bezierVertex(263.8,9.900000000000022,277.5,6.800000000000022,292.6,9.000000000000021);
  canvas.bezierVertex(316.90000000000003,12.600000000000021,338.1,23.50000000000002,358.1,37.10000000000002);
  canvas.bezierVertex(364.3,41.300000000000026,370.5,45.50000000000002,376.90000000000003,49.50000000000002);
  canvas.bezierVertex(395.00000000000006,61.00000000000002,404.3,82.90000000000002,400.00000000000006,104.50000000000003);
  canvas.bezierVertex(399.70000000000005,105.90000000000003,399.50000000000006,107.30000000000003,399.20000000000005,108.90000000000003);
  canvas.bezierVertex(402.70000000000005,110.30000000000004,406.00000000000006,111.40000000000003,409.30000000000007,112.90000000000003);
  canvas.bezierVertex(438.50000000000006,125.80000000000004,455.1000000000001,157.30000000000004,449.00000000000006,188.70000000000005);
  canvas.bezierVertex(448.30000000000007,192.40000000000003,448.6000000000001,195.20000000000005,451.30000000000007,198.40000000000003);
  canvas.bezierVertex(469.00000000000006,219.50000000000003,471.6000000000001,249.70000000000005,458.1000000000001,274.90000000000003);
  canvas.bezierVertex(456.7000000000001,277.50000000000006,456.50000000000006,279.40000000000003,458.00000000000006,282.20000000000005);
  canvas.bezierVertex(475.1000000000001,314.20000000000005,466.50000000000006,351.1,437.00000000000006,372.30000000000007);
  canvas.bezierVertex(436.2,373.1,435.1,373.8,435.2,373.8);
  canvas.endShape();
  
  setEraseMode(canvas);
  
  canvas.fill(paperColor)
  canvas.beginShape();
  canvas.vertex(184.3,473.2);
  canvas.bezierVertex(164,473.2,144.70000000000002,462.09999999999997,134,444.3);
  canvas.bezierVertex(131.7,440.5,129.1,438.5,125,437.1);
  canvas.bezierVertex(97.3,428.1,80.5,400.6,85.2,371.8);
  canvas.bezierVertex(86.3,365.1,85.8,364.1,79.9,361.2);
  canvas.bezierVertex(57.2,349.8,46.2,323.3,54.300000000000004,299.7);
  canvas.bezierVertex(54.7,298.59999999999997,55.1,297.7,55.50000000000001,296.9);
  canvas.bezierVertex(55.60000000000001,296.59999999999997,55.800000000000004,296.4,55.900000000000006,296.09999999999997);
  canvas.vertex(57.900000000000006,291.49999999999994);
  canvas.vertex(62.50000000000001,293.59999999999997);
  canvas.bezierVertex(64.9,294.7,67.30000000000001,295.79999999999995,69.5,296.9);
  canvas.bezierVertex(74.5,299.29999999999995,79.1,301.59999999999997,83.9,303.09999999999997);
  canvas.bezierVertex(89.80000000000001,304.9,96.5,305.49999999999994,102.7,305.9);
  canvas.bezierVertex(102.8,305.9,102.9,305.9,103,305.9);
  canvas.bezierVertex(106.6,305.9,108.9,302.79999999999995,109,299.79999999999995);
  canvas.bezierVertex(109.1,296.19999999999993,106.6,293.4,102.7,292.79999999999995);
  canvas.bezierVertex(101.3,292.59999999999997,99.9,292.4,98.4,292.29999999999995);
  canvas.bezierVertex(94.30000000000001,291.79999999999995,90.10000000000001,291.29999999999995,86,289.9);
  canvas.bezierVertex(68.9,284,56.5,270.2,52.7,252.79999999999998);
  canvas.bezierVertex(48.900000000000006,235.49999999999997,54.5,217.7,67.60000000000001,205.29999999999998);
  canvas.bezierVertex(71.9,201.29999999999998,72.7,198.1,70.80000000000001,192.39999999999998);
  canvas.bezierVertex(64.20000000000002,172.2,68.80000000000001,153.99999999999997,84.20000000000002,139.59999999999997);
  canvas.bezierVertex(94.20000000000002,130.19999999999996,105.50000000000001,125.39999999999996,117.80000000000001,125.39999999999996);
  canvas.bezierVertex(124.30000000000001,125.39999999999996,131.10000000000002,126.79999999999997,137.8,129.59999999999997);
  canvas.bezierVertex(157,137.39999999999998,167.9,152.79999999999995,169.4,173.99999999999997);
  canvas.vertex(169.4,174.39999999999998);
  canvas.bezierVertex(169.5,175.89999999999998,169.6,177.2,169.9,178.29999999999998);
  canvas.bezierVertex(170.70000000000002,181.2,173.20000000000002,183.2,176.1,183.2);
  canvas.bezierVertex(176.29999999999998,183.2,176.5,183.2,176.7,183.2);
  canvas.bezierVertex(180.1,182.89999999999998,182.6,180.29999999999998,182.7,177);
  canvas.bezierVertex(183.1,162,178.29999999999998,148.2,168.39999999999998,136.1);
  canvas.bezierVertex(158.2,123.5,144.89999999999998,115.8,128.79999999999998,113.19999999999999);
  canvas.bezierVertex(123.49999999999999,112.29999999999998,120.39999999999998,109.79999999999998,118.89999999999998,104.99999999999999);
  canvas.bezierVertex(113.89999999999998,89.69999999999999,120.69999999999997,72.29999999999998,134.89999999999998,64.49999999999999);
  canvas.bezierVertex(139.99999999999997,61.69999999999999,145.79999999999998,60.19999999999999,151.7,60.19999999999999);
  canvas.bezierVertex(162.2,60.19999999999999,171.89999999999998,64.79999999999998,178.1,72.69999999999999);
  canvas.bezierVertex(179.6,74.6,180.79999999999998,76.6,181.9,78.49999999999999);
  canvas.vertex(182.20000000000002,79.09999999999998);
  canvas.bezierVertex(183.20000000000002,80.69999999999997,185.20000000000002,83.29999999999998,188.4,83.29999999999998);
  canvas.bezierVertex(189.5,83.29999999999998,190.6,82.99999999999999,191.70000000000002,82.39999999999998);
  canvas.bezierVertex(195.10000000000002,80.59999999999998,196.00000000000003,76.99999999999997,194.00000000000003,72.79999999999998);
  canvas.bezierVertex(190.10000000000002,64.79999999999998,184.10000000000002,58.499999999999986,175.60000000000002,53.29999999999998);
  canvas.bezierVertex(174.60000000000002,52.69999999999998,173.70000000000002,52.09999999999998,172.50000000000003,51.499999999999986);
  canvas.vertex(170.50000000000003,50.29999999999998);
  canvas.vertex(163.00000000000003,45.899999999999984);
  canvas.vertex(170.50000000000003,41.59999999999999);
  canvas.bezierVertex(182.00000000000003,34.999999999999986,193.10000000000002,30.799999999999986,204.40000000000003,28.599999999999987);
  canvas.bezierVertex(208.60000000000002,27.799999999999986,212.90000000000003,27.399999999999988,217.20000000000005,27.399999999999988);
  canvas.bezierVertex(217.60000000000005,27.399999999999988,217.90000000000003,27.399999999999988,218.30000000000004,27.399999999999988);
  canvas.bezierVertex(231.40000000000003,27.599999999999987,242.70000000000005,38.19999999999999,243.00000000000003,50.59999999999999);
  canvas.bezierVertex(243.40000000000003,64.89999999999999,243.30000000000004,78.99999999999999,243.20000000000002,93.79999999999998);
  canvas.bezierVertex(243.20000000000002,99.79999999999998,243.10000000000002,105.89999999999998,243.10000000000002,112.09999999999998);
  canvas.vertex(243.10000000000002,119.19999999999997);
  canvas.vertex(236.40000000000003,116.79999999999997);
  canvas.bezierVertex(235.70000000000005,116.49999999999997,235.00000000000003,116.29999999999997,234.40000000000003,115.99999999999997);
  canvas.bezierVertex(233.40000000000003,115.59999999999997,232.60000000000002,115.29999999999997,232.00000000000003,115.19999999999997);
  canvas.bezierVertex(230.60000000000002,114.89999999999998,229.20000000000002,114.59999999999998,227.80000000000004,114.29999999999997);
  canvas.bezierVertex(223.80000000000004,113.49999999999997,220.10000000000005,112.69999999999997,216.40000000000003,112.49999999999997);
  canvas.vertex(216.20000000000005,112.49999999999997);
  canvas.bezierVertex(212.50000000000006,112.49999999999997,210.70000000000005,115.59999999999997,210.60000000000005,118.59999999999997);
  canvas.bezierVertex(210.40000000000006,122.39999999999996,212.70000000000005,125.09999999999997,216.40000000000006,125.39999999999996);
  canvas.bezierVertex(230.10000000000005,126.39999999999996,238.90000000000006,133.09999999999997,242.30000000000007,145.19999999999996);
  canvas.bezierVertex(243.20000000000007,148.39999999999995,243.20000000000007,151.59999999999997,243.20000000000007,154.49999999999997);
  canvas.vertex(243.20000000000007,155.09999999999997);
  canvas.bezierVertex(243.20000000000007,254.19999999999996,243.20000000000007,330,243.20000000000007,400.59999999999997);
  canvas.bezierVertex(243.20000000000007,401.99999999999994,243.20000000000007,403.4,243.20000000000007,404.9);
  canvas.bezierVertex(243.30000000000007,411.09999999999997,243.30000000000007,417.59999999999997,242.30000000000007,423.9);
  canvas.bezierVertex(238.10000000000008,449.2,219.60000000000008,467.79999999999995,194.00000000000006,472.5);
  canvas.bezierVertex(190.9,472.9,187.6,473.2,184.3,473.2);
  canvas.endShape();
  
  canvas.beginShape();
  canvas.vertex(315.8,473.1);
  canvas.bezierVertex(309.3,473.1,302.8,472,296.5,469.90000000000003);
  canvas.bezierVertex(270.4,461.00000000000006,253.8,434.90000000000003,257.1,407.90000000000003);
  canvas.bezierVertex(260,384.00000000000006,273.8,366.8,297,358.3);
  canvas.bezierVertex(297.7,358.1,298.3,357.8,299,357.6);
  canvas.bezierVertex(299.8,357.3,300.6,357.1,301.2,356.8);
  canvas.bezierVertex(304.3,355.40000000000003,306,351.8,304.9,348.7);
  canvas.bezierVertex(304,345.9,301.7,344.2,299,344.2);
  canvas.bezierVertex(298.6,344.2,298.1,344.2,297.6,344.3);
  canvas.bezierVertex(288.1,346.3,279,350.90000000000003,269.70000000000005,358.3);
  canvas.bezierVertex(268.90000000000003,358.90000000000003,268.1,359.6,267.20000000000005,360.40000000000003);
  canvas.vertex(265.50000000000006,361.8);
  canvas.vertex(258.50000000000006,367.6);
  canvas.vertex(257.40000000000003,358.6);
  canvas.bezierVertex(257.3,358,257.3,357.5,257.20000000000005,357.1);
  canvas.bezierVertex(257.00000000000006,356,256.90000000000003,354.90000000000003,256.90000000000003,353.70000000000005);
  canvas.bezierVertex(256.90000000000003,334.80000000000007,256.90000000000003,316.00000000000006,256.90000000000003,297.1);
  canvas.bezierVertex(256.90000000000003,260.3,256.90000000000003,222.3,256.8,185.00000000000003);
  canvas.bezierVertex(256.8,170.70000000000002,268.3,158.80000000000004,282.5,158.40000000000003);
  canvas.bezierVertex(284.8,158.30000000000004,286.7,157.60000000000002,287.9,156.20000000000005);
  canvas.bezierVertex(289.09999999999997,154.90000000000003,289.59999999999997,153.20000000000005,289.5,151.30000000000004);
  canvas.bezierVertex(289.3,147.50000000000003,286.7,145.10000000000005,282.7,145.10000000000005);
  canvas.bezierVertex(282.5,145.10000000000005,282.2,145.10000000000005,282,145.10000000000005);
  canvas.bezierVertex(278.8,145.30000000000004,275.5,146.10000000000005,272,146.90000000000006);
  canvas.bezierVertex(270.9,147.20000000000007,269.8,147.40000000000006,268.6,147.70000000000007);
  canvas.bezierVertex(267.90000000000003,147.90000000000006,267,148.20000000000007,265.8,148.70000000000007);
  canvas.bezierVertex(265.1,149.00000000000009,264.40000000000003,149.30000000000007,263.5,149.60000000000008);
  canvas.vertex(256.8,152.00000000000009);
  canvas.vertex(256.8,114.60000000000008);
  canvas.bezierVertex(256.8,95.00000000000009,256.8,75.40000000000008,256.8,55.90000000000008);
  canvas.bezierVertex(256.8,38.00000000000008,267.2,27.300000000000075,284.6,27.300000000000075);
  canvas.bezierVertex(285.3,27.300000000000075,285.90000000000003,27.300000000000075,286.6,27.300000000000075);
  canvas.bezierVertex(299,27.900000000000077,318.70000000000005,34.50000000000008,329.6,41.90000000000008);
  canvas.vertex(336.1,46.300000000000075);
  canvas.vertex(324.40000000000003,53.300000000000075);
  canvas.bezierVertex(316.20000000000005,58.200000000000074,310.20000000000005,64.60000000000008,306.00000000000006,72.90000000000008);
  canvas.bezierVertex(304.20000000000005,76.40000000000008,305.1000000000001,78.50000000000007,306.1000000000001,80.00000000000007);
  canvas.bezierVertex(307.4000000000001,81.90000000000008,309.4000000000001,83.00000000000007,311.6000000000001,83.00000000000007);
  canvas.bezierVertex(313.7000000000001,83.00000000000007,315.7000000000001,81.90000000000008,317.1000000000001,80.10000000000007);
  canvas.bezierVertex(317.4000000000001,79.70000000000006,317.80000000000007,79.00000000000007,318.1000000000001,78.40000000000006);
  canvas.bezierVertex(318.4000000000001,77.90000000000006,318.7000000000001,77.30000000000007,319.00000000000006,76.80000000000007);
  canvas.bezierVertex(325.30000000000007,66.20000000000007,336.30000000000007,59.90000000000007,348.50000000000006,59.90000000000007);
  canvas.bezierVertex(353.20000000000005,59.90000000000007,357.80000000000007,60.80000000000007,362.1000000000001,62.70000000000007);
  canvas.bezierVertex(377.6000000000001,69.30000000000007,386.00000000000006,86.70000000000007,381.7000000000001,103.20000000000007);
  canvas.bezierVertex(380.7000000000001,107.10000000000008,378.5000000000001,111.80000000000007,371.1000000000001,113.10000000000008);
  canvas.bezierVertex(342.7000000000001,118.10000000000008,322.2000000000001,139.10000000000008,317.80000000000007,167.80000000000007);
  canvas.bezierVertex(317.4000000000001,170.30000000000007,317.30000000000007,173.20000000000007,317.4000000000001,176.50000000000006);
  canvas.bezierVertex(317.5000000000001,180.00000000000006,320.1000000000001,182.80000000000007,323.5000000000001,183.00000000000006);
  canvas.bezierVertex(323.60000000000014,183.00000000000006,323.8000000000001,183.00000000000006,323.9000000000001,183.00000000000006);
  canvas.bezierVertex(327.1000000000001,183.00000000000006,329.80000000000007,180.60000000000005,330.30000000000007,177.20000000000005);
  canvas.bezierVertex(330.6000000000001,175.70000000000005,330.70000000000005,174.00000000000006,330.9000000000001,172.30000000000004);
  canvas.bezierVertex(331.1000000000001,169.80000000000004,331.4000000000001,167.30000000000004,332.0000000000001,164.70000000000005);
  canvas.bezierVertex(337.3000000000001,141.90000000000003,357.7000000000001,125.40000000000005,380.7000000000001,125.40000000000005);
  canvas.bezierVertex(382.5000000000001,125.40000000000005,384.3000000000001,125.50000000000004,386.1000000000001,125.70000000000005);
  canvas.bezierVertex(412.80000000000007,128.90000000000003,432.6000000000001,150.90000000000003,432.00000000000006,176.90000000000003);
  canvas.bezierVertex(431.90000000000003,182.30000000000004,430.90000000000003,187.70000000000005,429.1000000000001,192.70000000000005);
  canvas.bezierVertex(427.2000000000001,197.90000000000003,428.00000000000006,201.00000000000006,432.30000000000007,205.00000000000006);
  canvas.bezierVertex(446.80000000000007,218.70000000000005,451.80000000000007,236.00000000000006,446.6000000000001,255.00000000000006);
  canvas.bezierVertex(441.4000000000001,274.00000000000006,428.30000000000007,286.50000000000006,408.7000000000001,291.30000000000007);
  canvas.bezierVertex(406.1000000000001,291.9000000000001,403.6000000000001,292.1000000000001,401.1000000000001,292.30000000000007);
  canvas.bezierVertex(400.00000000000006,292.4000000000001,398.9000000000001,292.50000000000006,397.9000000000001,292.6000000000001);
  canvas.bezierVertex(393.6000000000001,293.1000000000001,390.9000000000001,295.7000000000001,391.0000000000001,299.50000000000006);
  canvas.bezierVertex(391.10000000000014,303.40000000000003,394.0000000000001,305.80000000000007,398.5000000000001,305.80000000000007);
  canvas.bezierVertex(409.9000000000001,305.80000000000007,420.8000000000001,302.6000000000001,431.10000000000014,296.4000000000001);
  canvas.bezierVertex(431.8000000000001,296.0000000000001,432.5000000000001,295.5000000000001,433.20000000000016,295.1000000000001);
  canvas.bezierVertex(433.8000000000002,294.7000000000001,434.50000000000017,294.30000000000007,435.20000000000016,293.9000000000001);
  canvas.bezierVertex(436.00000000000017,293.4000000000001,436.60000000000014,293.2000000000001,437.20000000000016,293.1000000000001);
  canvas.bezierVertex(437.40000000000015,293.00000000000006,437.70000000000016,292.9000000000001,438.10000000000014,292.80000000000007);
  canvas.vertex(442.5000000000001,291.4000000000001);
  canvas.vertex(444.2000000000001,295.7000000000001);
  canvas.bezierVertex(450.9000000000001,312.4000000000001,449.5000000000001,328.4000000000001,440.0000000000001,343.4000000000001);
  canvas.bezierVertex(435.3000000000001,350.80000000000007,428.7000000000001,356.7000000000001,420.2000000000001,361.1000000000001);
  canvas.bezierVertex(414.3000000000001,364.1000000000001,413.7000000000001,365.2000000000001,414.8000000000001,371.7000000000001);
  canvas.bezierVertex(419.5000000000001,400.2000000000001,403.0000000000001,427.6000000000001,375.60000000000014,436.9000000000001);
  canvas.bezierVertex(371.0000000000001,438.5000000000001,368.3000000000001,440.7000000000001,365.8000000000001,444.7000000000001);
  canvas.bezierVertex(355.2,462.5,336.4,473.1,315.8,473.1);
  canvas.bezierVertex(315.8,473.1,315.8,473.1,315.8,473.1);
  canvas.endShape();
  
  setNoEraseMode(canvas);
  
  canvas.fill(patternColor)
  canvas.beginShape();
  canvas.vertex(120.2,279.9);
  canvas.bezierVertex(117.9,279.9,112.4,279.29999999999995,112.2,273.59999999999997);
  canvas.bezierVertex(112,267.7,117.4,266.7,119.7,266.59999999999997);
  canvas.bezierVertex(133.1,265.79999999999995,143.1,259.49999999999994,149.3,247.89999999999998);
  canvas.bezierVertex(149.60000000000002,247.29999999999998,150.10000000000002,246.39999999999998,150.3,245.39999999999998);
  canvas.bezierVertex(150.60000000000002,244.29999999999998,150.5,243.29999999999998,150.5,242.7);
  canvas.bezierVertex(150.5,242.6,150.5,242.5,150.5,242.29999999999998);
  canvas.vertex(150.3,238.79999999999998);
  canvas.vertex(141.10000000000002,235.99999999999997);
  canvas.bezierVertex(114.60000000000002,227.79999999999998,95.60000000000002,202.49999999999997,95.90000000000002,175.79999999999995);
  canvas.bezierVertex(95.90000000000002,173.99999999999994,96.40000000000002,168.19999999999996,102.20000000000002,168.19999999999996);
  canvas.bezierVertex(102.60000000000002,168.19999999999996,103.00000000000001,168.19999999999996,103.40000000000002,168.29999999999995);
  canvas.bezierVertex(104.80000000000003,168.49999999999994,108.20000000000002,168.89999999999995,109.20000000000002,175.59999999999997);
  canvas.bezierVertex(109.30000000000001,176.59999999999997,109.50000000000001,177.59999999999997,109.60000000000002,178.49999999999997);
  canvas.bezierVertex(110.40000000000002,184.19999999999996,111.30000000000003,189.99999999999997,113.70000000000002,195.49999999999997);
  canvas.bezierVertex(121.90000000000002,213.99999999999997,139.50000000000003,225.49999999999997,159.70000000000002,225.49999999999997);
  canvas.bezierVertex(172.10000000000002,225.49999999999997,184.10000000000002,220.89999999999998,193.5,212.59999999999997);
  canvas.bezierVertex(194,212.19999999999996,194.4,211.79999999999995,194.8,211.39999999999998);
  canvas.bezierVertex(195.10000000000002,211.09999999999997,195.5,210.79999999999998,195.8,210.39999999999998);
  canvas.bezierVertex(197.4,208.99999999999997,199.20000000000002,208.2,200.9,208.2);
  canvas.bezierVertex(202.5,208.2,204,208.89999999999998,205.3,210.1);
  canvas.bezierVertex(208,212.9,207.9,216.9,205,219.9);
  canvas.bezierVertex(196.5,228.6,186.3,234.3,174.7,236.8);
  canvas.bezierVertex(168.79999999999998,238.10000000000002,165.6,241,163.89999999999998,246.70000000000002);
  canvas.bezierVertex(158.3,265.9,139.9,279.7,120.2,279.9);
  canvas.vertex(120.2,279.9);
  canvas.endShape();
  
  canvas.beginShape();
  canvas.vertex(187.2,427.5);
  canvas.bezierVertex(183.79999999999998,427.5,181.29999999999998,425.3,180.79999999999998,422);
  canvas.bezierVertex(180.6,420.8,180.49999999999997,419.5,180.39999999999998,418.1);
  canvas.bezierVertex(180.29999999999998,417,180.2,415.8,180.09999999999997,414.70000000000005);
  canvas.bezierVertex(177.19999999999996,390.50000000000006,156.69999999999996,371.30000000000007,132.39999999999998,370.20000000000005);
  canvas.bezierVertex(131.99999999999997,370.20000000000005,131.49999999999997,370.20000000000005,131.09999999999997,370.20000000000005);
  canvas.bezierVertex(130.69999999999996,370.20000000000005,130.29999999999995,370.20000000000005,129.79999999999995,370.20000000000005);
  canvas.bezierVertex(125.99999999999996,369.90000000000003,123.19999999999996,367.20000000000005,123.09999999999995,363.6);
  canvas.bezierVertex(122.99999999999996,360.20000000000005,125.79999999999995,357.3,129.59999999999997,356.90000000000003);
  canvas.bezierVertex(130.49999999999997,356.8,131.49999999999997,356.8,132.59999999999997,356.70000000000005);
  canvas.bezierVertex(133.19999999999996,356.70000000000005,133.79999999999995,356.70000000000005,134.39999999999998,356.6);
  canvas.vertex(138.29999999999998,356.40000000000003);
  canvas.vertex(139.1,352.6);
  canvas.bezierVertex(139.5,350.70000000000005,139.79999999999998,348.90000000000003,140.2,347);
  canvas.bezierVertex(140.89999999999998,343.4,141.5,340,142.39999999999998,336.8);
  canvas.bezierVertex(150.09999999999997,310.7,174.39999999999998,292,201.39999999999998,291.3);
  canvas.vertex(201.59999999999997,291.3);
  canvas.bezierVertex(203.69999999999996,291.3,206.29999999999995,292,208.29999999999995,293.2);
  canvas.bezierVertex(210.49999999999994,294.5,210.69999999999996,297.5,209.99999999999994,299.8);
  canvas.bezierVertex(209.49999999999994,301.5,208.19999999999993,303.90000000000003,203.29999999999995,304.7);
  canvas.bezierVertex(202.19999999999996,304.9,200.99999999999994,305,199.79999999999995,305.2);
  canvas.bezierVertex(194.49999999999994,305.9,188.99999999999994,306.59999999999997,183.79999999999995,308.9);
  canvas.bezierVertex(165.49999999999994,316.79999999999995,155.19999999999996,331.29999999999995,152.99999999999994,352);
  canvas.bezierVertex(152.39999999999995,357.8,154.49999999999994,361.7,159.69999999999993,364.5);
  canvas.bezierVertex(178.19999999999993,374.4,189.39999999999992,390,193.09999999999994,410.9);
  canvas.bezierVertex(193.69999999999993,414.29999999999995,193.89999999999995,418,193.59999999999994,422);
  canvas.bezierVertex(193.39999999999995,425.2,190.89999999999995,427.5,187.39999999999995,427.5);
  canvas.vertex(187.2,427.5);
  canvas.endShape();
  
  canvas.beginShape();
  canvas.vertex(364.3,281.1);
  canvas.bezierVertex(346.3,280.6,332.90000000000003,272.8,323.5,257);
  canvas.bezierVertex(321.6,253.9,320.4,250.2,319.2,246.7);
  canvas.bezierVertex(317.7,242.2,315,239.79999999999998,310.5,238.79999999999998);
  canvas.bezierVertex(298.5,236.29999999999998,288,230.7,279.4,222.1);
  canvas.bezierVertex(276.7,219.4,274.9,215.29999999999998,278,211.9);
  canvas.bezierVertex(279.4,210.3,281,209.6,282.6,209.6);
  canvas.bezierVertex(284.40000000000003,209.6,286.40000000000003,210.6,288.3,212.5);
  canvas.bezierVertex(297.8,221.8,310.40000000000003,226.9,323.90000000000003,226.9);
  canvas.bezierVertex(340.20000000000005,226.9,355.1,219.3,364.8,206.20000000000002);
  canvas.bezierVertex(371,197.8,374.2,188.50000000000003,374.5,178.50000000000003);
  canvas.vertex(374.5,177.90000000000003);
  canvas.bezierVertex(374.5,177.00000000000003,374.5,176.10000000000002,374.7,175.40000000000003);
  canvas.bezierVertex(375.3,171.80000000000004,377.9,169.50000000000003,381.3,169.50000000000003);
  canvas.bezierVertex(381.40000000000003,169.50000000000003,381.5,169.50000000000003,381.7,169.50000000000003);
  canvas.bezierVertex(385.4,169.70000000000002,388,172.40000000000003,388,176.10000000000002);
  canvas.bezierVertex(388.1,190.70000000000002,383.4,204.00000000000003,374.2,215.8);
  canvas.bezierVertex(365.8,226.5,354.7,233.9,341.2,237.9);
  canvas.bezierVertex(340,238.3,338.7,238.6,337.3,239.1);
  canvas.bezierVertex(335.90000000000003,239.6,335.1,240.4,334.7,240.9);
  canvas.bezierVertex(334.59999999999997,241,334.5,241.1,334.4,241.20000000000002);
  canvas.vertex(331.79999999999995,243.60000000000002);
  canvas.vertex(333.19999999999993,246.8);
  canvas.bezierVertex(338.19999999999993,258,346.79999999999995,264.90000000000003,358.69999999999993,267.3);
  canvas.bezierVertex(360.19999999999993,267.6,361.5999999999999,267.7,362.99999999999994,267.90000000000003);
  canvas.bezierVertex(363.59999999999997,268.00000000000006,364.29999999999995,268.00000000000006,364.8999999999999,268.1);
  canvas.bezierVertex(369.0999999999999,268.6,371.7999999999999,271.40000000000003,371.49999999999994,275);
  canvas.bezierVertex(371.19999999999993,278.6,368.29999999999995,281.2,364.3999999999999,281.2);
  canvas.vertex(364.3,281.1);
  canvas.endShape();
  
  canvas.beginShape();
  canvas.vertex(323.9,437);
  canvas.bezierVertex(323.7,437,323.5,437,323.29999999999995,437);
  canvas.bezierVertex(319.59999999999997,436.7,317.29999999999995,434.1,317.4,430.2);
  canvas.bezierVertex(317.9,406.09999999999997,328.29999999999995,388,349.5,375);
  canvas.bezierVertex(350.7,374.2,352,373.5,353.4,372.8);
  canvas.bezierVertex(354.09999999999997,372.40000000000003,354.7,372.1,355.29999999999995,371.7);
  canvas.vertex(357.49999999999994,370.5);
  canvas.vertex(357.79999999999995,368);
  canvas.bezierVertex(360.4,346.6,345.19999999999993,323.7,323.9,317);
  canvas.bezierVertex(319.09999999999997,315.5,314.09999999999997,314.9,309.29999999999995,314.4);
  canvas.vertex(308.19999999999993,314.29999999999995);
  canvas.bezierVertex(305.99999999999994,314.09999999999997,300.79999999999995,312.9,300.8999999999999,307.29999999999995);
  canvas.bezierVertex(300.99999999999994,303.49999999999994,303.8999999999999,300.9,308.0999999999999,300.9);
  canvas.vertex(308.2999999999999,300.9);
  canvas.bezierVertex(327.0999999999999,301.29999999999995,343.0999999999999,308.7,355.6999999999999,322.9);
  canvas.bezierVertex(364.2999999999999,332.5,369.39999999999986,344.09999999999997,370.9999999999999,357.29999999999995);
  canvas.bezierVertex(371.0999999999999,358.4,371.2999999999999,359.4,371.4999999999999,360.49999999999994);
  canvas.bezierVertex(371.5999999999999,360.99999999999994,371.6999999999999,361.49999999999994,371.7999999999999,361.99999999999994);
  canvas.vertex(372.4999999999999,365.8999999999999);
  canvas.vertex(377.89999999999986,366.19999999999993);
  canvas.bezierVertex(378.79999999999984,366.29999999999995,379.6999999999999,366.29999999999995,380.59999999999985,366.3999999999999);
  canvas.bezierVertex(385.09999999999985,366.69999999999993,387.89999999999986,369.3999999999999,387.79999999999984,373.2999999999999);
  canvas.bezierVertex(387.6999999999998,377.0999999999999,384.99999999999983,379.5999999999999,380.79999999999984,379.7999999999999);
  canvas.bezierVertex(369.79999999999984,380.1999999999999,359.99999999999983,383.2999999999999,351.89999999999986,389.2999999999999);
  canvas.bezierVertex(338.79999999999984,398.7999999999999,331.6999999999999,411.6999999999999,330.6999999999999,427.4999999999999);
  canvas.vertex(330.6999999999999,428.2999999999999);
  canvas.bezierVertex(330.59999999999985,429.1999999999999,330.59999999999985,430.0999999999999,330.4999999999999,430.7999999999999);
  canvas.bezierVertex(330,434.7,327.5,437,323.9,437);
  canvas.endShape();
}