#include <IRremote.h>
#include <SevSeg.h>

int RECV_PIN = 10;
int redPin = 11;
int greenPin = 12;
int buzzer = 13;
int analogValue = A0;
unsigned long key_value = 0;
String input_passcode1;
String input_passcode2;
String value;
bool j = false;
int incomingByte;
IRrecv irrecv(RECV_PIN);
decode_results results;
SevSeg sevseg;

void setup() {
  Serial.begin(9600);
  irrecv.enableIRIn();
  byte numDigits = 1;
  byte digitPins[] = {};
  byte segmentPins[] = {6, 5, 2, 3, 4, 7, 8, 9};
  bool resistorsOnSegments = true;
  byte hardwareConfig = COMMON_ANODE;
  sevseg.begin(hardwareConfig, numDigits, digitPins, segmentPins, resistorsOnSegments);
  sevseg.setBrightness(90);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  // Edge Server Check
  edgeServerCheck();
  
  // Barrier 01
  int sensorValue = analogRead(analogValue);
  if (irrecv.decode(&results)) {
    key_value = results.value;
    if (results.value == 0xFD00FF) {
      if (sensorValue >= 0 && sensorValue <= 20) {
        input_passcode1 += "A";
        sevseg.setChars("A");
      } else if (sensorValue >= 250 && sensorValue <= 400) {
        input_passcode1 += "E";
        sevseg.setChars("E");
      } else if (sensorValue >= 500  && sensorValue <= 650) {
        input_passcode1 += "S";
        sevseg.setChars("S");
      } else if (sensorValue >= 800 && sensorValue <= 950) {
        input_passcode1 += "F";
        sevseg.setChars("F");
      }
      sevseg.refreshDisplay();
      delay(300);
      sevseg.blank();
    }
    irrecv.resume();
  }
  if (input_passcode1.length() == 4) {
    Serial.println(input_passcode1);
    input_passcode1 = "";
  }

  // Barrier 02
  while (j == true) {
    edgeServerCheck();
    if (irrecv.decode(&results)) {
      switch (results.value) {
        case 0xFD30CF:
          sevseg.setNumber(0);
          value = "0";
          break;
        case 0xFD08F7:
          sevseg.setNumber(1);
          value = "1";
          break;
        case 0xFD8877:
          sevseg.setNumber(2);
          value = "2";
          break;
        case 0xFD48B7:
          sevseg.setNumber(3);
          value = "3";
          break;
        case 0xFD28D7:
          sevseg.setNumber(4);
          value = "4";
          break;
        case 0xFDA857:
          sevseg.setNumber(5);
          value = "5";
          break;
        case 0xFD6897:
          sevseg.setNumber(6);
          value = "6";
          break;
        case 0xFD18E7:
          sevseg.setNumber(7);
          value = "7";
          break;
        case 0xFD9867:
          sevseg.setNumber(8);
          value = "8";
          break;
        case 0xFD58A7:
          sevseg.setNumber(9);
          value = "9";
          break;
        default:
          break;
      }
      key_value = results.value;
      input_passcode2 += value;
      irrecv.resume();
      sevseg.refreshDisplay();
      delay(300);
      sevseg.blank();
    }
    if (input_passcode2.length() == 4) {
      Serial.println(input_passcode2);
      input_passcode2 = "";
    }
  }
}

void edgeServerCheck() {
  if (Serial.available() > 0) {
    incomingByte = Serial.read();
    if (incomingByte == 'A') {
      j = true;
      digitalWrite(greenPin, HIGH);
      digitalWrite(buzzer, HIGH);
      delay(500);
      digitalWrite(greenPin, LOW);
      digitalWrite(buzzer, LOW);
    } else if (incomingByte == 'B') {
      while (j == true) {
        digitalWrite(buzzer, HIGH);
        digitalWrite(greenPin, HIGH);
        delay(100);
        digitalWrite(greenPin, LOW);
        digitalWrite(redPin, HIGH);
        delay(100);
        digitalWrite(redPin, LOW);
      }
    } else {
      digitalWrite(redPin, HIGH);
      delay(500);
      digitalWrite(redPin, LOW);
    }
  }
}
