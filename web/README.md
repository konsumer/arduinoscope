# Web

This is a web-based, node.js powered version of arduinoscope.

You will need to install the Firmata firmware on your arduino (in arduino IDE: File -> Open -> Examples > Library-Firmata > StandardFirmata.) and [node.js/npm](http://nodejs.org/download/)

After that, you can run in the web directory:
```
npm install
```

Now, you can run the front-end server:
```
node server.js
```

This will start a [web-server on port 8080](http://localhost:8080) where you can see what is happening on teh pins of your arduino.
