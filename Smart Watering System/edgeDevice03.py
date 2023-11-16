import serial
import json
import sys
from time import sleep
from tb_device_mqtt import TBDeviceMqttClient

ser = serial.Serial('/dev/ttyS0',9600)

def on_attributes_change(client, result, exception):
	if exception is not None:
		print("Exception", str(exception))
	else:
		data = result.get('client')
		print(data)
		data = json.dumps(data)
		ser.write(data.encode('ascii'))
		ser.flush()

client01 = TBDeviceMqttClient("thingsboard.cloud", "smToken")
client02 = TBDeviceMqttClient("thingsboard.cloud", "dhtToken")
client01.connect()
client02.connect()

while True:
	client01.request_attributes(["soilMoisturePercent","wateringStatus"], callback=on_attributes_change)
	sleep(10)
	client02.request_attributes(["Temp","Hum"], callback=on_attributes_change)
	sleep(10)