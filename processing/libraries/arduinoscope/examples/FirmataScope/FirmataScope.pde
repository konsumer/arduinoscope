import controlP5.*;
import processing.serial.*;
import cc.arduino.*;
import arduinoscope.*;

Arduino arduino;
ControlP5 cp5;
Oscilloscope[] scopes = new Oscilloscope[6];
float multiplier;

void setup(){
  size(800, 800);
  ControlP5 cp5 = new ControlP5(this);
  frame.setTitle("Arduinoscope");
  
  // COM dropdown
  DropdownList com = cp5.addDropdownList("com")
    .setPosition(110, 20)
    .setSize(200,200);
  String[] arduinos = arduino.list();
  for (int i=0; i<arduinos.length; i++) {
    com.addItem(arduinos[i], i);
  }
  
  int[] dim = { width-130, height/scopes.length};
  
  for (int i=0;i<scopes.length;i++){
    int[] posv = new int[2];
    posv[0]=0;
    posv[1]=dim[1]*i;

    // random color, that will look nice and be visible
    scopes[i] = new Oscilloscope(this, posv, dim);
    scopes[i].setLine_color(color((int)random(255), (int)random(127)+127, 255));
    
    cp5.addButton("pause" + i)
      .setLabel("pause")
      .setValue(i)
      .setPosition(dim[0]+10,posv[1] + 85)
      .updateSize();
     
    scopes[i].setPause(false);
  }
  
  // multiplier comes from 1st scope
  multiplier = scopes[0].getMultiplier()/scopes[0].getResolution();
  
}

void draw(){
  background(0);
  text("arduinoscope", 20, 20);
  
  int val;
  int[] dim;
  int[] pos;
  
  for (int i=0;i<scopes.length;i++){
    dim = scopes[i].getDim();
    pos = scopes[i].getPos();
    scopes[i].drawBounds();
    stroke(255);
    line(0, pos[1], width, pos[1]);
    if (arduino != null){
      val = arduino.analogRead(i);
      scopes[i].addData(val);
      scopes[i].draw();
      text("analog " + i, dim[0]+10, pos[1] + 30);
      text("val: " + (val*multiplier) + "V", dim[0]+10, pos[1] + 45);
      text("min: " + (scopes[i].getMinval()*multiplier) + "V", dim[0]+10, pos[1] + 60);
      text("max: " + (scopes[i].getMaxval()*multiplier) + "V", dim[0]+10, pos[1] + 75);
    }
  }
}


void controlEvent(ControlEvent theEvent) {
  int val = int(theEvent.getValue());
  
  if (theEvent.getName() == "com"){
    arduino = new Arduino(this, Arduino.list()[val], 57600);
  }else{    
    scopes[val].setPause(!scopes[val].isPause());
  }
}
