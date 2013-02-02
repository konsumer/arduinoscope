## Node

This is the [node-webkit](https://github.com/rogerwang/node-webkit) version of Arduinoscope.

It's pretty basic, and just a proof-of-concept, for now. It doesn't make actual scopes, just text-inputs with current analog value.

## Binaries

*  [Mac 32bit](http://konsumer.github.com/arduinoscope/downloads/arduinoscope-mac32.nw)
*  [Windows 32bit](http://konsumer.github.com/arduinoscope/downloads/arduinoscope-windows32.nw) - untested, as I just have a virtualmachine without serial. It does run, though. Send me some bug reports!
*  [Linux 32bit](http://konsumer.github.com/arduinoscope/downloads/arduinoscope-linux32.nw) - same deal as above
*  [Linux 64bit](http://konsumer.github.com/arduinoscope/downloads/arduinoscope-linux64.nw) - same deal as above

## Building

*  You will need to get a copy of `nw-gyp`, and put it in your path (`npm -g install nw-gyp`).
*  You will need C-compiling toolkit (Xcode, Visual C++ Studio 2010, or build-essentials.)
*  You will need to be able to compile and install  native node modules (so have `npm`, and `node-gyp` in your path.)

### Windows/Linux

    npm install
    cd node_modules/serialport
    nw-gyp configure --target=0.4.1
    nw-gyp build

### Mac

On Mac, [node-webkit](https://github.com/rogerwang/node-webkit) is 32bit, only, so I had to do extra stuff:

    npm install
    cd node_modules/serialport
    nw-gyp configure --target=0.4.1
    sed -i bak s/x86_64/i386/g build/serialport.target.mk
    nw-gyp build

## Running

To run them, go get the [node-webkit runtime](https://github.com/rogerwang/node-webkit) for your operating system.
After the project is built, you can drag the `arduinoscope.nw` directory to the runtime, or run `nw arduinoscope.nw` in the command-line on Linux/Windows, if it's in your path.

