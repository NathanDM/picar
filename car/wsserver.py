import websocket
import locale
import sys
import time
import json
from AMSpi import AMSpi


def on_message(ws, message):
    decoded_message = json.loads(message)
    action = decoded_message['action']

    amspi.stop_dc_motors([amspi.DC_Motor_1])

    if action == 'MOVE_FORWARD':
        amspi.run_dc_motors([amspi.DC_Motor_1])
    elif action == 'MOVE_BACKWARD':
        amspi.run_dc_motors([amspi.DC_Motor_1], clockwise=False)


def on_error(ws, error):
    print(error)


def on_close(ws):
    print("### closed ###")


def on_open(ws):
    print("opened")


if __name__ == "__main__":
    with AMSpi() as amspi:
        amspi.set_74HC595_pins(21, 20, 16)
        # Set PINs for controlling all 4 motors (GPIO numbering)
        amspi.set_L293D_pins(5, 6, 13, 19)
        websocket.enableTrace(True)
        ws = websocket.WebSocketApp("ws://192.168.0.10:3000/",
                                    on_message=on_message,
                                    on_error=on_error,
                                    on_close=on_close)
        ws.on_open = on_open
        ws.on_message = on_message
        ws.run_forever()
