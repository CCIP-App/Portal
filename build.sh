#!/bin/bash

mkdir -p dist/events/

while IFS=$'\t' read timestamp file; do
	jq -c '{event_id, display_name, logo_url}' $file

	mkdir dist/events/`basename $file .json`
	cp $file $_/index.json
done < <(TZ=/usr/share/zoneinfo/UTC jq -r '[.event_date.start | sub("(?<before>.*):"; .before ) | strptime("%Y-%m-%dT%H:%M:%S%z") | todate | fromdate, input_filename] | @tsv' events/*.json | sort -nr) | jq -r -c -s . > dist/events/index.json

cp web/* dist/
