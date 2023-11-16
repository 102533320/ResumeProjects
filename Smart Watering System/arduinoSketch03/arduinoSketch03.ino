#include <ArduinoJson.h>
#include <List.hpp>
#include "U8glib.h"
U8GLIB_SH1106_128X64 u8g(13, 11, 10, 9, 8);  // D0=13, D1=11, CS=10, DC=9, Reset=8
String command;
String payload;
bool decision;

void setup() {                   
  Serial.begin(9600);
  u8g.firstPage();  
  do {
    u8g.setFont(u8g_font_helvB10);  
    u8g.drawStr(48, 15, "Plant"); 
    u8g.drawStr(35, 35, "Watering");
    u8g.drawStr(40, 55, "System");
  } while( u8g.nextPage() );
}

void loop() {
  edgeServerCheck();
}

void edgeServerCheck() {
  if (Serial.available()) {
    payload = Serial.readStringUntil('\n');
    StaticJsonDocument<512> doc;
    DeserializationError error = deserializeJson(doc, payload);
    if (doc["Temp"]) {
      float temp = doc["Temp"];
      float hum = doc["Hum"];
      u8g.firstPage();  
      do {
        u8g.setFont(u8g_font_helvR12);  
        u8g.drawStr(0, 15, "Temp:");  
        u8g.setPrintPos(75, 15);
        u8g.print(temp, 0);
        u8g.print((char)176);
        u8g.print("C");
        u8g.drawStr(0, 35, "Humi:");
        u8g.setPrintPos(75, 35);
        u8g.print(hum, 0);
        u8g.print("%");
      } while( u8g.nextPage() );
    } else if (doc["soilMoisturePercent"]) {
      float soilMoisturePercent = doc["soilMoisturePercent"];
      float wateringStatus = doc["wateringStatus"];
      u8g.firstPage();  
      do {
        u8g.setFont(u8g_font_helvR12);  
        u8g.drawStr(0, 15, "SMP:");  
        u8g.setPrintPos(75, 15);
        u8g.print(soilMoisturePercent, 0);
        u8g.print("%");
        u8g.drawStr(0, 35, "Status:");  
        u8g.setPrintPos(75, 35);
        if (wateringStatus != 0) {
          u8g.print("On");
        } else {
          u8g.print("Off");
        }
      } while( u8g.nextPage() );
    }
  }
}
