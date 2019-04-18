#include <FirebaseArduino.h>
#include <ESP8266WiFi.h>

#define WIFI_SSID "LASIC_LMI"
#define WIFI_PASSWORD "_lasic_lmici"

//this firebase project was deleted
//you'll need to enter your own firebase info
#define FIREBASE_HOST "fechadura-teste.firebaseio.com"
#define FIREBASE_AUTH "HOAPPJUoDHVRw1j4Bb7aPGLRXLdXF5XpDJJtCP8V"

int ledPower = 5;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  pinMode(ledPower, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  int ledStatus = Firebase.getInt("ledStatus");
  if(ledStatus == 1){
    digitalWrite(ledPower, HIGH);
    Serial.println("Led deve está acesso");
  } else {
    digitalWrite(ledPower, LOW);
    Serial.println("Led deve está apagado");
  }

  //set data:
  //Firebase.set(ledStatus, "1");
}
