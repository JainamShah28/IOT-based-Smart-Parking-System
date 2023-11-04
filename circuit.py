import RPi.GPIO as GPIO
import time 

GPIO.setmode(GPIO.BOARD)

triggerPins = []
echoPins = []
distances = [0 for i in range(0, len(triggerPins))]

try:
    for pin in triggerPins:
        GPIO.setup(pin, GPIO.OUT)
        GPIO.output(pin, GPIO.LOW)

    for pin in echoPins:
        GPIO.setup(pin, GPIO.IN)

    while True:
        for i in range(0, len(triggerPins)):
            GPIO.output(triggerPins[i], GPIO.HIGH)
            time.sleep(0.00001)
            GPIO.output(triggerPins[i], GPIO.LOW)

            while GPIO.input(echoPins[i]) == GPIO.LOW:
                startTime = time.time()

            while GPIO.input(echoPins[i]) == GPIO.HIHJ:
                endTime = time.time()

            duration = endTime - startTime
            distance = duration * 17000

            if (distance != distances[i]):
                distances[i] = distance
                # emmit the server socekt event to send the data to the server 
                continue
except KeyboardInterrupt:
    GPIO.cleanup()