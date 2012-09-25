/*
  This is an Oscilloscope library for Processing
  
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

package arduinoscope;


import processing.core.PApplet;
import processing.core.PConstants;

/**
 * this is a template class and can be used to start a new processing library.
 * make sure you rename this class as well as the name of the package template
 * this class belongs to.
 * 
 * @example ArduinoScope
 * @author David Konsumer
 * 
 */
public class Oscilloscope implements PConstants {

	PApplet myParent;
	public final String VERSION = "0.1.0";
	
	private int[] pos = new int[2]; // x, y start position
	private int[] dim = new int[2]; // w, h dimensions
	private int line_color; // color for lines
	private int bounds_color; // color for center line
	private int[] logic_colors = new int[2]; // size 2 color array for 0/1, red/green by default
	  
	private int[] values; // all values in the graph
	private float resolution; // max number that be displayed
	private float multiplier; // the voltage multiplier
	  
	private int minval;
	private int maxval;
	private boolean logic; // use colors to show 0/1?
	private boolean pause; // freeze input?
	
	public int[] getPos() {
		return pos;
	}

	public void setPos(int[] pos) {
		this.pos = pos;
	}

	public int[] getDim() {
		return dim;
	}

	public void setDim(int[] dim) {
		this.dim = dim;
		values = new int[dim[0]];
	}

	public int getLine_color() {
		return line_color;
	}

	public void setLine_color(int lineColor) {
		line_color = lineColor;
	}

	public int getBounds_color() {
		return bounds_color;
	}

	public void setBounds_color(int boundsColor) {
		bounds_color = boundsColor;
	}

	public int[] getLogic_colors() {
		return logic_colors;
	}

	public void setLogic_colors(int[] logicColors) {
		logic_colors = logicColors;
	}

	public int[] getValues() {
		return values;
	}

	public void setValues(int[] values) {
		this.values = values;
	}

	public float getResolution() {
		return resolution;
	}

	public void setResolution(float resolution) {
		this.resolution = resolution;
	}

	public float getMultiplier() {
		return multiplier;
	}

	public void setMultiplier(float multiplier) {
		this.multiplier = multiplier;
	}

	public int getMinval() {
		return minval;
	}

	public void setMinval(int minval) {
		this.minval = minval;
	}

	public int getMaxval() {
		return maxval;
	}

	public void setMaxval(int maxval) {
		this.maxval = maxval;
	}

	public boolean isLogicMode() {
		return logic;
	}

	public void setLogicMode(boolean logic) {
		this.logic = logic;
	}

	public boolean isPause() {
		return pause;
	}

	public void setPause(boolean pause) {
		this.pause = pause;
	}


	
	
	/**
	 * a Constructor, usually called in the setup() method in your sketch to
	 * initialize and start the library.
	 * 
	 * @example Oscilloscope
	 * @param theParent
	 */
	public Oscilloscope(PApplet theParent, int[] posv, int[] dimv) {
		myParent = theParent;
		
		// set some defaults
		bounds_color = myParent.color(30);
		resolution = 1024.0f;
		multiplier = 5f;
		logic = false;
		pause = false;

		pos = posv;
	    dim = dimv;
		line_color = myParent.color(255,255,255);
		
		logic_colors[0] = myParent.color(255,0,0);
		logic_colors[1] = myParent.color(0,255,0);
		
	    minval = (int)resolution;
	    
	    values = new int[dim[0]];	    
	}

	/**
	 * return the version of the library.
	 * 
	 * @return String
	 */
	public String version() {
		return VERSION;
	}
	
	public void draw(){		
		if (!logic){
			myParent.stroke(line_color);
	    }
		
		for (int x=1; x<dim[0]; x++) {
			if (logic){
	    		if (values[x] > (resolution/2)){
	    			myParent.stroke(logic_colors[1]);
	    		}else{
	    			myParent.stroke(logic_colors[0]);
	    		}
	    		myParent.line(pos[0] + dim[0]-x-2,   pos[1], pos[0] + dim[0]-x-2, pos[1] + dim[1]);
	      }else{
	    	  myParent.line(pos[0] + dim[0]-x, pos[1] + dim[1]-getY(values[x-1])-1, pos[0] + dim[0]-x, pos[1] + dim[1]-getY(values[x])-1);
	      }

	    }
	}

	  // draw center line
	  public void drawBounds(){
		  myParent.stroke(bounds_color);
		  myParent.line(pos[0],pos[1]+(dim[1]/2), dim[0], pos[1]+(dim[1]/2));
	  }
	
	// add a single point
	  public void addData(int val){
	    if (!pause){
	      for (int i=0; i<dim[0]-1; i++){
	        values[i] = values[i+1];
	      }
	      values[dim[0]-1] = val;
	      if (val < minval){
	        minval = val;
	      }
	      if (val > maxval){
	        maxval=val;
	      }
	    }
	  }
	
	// save current frame
	public void saveData(String filename){
	    String[] lines = new String[values.length];
	    for (int i = 0; i < values.length; i++) {
	    	lines[i] = "" + values[i];
	    }
	    myParent.saveStrings(filename, lines);
    }
	
	private int getY(int val){
		return (int)(val / resolution * dim[1]) - 1;
	}
	
	
}
