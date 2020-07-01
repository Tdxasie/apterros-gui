React based app for monitoring, flight control and logging on VTVL demonstrator.

## Communication

Data is recieved using MQTT protocol so it can be split on different topics for easy use

## Logging

Data is logged raw in a file as soon as its recieved, it is also put in a database for further analyse, display, replay etc.

## SSH integration

The app contains an Xterm terminal that allows ssh communication with the flight computer.
