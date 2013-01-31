# Arduinoscope

This is the current version of my Arduino-powered, low-resolution, multi-channel oscilliscope. I made 2 frontends, that both speak [firmata](http://firmata.org), so you will need to install the Firmata firmware on your Arduino (in Arduino IDE: File -> Open -> Examples > Library-Firmata > StandardFirmata.)

It used to run over a simple serial protocol, but I have decided to standardize on Firmata, so I can keep the pin-reading code in the client, and make installation more standardized.

The basic idea with both front-ends is to connect your Arduino running Firmata, and start the front-end.

## Standalone

If you don't care about developing the front-end, or don't want to install any dependencies, or do anything other than just have a working oscilliscope, choose the correct "standalone" zip file for your plaform:

*  [Linux 32-bit](http://konsumer.github.com/arduinoscope/downloads/application.linux32.zip)
*  [Linux 64-bit](http://konsumer.github.com/arduinoscope/downloads/application.linux64.zip)
*  [Mac Universal](http://konsumer.github.com/arduinoscope/downloads/application.macosx.zip)
*  [Windows 32-bit](http://konsumer.github.com/arduinoscope/downloads/application.windows32.zip)


## Processing

This is a up-to-date port of my original oscilliscope. It is also the current source for the stand-alone apps.

If you want to modify the processing front-end, see [instructions](https://github.com/konsumer/arduinoscope/tree/master/processing).


## Node

This is my new and favorite GUI for the arduino.  You will need to install [node.js & npm](http://nodejs.org/download/) and follow the [instructions](https://github.com/konsumer/arduinoscope/tree/master/web) for that frontend.

It is currently using socket.io, but eventually I will be using node-webkit for this.
