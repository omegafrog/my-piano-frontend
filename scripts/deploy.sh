#!/bin/bash

pgrep -l http-server 2>/dev/null | awk '{print $1}' | sudo xargs kill
npx http-server ./ -S -C /etc/letsencrypt/live/mypiano.shop/cert.pem -K /etc/letsencrypt/live/mypiano.shop/privkey.pem
