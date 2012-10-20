/*
  This is a Firmata-based arduinoscope for processing.

  (c) 2012 David Konsumer <david.konsumer@gmail.com>

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

For this to work, you need to install Firmata on your arduino:
in arduino IDE: File -> Open -> Examples > Library-Firmata > StandardFirmata

You also need to install the Processing firmata library:
http://www.arduino.cc/playground/Interfacing/Processing

*/
import arduinoscope.*;
import processing.serial.*;
import cc.arduino.*;

PFont fontLarge;
PFont fontSmall;
Oscilloscope[] scopes = new Oscilloscope[6];
Arduino arduino;
int[] dim;
float multiplier;
float minval;
float maxval;
float pinval;

void setup(){
  size(800, 800, P2D);
  arduino = new Arduino(this, Arduino.list()[0], 115200);

  // set these up under tools/create font, if they are not setup.
  fontLarge = loadFont("TrebuchetMS-20.vlw");
  fontSmall = loadFont("Uni0554-8.vlw");

  dim[0] = width-130; // 130 margin for text
  dim[1] = height/scopes.length;

  for (int i=0;i<scopes.length;i++){
    arduino.pinMode(i, Arduino.INPUT);
    int[] posv = new int[2];
    posv[0]=0;
    posv[1]=dim[1]*i;

    // random color, that will look nice and be visible
    scopes[i] = new Oscilloscope(this, posv, dim);
    scopes[i].setLine_color(color((int)random(255), (int)random(127)+127, 255));
  }

  // get info from 1st scope
  multiplier = scopes[0].getMultiplier()/scopes[0].getResolution();

  //TODO: add buttons to array for draw() & mousePressed()
}

void draw()
{
  background(0);

  // draw text seperator, based on first scope
  stroke(255);
  line(dim[0], 0, dim[0], height);

  for (int i=0;i<scopes.length;i++){
    // update and draw scopes

    pinval = arduino.analogRead(i);

    scopes[i].addData(int(pinval));
    scopes[i].draw();

    // convert arduino vals to voltage
    pinval =  pinval * multiplier;
    minval = scopes[i].getMinval() * multiplier;
    maxval = scopes[i].getMaxval() * multiplier;

    // add lines
    scopes[i].drawBounds();
    stroke(255);

    int[] pos = scopes[i].getPos();

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
}

// handle button clicked
void mousePressed() {
}

