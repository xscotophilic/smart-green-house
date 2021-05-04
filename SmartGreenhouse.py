# for requests like GET and POST
import requests
# for general input output pins(GPIO)
import RPi.GPIO as GPIO
# for temperature
import Adafruit_DHT
# for moisture
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
# for time related functions
import time

class smartGreen:
    def __init__(self, DHTgpio_arg, BulbRPi_arg, FanA_arg, FanB_arg, FanE_arg, WaterpumpA_arg, WaterpumpB_arg, WaterpumpE_arg, sensoridofdht_arg, sensoridofmoi_arg):
        # -------------------- Default constructor --------------------
        # *---* setting GPIO pins to which DHT sensor is connected to AND sensorid
        self.DHTgpio = DHTgpio_arg
        self.DHTsensor = Adafruit_DHT.DHT11
        # *---* For moisture sensor (using analog to digital converter - ADS1115)
        self.i2c = busio.I2C(board.SCL, board.SDA) # Create the I2C bus
        self.ads = ADS.ADS1115(self.i2c) # Create the ADC object using the I2C bus
        # *---* setting GPIO pins for Bulb
        self.BulbRPi = BulbRPi_arg
        # *---* setting GPIO pins for fan
        self.FanA = FanA_arg
        self.FanB = FanB_arg
        self.FanE = FanE_arg
        # *---* setting GPIO pins for waterpump
        self.WaterpumpA = WaterpumpA_arg
        self.WaterpumpB = WaterpumpB_arg
        self.WaterpumpE = WaterpumpE_arg
        # *---* sensor id
        self.sensoridofdht = str(sensoridofdht_arg); self.sensoridofmoi = str(sensoridofmoi_arg)
        # *---* upper and lower bounds
        self.lowerbound_temperature = float(0); self.upperbound_temperature = float(100)
        self.lowerbound_moisture = float(0); self.upperbound_moisture = float(100)
        # *---* error counts
        self.errorcountfortemp = 0; self.errorcountformoi = 0
        # *---* endpoint links
        self.API_ENDPOINT = ""
        self.geturlfordht = self.API_ENDPOINT + "api/getcontrollerstatus/" + self.sensoridofdht
        self.seturlfordht = self.API_ENDPOINT + "api/setcontrollerstatus/"
        self.setTemperatureURL = self.API_ENDPOINT + "api/settemp/"
        self.geturlformoi = self.API_ENDPOINT + "api/getcontrollerstatusmoi/" + self.sensoridofmoi
        self.seturlformoi = self.API_ENDPOINT + "api/setcontrollerstatusmoi/"
        self.setMoistureURL = self.API_ENDPOINT + "api/setmoi/"
        # -------------------- Default constructor section ends --------------------

    def __del__(self):
        print("Cleaning up.")
        GPIO.cleanup()

    def login(self, user_token_arg, user_pass_arg):
        # -------------------- Login --------------------
        data = {"user_token": user_token_arg, "user_pass": user_pass_arg}
        # sending post request and saving response as response object
        userURL = self.API_ENDPOINT + "user/userverification"
        res = requests.post(url = userURL, json = data)
        if(res.status_code == 200):
            self.user_id = res.text
            self.user_id = self.user_id.strip('\"') # to remove double quotes from string
        else:
            print(res.status_code, " error!")
            self.cleanupSmartGreen()
        # -------------------- Login section ends --------------------

    def setupSmartGreen(self):
        # -------------------- Setup --------------------
        # Setting GPIO pin mode
        GPIO.setmode(GPIO.BCM)

        # Setting up Bulb
        GPIO.setup(self.BulbRPi,GPIO.OUT)

        # Setting up fan
        GPIO.setup(self.FanA,GPIO.OUT)
        GPIO.setup(self.FanB,GPIO.OUT)
        GPIO.setup(self.FanE,GPIO.OUT)

        # Setting up waterpump
        GPIO.setup(self.WaterpumpA,GPIO.OUT)
        GPIO.setup(self.WaterpumpB,GPIO.OUT)
        GPIO.setup(self.WaterpumpE,GPIO.OUT)
        # -------------------- Setup section ends --------------------

    def startSmartGreen(self):
        # -------------------- Start process section --------------------
        while True:
            # -------------------- Temperature section ends --------------------
            data = {"user_id": self.user_id}
            res = requests.post(url = self.geturlfordht, json = data)
            receiveddata = res.json()
            if(res.status_code == 200):
                self.lowerbound_temperature = float(receiveddata[0]["lowerbound_temp"])
                self.upperbound_temperature = float(receiveddata[0]["upperbound_temp"])
                # Use read_retry method. This will retry up to 15 times to
                # get a sensor reading (waiting 2 seconds between each retry).
                humidity, temperature = Adafruit_DHT.read_retry(self.DHTsensor, self.DHTgpio)
                # Reading the DHT11 is very sensitive to timings and occasionally
                # the Pi might fail to get a valid reading. So check if readings are valid.
                if humidity is not None and temperature is not None:
                    self.errorcountfortemp = 0
                    if self.lowerbound_temperature <= temperature and self.upperbound_temperature >= temperature:
                        self.sendTemperature(float(temperature))
                        self.TurnoffFan(self.lowerbound_temperature, self.upperbound_temperature)
                        self.TurnoffBulb(self.lowerbound_temperature, self.upperbound_temperature)
                        print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
                    elif self.lowerbound_temperature > temperature:
                        self.sendTemperature(float(temperature))
                        self.TurnonBulb(self.lowerbound_temperature, self.upperbound_temperature)
                        print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
                        print('Bulb is on!')
                    elif self.upperbound_temperature < temperature:
                        # don't forget to turn off the waterpump
                        self.sendTemperature(float(temperature))
                        self.TurnonFan(self.lowerbound_temperature, self.upperbound_temperature)
                        print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
                        print('Fan is on!')
                else:
                  print('Failed to get reading. Try again!')
                  self.errorcountfortemp += 1
                  if self.errorcountfortemp > 4:
                      self.cleanupSmartGreen()
            else :
                print('Failed to get temperature controller status from API, Try again!')
                self.cleanupSmartGreen()
            # -------------------- Temperature section ends --------------------

            # -------------------- Moisture --------------------
            data = {"user_id": self.user_id}
            resmoisture = requests.post(url = self.geturlformoi, json = data)
            receivedmoisturedata = resmoisture.json()
            if(resmoisture.status_code == 200):
                self.lowerbound_moisture = float(receivedmoisturedata[0]["lowerbound_moi"])
                self.upperbound_moisture = float(receivedmoisturedata[0]["upperbound_moi"])
                chan = AnalogIn(self.ads, ADS.P0) # Create single-ended input on channel 0
                if chan is not None:
                    self.errorcountformoi = 0
                    if self.lowerbound_moisture <= chan.value and self.upperbound_moisture >= chan.value:
                        self.sendMoisture(float(chan.value))
                        self.TurnoffWaterpump(self.lowerbound_moisture, self.upperbound_moisture)
                        print("Moisture value: ", chan.value, "Channel Voltage: ", chan.voltage)
                    elif self.upperbound_moisture > chan.value:
                        self.sendMoisture(float(chan.value))
                        self.TurnoffWaterpump(self.lowerbound_moisture, self.upperbound_moisture)
                        print("Moisture value: ", chan.value, "Channel Voltage: ", chan.voltage)
                    elif self.lowerbound_moisture < chan.value:
                        self.sendMoisture(float(chan.value))
                        self.TurnonWaterpump(self.lowerbound_moisture, self.upperbound_moisture)
                        print("Moisture value: ", chan.value, "Channel Voltage: ", chan.voltage)
                else:
                    print('Failed to get moisture reading. Try again!')
                    self.errorcountformoi += 1
                    if self.errorcountformoi > 4:
                        self.cleanupSmartGreen()
            else :
                print('Failed to get moisture controller status from API, Try again!')
                self.cleanupSmartGreen()
            # -------------------- Moisture section ends --------------------

            time.sleep(20)
        # -------------------- Start process section ends --------------------

    def sendTemperature(self, temperature):
        data = {"user_id": self.user_id, "sensor_id": self.sensoridofdht, "temp": temperature}
        res = requests.post(url = self.setTemperatureURL, json = data)
        if res.status_code != 200:
            print('Failed to send temperature data to API, Try again!')
            self.cleanupSmartGreen()

    def sendMoisture(self, moisture):
        data = {"user_id": self.user_id, "sensor_id": self.sensoridofmoi, "moisture": moisture}
        res = requests.post(url = self.setMoistureURL, json = data)
        if res.status_code != 200:
            print('Failed to send moisture data to API, Try again!')
            self.cleanupSmartGreen()

    def TurnonFan(self, lower, upper):
        # Starting up the motor
        GPIO.output(self.FanA,GPIO.HIGH)
        GPIO.output(self.FanB,GPIO.LOW)
        GPIO.output(self.FanE,GPIO.HIGH)

        ctrldata = {"user_id": self.user_id, "sensor_id": self.sensoridofdht, "fan_status": True, "light_status": False, "lowerbound_temp": lower, "upperbound_temp": upper}

        res = requests.post(url = self.seturlfordht, json = ctrldata)
        if  res.status_code != 200:
            print("FAN Controller status Error (TurnonFan)!")
            self.cleanupSmartGreen()

    def TurnoffFan(self, lower, upper):
        # Stopping the motor
        GPIO.output(self.FanE,GPIO.LOW)

        ctrldata = {"user_id": self.user_id, "sensor_id": self.sensoridofdht, "fan_status": False, "light_status": False, "lowerbound_temp": lower, "upperbound_temp": upper}

        res = requests.post(url = self.seturlfordht, json = ctrldata)
        if  res.status_code != 200:
            print("FAN Controller status Error (TurnoffFan)!")
            self.cleanupSmartGreen()

    def TurnonBulb(self, lower, upper):
        # Starting up the Bulb
        GPIO.output(self.BulbRPi, GPIO.HIGH)

        ctrldata = {"user_id": self.user_id, "sensor_id": self.sensoridofdht, "fan_status": False, "light_status": True, "lowerbound_temp": lower, "upperbound_temp": upper}

        res = requests.post(url = self.seturlfordht, json = ctrldata)
        if  res.status_code != 200:
            print("Heat Controller status Error (TurnonBulb)!")
            self.cleanupSmartGreen()

    def TurnoffBulb(self, lower, upper):
        # Stopping the bulb power
        GPIO.output(self.BulbRPi,GPIO.LOW)

        ctrldata = {"user_id": self.user_id, "sensor_id": self.sensoridofdht, "fan_status": False, "light_status": False, "lowerbound_temp": lower, "upperbound_temp": upper}

        res = requests.post(url = self.seturlfordht, json = ctrldata)
        if  res.status_code != 200:
            print("Heat Controller status Error (TurnoffBulb)!")
            self.cleanupSmartGreen()

    def TurnonWaterpump(self, lower, upper):
        # Starting up the motor
        GPIO.output(self.WaterpumpA,GPIO.HIGH)
        GPIO.output(self.WaterpumpB,GPIO.LOW)
        GPIO.output(self.WaterpumpE,GPIO.HIGH)

        ctrldata = {"user_id": self.user_id, "sensor_id": self.sensoridofmoi, "motor_status": True, "lowerbound_moi": lower, "upperbound_moi": upper}

        res = requests.post(url = self.seturlformoi, json = ctrldata)
        if  res.status_code != 200:
            print("WaterPump Controller status Error (TurnonFan)!")
            self.cleanupSmartGreen()

    def TurnoffWaterpump(self, lower, upper):
        # Stopping the motor
        GPIO.output(self.WaterpumpE,GPIO.LOW)

        ctrldata = {"user_id": self.user_id, "sensor_id": self.sensoridofmoi, "motor_status": False, "lowerbound_moi": lower, "upperbound_moi": upper}

        res = requests.post(url = self.seturlformoi, json = ctrldata)
        if  res.status_code != 200:
            print("WaterPump Controller status Error (TurnonFan)!")
            self.cleanupSmartGreen()

    def cleanupSmartGreen(self):
        # -------------------- Cleanup --------------------
        GPIO.cleanup()
        quit()
        # -------------------- Cleanup section ends --------------------

    # a method for printing data members
    def display(self):
        # -------------------- display --------------------
        print("")
        print("")
        print("--------------------------------------------------------------------------------")
        print("DHT GPIO ", self.DHTgpio)
        print("BULB GPIO ", self.BulbRPi)
        print("FanA ", self.FanA)
        print("FanB ", self.FanB)
        print("FanE ", self.FanE)
        print("WaterpumpA ", self.WaterpumpA)
        print("WaterpumpB ", self.WaterpumpB)
        print("WaterpumpE ", self.WaterpumpE)
        print("--------------------------------------------------------------------------------")
        print("sensoridofdht ", self.sensoridofdht)
        print("sensoridofmoi ", self.sensoridofmoi)
        print("--------------------------------------------------------------------------------")
        print("lowerbound_temp ", self.lowerbound_temperature)
        print("upperbound_temp ", self.upperbound_temperature)
        print("--------------------------------------------------------------------------------")
        print("lowerbound_moisture ", self.lowerbound_moisture)
        print("upperbound_moisture ", self.upperbound_moisture)
        print("--------------------------------------------------------------------------------")
        print("API_ENDPOINT ", self.API_ENDPOINT)
        print("--------------------------------------------------------------------------------")
        print("geturlfordht ", self.geturlfordht)
        print("seturlfordht ", self.seturlfordht)
        print("--------------------------------------------------------------------------------")
        print("geturlformoi ", self.geturlformoi)
        print("seturlformoi ", self.seturlformoi)
        print("--------------------------------------------------------------------------------")
        # print("user_id ", self.user_id)
        # print("--------------------------------------------------------------------------------")
        print("")
        print("")
        # -------------------- display section ends --------------------

def main():
    # smartGreen will need DHTgpio, BulbRPi, FanA, FanB, FanE, WaterpumpA, WaterpumpB, WaterpumpE as  arguments
    sg1 = smartGreen(DHTgpio_arg = 17, BulbRPi_arg = 18, FanA_arg = 23, FanB_arg = 24, FanE_arg = 25, WaterpumpA_arg = 11, WaterpumpB_arg = 9, WaterpumpE_arg = 10, sensoridofdht_arg = 1, sensoridofmoi_arg = 1)
    # use given token and password
    sg1.login("5d41402abc4b2a76b9719d911017c592", "7d793037a0760186574b0282f2f435e7")

    sg1.setupSmartGreen()
    sg1.startSmartGreen()

    sg1.display()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sg1.cleanupSmartGreen()
