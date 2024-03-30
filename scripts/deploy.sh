#!/bin/bash

netstat -nap 2>/dev/null | grep :8080 | awk '{print $7}' | cut -d'/' -f1 | xargs kill

npx serve -s ./ -p 8080