#!/bin/bash

for i in `find . ! -name 'index.json' ! -name 'example.json' -name '*.json' `; do jq -c --arg FILENAME "`basename $i`" '{path: ("https://portal.opass.app/" + $FILENAME), display_name, logo_url}' $i; done | jq -r -c -s . > index.json
