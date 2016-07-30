#!/bin/bash
cd "$(dirname "$0")"
curl 'http://solarview.niwa.co.nz/dosignin' -s -D - \
--data 'username=Omnidatum&password=Delete123&domain=public' \
| grep Set-Cookie|egrep -o 'symfony=(\w*)'|tail -1 > auth_token
