int triggerPins[4] = {10, 11, 12, 13};
int echoPins[4] = {};
int outputPins[4] = {};

void setup() {
    Serial.begin(9600);

    for (int i = 0; i < 4; i++) {
        pinMode(triggerPins[i], OUTPUT);
        pinMode(echoPins[i], INPUT);

        pinMode(outputPins[i], OUTPUT);
    }        
}

void loop() {
    for (int i = 0; i < 4; i++) {
        digitalWrite(triggerPins[i], LOW);
        delayMicroseconds(2);

        digitalWrite(triggerPins[i], HIGH);
        delayMicroseconds(10);
        digitalWrite(triggerPins[i], LOW);

        long duration = pulseIn(echoPins[i], HIGH),
            distance = duration * 0.034 / 2;

        if (distance <= 20) {
            digitalWrite(outputPins[i], HIGH);
        } else {
            digitalWrite(outputPins[i], LOW);
        }

        Serial.print(i);
        Serial.print(") Distance: ");
        Serial.print(distance);
        Serial.println(" cm");

        delay(100);
    }
}