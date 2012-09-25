/*
  This is a basic serial arduinoscope.
  
  (c) 2009 David Konsumer <david.konsumer@gmail.com>
  
  This library is free software; you can redistribute it and/or
  modify it under the terms of the GNU Lesser General Public
  License as published by the Free Software Foundation; either
  version 2.1 of the License, or (at your option) any later version.

  This library is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  Lesser General Public License for more details.

  You should have received a copy of the GNU Lesser General
  Public License along with this library; if not, write to the
  Free Software Foundation, Inc., 59 Temple Place, Suite 330,
  Boston, MA  02111-1307  USA
 */

/*

Serial data comes in, in the format

1 23 34 4 5 76
1 23 34 4 5 76
1 23 34 4 5 76
1 23 34 4 5 76

(space seperates pin=data, LF-seperated frame data)

*/

import arduinoscope.*;
import processing.serial.*;

int LINE_FEED=10;
PFont fontLarge;
PFont fontSmall;
Oscilloscope[] scopes = new Oscilloscope[6];
Serial port;
int[] vals;

void setup(){
  size(800, 800, P2D);
  
  // set these up under tools/create font, if they are not setup.
  fontLarge = loadFont("TrebuchetMS-20.vlw");
  fontSmall = loadFont("Uni0554-8.vlw");
  
  int[] dimv = new int[2];
  dimv[0] = width-130; // 130 margin for text
  dimv[1] = height/scopes.length;
  
  for (int i=0;i<scopes.length;i++){
    int[] posv = new int[2];
    posv[0]=0;
    posv[1]=dimv[1]*i;

    // random color, that will look nice and be visible
    scopes[i] = new Oscilloscope(this, posv, dimv);
    scopes[i].setLine_color(color((int)random(255), (int)random(127)+127, 255));
  }
  
  // this holds teh values that show in scopes.
  vals = new int[scopes.length];
  
  // setup serial
  port = new Serial(this, Serial.list()[0], 115200);
  port.clear();
  port.bufferUntil(LINE_FEED);
}

void draw()
{
  background(0);
  
  for (int i=0;i<scopes.length;i++){
    // update and draw scopes
    
    scopes[i].addData(vals[i]);
    scopes[i].draw();
    
    // conversion multiplier for voltage
    float multiplier = scopes[i].getMultiplier()/scopes[i].getResolution();
    
    // convert arduino vals to voltage
    float minval = scopes[i].getMinval() * multiplier;
    float maxval = scopes[i].getMaxval() * multiplier;
    int[] values = scopes[i].getValues(); 
    float pinval =  values[values.length-1] * multiplier;
    
    // add lines
    scopes[i].drawBounds();
    stroke(255);
    
    int[] pos = scopes[i].getPos();
    int[] dim = scopes[i].getDim();
    
    line(0, pos[1], width, pos[1]);
    
    // add labels
    fill(255);
    textFont(fontLarge);
    text(pinval, width-60, pos[1] + dim[1] - 10);
    
    textFont(fontSmall);
    text("min: " + minval, dim[0] + 10, pos[1] + 40);
    text("max: " + maxval, dim[0] + 10, pos[1] + 48);
    
    fill(scopes[i].getLine_color());
    text("pin: " + i, dim[0] + 10,pos[1] + dim[1] - 10);
  }
  
  // draw text seperator, based on first scope
  int[] dim = scopes[0].getDim();
  stroke(255);
  line(dim[0], 0, dim[0], height);
  
}

// handle serial data
void serialEvent(Serial p) { 
  String data = p.readStringUntil(LINE_FEED);
  if (data != null) {
    vals = int(split(data, ' '));
  }
}

// handle button clicked
void mousePressed() {
  print(mouseX);
  print ("x");
  print(mouseY);
  print ("\n");
}

