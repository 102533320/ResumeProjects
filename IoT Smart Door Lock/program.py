import serial
import time
import pymysql

device = '/dev/ttyS0'
arduino = serial.Serial(device, 9600)

dbConn = pymysql.connect('loclahost','pi','','assignment_db') or die('could not connect to database...')
cursor = dbConn.cursor()

sqlInsert = """INSERT INTO attempts (attempt_input, attempt_passed) VALUES (%s, %s)"""

cursor.execute("SELECT * FROM passcodes")
passcodes = cursor.fetchmany(2)
for row in passcodes:
	pass01 = row[0]
	pass02 = row[1]
	
while True:
	data = arduino.readline()
	print(data)
	if data.strip() == pass01:
		cursor.execute(sqlInsert,(data.strip(),1))
		dbConn.commit()
		arduino.write(b'A')
	elif data.strip() == pass02:
		cursor.execute(sqlInsert,(data.strip(),1))
		dbConn.commit()
		arduino.write(b'B')
	else:
		cursor.execute(sqlInsert,(data.strip(),0))
		dbConn.commit()
		arduino.write(b'C')