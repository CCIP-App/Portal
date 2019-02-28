#!/bin/bash

mkdir -p dist/events/

for i in events/*.json; do
	jq -c '{event_id, display_name, logo_url}' $i

	mkdir dist/events/`basename $i .json`
	cp $i $_/index.json
done | jq -r -c -s . > dist/events/index.json

cp web/* dist/
