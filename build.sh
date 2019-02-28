#!/bin/bash

mkdir -p dist/events/

for i in *.json; do
	jq -c --arg FILENAME "`basename $i`" '{path: ("https://portal.opass.app/events/" + $FILENAME), display_name, logo_url}' $i
	cp $i dist/events/

	mkdir dist/`basename $i .json`
	cp $i $_/index.json
done | jq -r -c -s . > dist/index.json

cp web/* dist/