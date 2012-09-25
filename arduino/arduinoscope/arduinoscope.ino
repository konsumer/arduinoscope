/*
this goes on your arduino
for use with Processing example SimpleSerialArduinoscope

*/

// holds temp vals
int val;

void setup() {
  // set 2-12 digital pins to read mode
  for (int i=2;i<14;i++){
    pinMode(i, INPUT);
  }
  
  Serial.begin(115200);  
}

void loop() {  
  // read all analog ports, split by " "
  for (int i=0;i<6;i++){
    Serial.print(analogRead(i));
    Serial.print(" ");
  }
  
  // read all digital ports, split by " "
  for (int i=2;i<14;i++){
    Serial.print(digitalRead(i));
    Serial.print(" ");
  }
  
  // frame is marked by LF
  Serial.println();
}
