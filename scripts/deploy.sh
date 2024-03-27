#!/bin/bash

PID=$(netstat -nap | grep 8080 | awk '{print $7}' | sed 's/\.*//g')

if [ $PID ]; then
        kill -15 $PID
else
        echo "없음"
fi

npm install

nohup npm start > nohup.out 2&>1 &