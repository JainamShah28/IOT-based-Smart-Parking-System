import RPi.GPIO as GPIO
import time 
import json 
import socketio 

sio = socketio.SimpleClient()
sio.connect('https://intellipark.onrender.com', transport = ['websocket'])

GPIO.setmode(GPIO.BOARD)

usPins = [11, 12, 13, 15]
parkingLotIds = ["A1", "A2", "A3", "A4"]
prevStates = [False for i in range(0, len(usPins))]

for pin in usPins:
    GPIO.setup(pin, GPIO.IN)

try:
    while True:
        currStates = []

        for i in range(0, len(usPins)):
            usOutput = GPIO.input(usPins[i])
            currStates.append(usOutput == 1)

            if currStates[i] != prevStates[i]:
                sio.emit("parking-status", json.dumps({
                    "parkingLotId": parkingLotIds[i],
                    "isOccupied": currStates[i] == 1
                }))

                prevStates[i] = currStates[i]

        time.sleep(1)
except KeyboardInterrupt:
    sio.disconnect()
    GPIO.cleanup()