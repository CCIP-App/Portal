{
  "event_id": "",
  "display_name": {
    "en": "",
    "zh": "",
    "<Any ISO 639-1 lang>": ""
  },
  "logo_url": "https://", // only accept HTTPS URL
  "publish": { // only accept ISO 8601
    "start": "2018-11-24T07:01:40+00:00",
    "end": "2018-11-24T07:01:40+00:00"
  },
  "server_base_url": "https://<domain>",
  "schedule_url": "https://<domain>/<file_path>.json",
  "features": [ // app follow the sequence
    {
      "feature": "", // fastpass, schedule, announcement, puzzle, ticket, telegram, im, sponsors, staffs, venue, webview
      "icon": "https://" // require when feature is webview, only accept @3x.png max: 128x128
      "display_text": {
        "en": "",
        "zh": "",
        "<Any ISO 639-1 lang>": ""
      },
      "url": "https://", // support placeholder {role}, {token}
      "visible_roles": [ // option, default for all user, string need match server config
        "staff",
        "speaker"
      ]
    },
    ...
  ]
}
