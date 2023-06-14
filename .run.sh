#!/bin/bash

#Server
gnome-terminal --working-directory=/home/sanket/Desktop/builds/Logger-drones/server -- sh -c "pnpm i && pnpm run start"

#Client
gnome-terminal --working-directory=/home/sanket/Desktop/builds/Logger-drones/client -- sh -c "pnpm run dev"

# Command 3: Python app
gnome-terminal --working-directory=/home/sanket/Desktop/builds/Logger-drones/server -- sh -c "python3 app.py"
