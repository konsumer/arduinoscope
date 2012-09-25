# Arduinoscope

This is the current version of my Arduino-powered low-resolution, multi-channel oscilliscope. I made 2 frontends, that both speak [firmata](http://firmata.org), so you will need to install the Firmata firmware on your arduino (in arduino IDE: File -> Open -> Examples > Library-Firmata > StandardFirmata.)

It used to run over a simple serial protocol, but I have decided to standardize on firmata, so I can keep the pin-reading code in the client, and make installation more standardized.

## Standalone

If you don't care about developing the front-end, or don't want to install any dependencies, or do anything other than just have a working oscilliscope, choose the correct "standalone" zip file for your plaform from the [downloads](https://github.com/konsumer/arduinoscope/downloads) section.


## Processing

This is a up-to-date port of my original oscilliscope. It is also the source for the stand-alone apps.

If you want to modify the processing front-end, see [instructions](https://github.com/konsumer/arduinoscope/tree/master/processing).


## Node/web

This is my new and fovorite GUI for the arduino.  You will need to install [node.js & npm](http://nodejs.org/download/) and follow the [instructions](https://github.com/konsumer/arduinoscope/tree/master/web) for that frontend.

If I can figure out a good way to make a stand-alone no install version of this, I will migrate the stand-alone apps to this front-end.
