# LaserBlast Control

Basic API server for use with LaserBlast. Listens for hits on http://*HOSTNAME*/play/*FILE* and plays the associated file. No filetype validation to speak of just yet.

## Required Modules
* http
* express
* child_process
* string_decoder

## Run
Assuming all modules are installed, just do `node api.js` from the *LaserBlast Control* directory

## TODO
* Option to cut to idle image/video and audio until next trigger.
* Filetype validation, verify that the filetype requested is whitelisted before attempting to play
* Move variable assignments out of functions