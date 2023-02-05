import sys
import time
from machine import Pin, I2C
from sh1106 import SH1106_I2C

WIDTH  = 128                                            # ancho de pantalla OLED
HEIGHT = 64                                             # altura de la pantalla OLED

i2c = I2C(0, scl=Pin(9), sda=Pin(8), freq=200000)       # Iniciar I2C usando pines GP8 y GP9 (pines I2C0 predeterminados)
print(i2c.scan())
print("I2C Address      : "+hex(i2c.scan()[0]).upper()) # Mostrar la dirección del dispositivo
print("I2C Configuration: "+str(i2c))                   # Mostrar configuración I2C

oled = SH1106_I2C(WIDTH, HEIGHT, i2c)                  # Pantalla inicializada

oled.rotate(180)

#Añadir texto(ancho,alto)
oled.fill(0)
oled.text("Dato:",5,5)
oled.show()

while True:
    # read a command from the host
    v = sys.stdin.readline().strip()
    oled.fill(0)
    oled.text("Dato: ",5,5)
    oled.text(v,5,15)
    oled.show()