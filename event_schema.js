{
  "event_id": "",
  "display_name": {
    "en": "",
    "zh": "",
    "<Any ISO 639-1 lang>": ""
  },
  "logo_url": "https://", // only accept HTTPS URL
  "event_website": "https://", // please use HTTPS URL
  "event_date": { // only accept ISO 8601
    "start": "2020-03-28T00:00:00+08:00",
    "end": "2020-03-28T00:00:00+08:00"
  }
  "publish": { // only accept ISO 8601
    "start": "2020-02-23T00:00:00+08:00",
    "end": "2020-08-31T00:00:00+08:00"
  },
  "features": [ // app follow the sequence
    {
      "feature": "", // fastpass, schedule, announcement, puzzle, ticket, telegram, im, sponsors, staffs, venue, webview, wifi
      "icon": "https://" // require when feature is webview, only accept @3x.png max: 128x128
      "display_text": {
        "en": "",
        "zh": "",
        "<Any ISO 639-1 lang>": ""
      },
      "url": "https://",
      /*
       * only accept HTTPS URL, support placeholder {role}, {public_token}
       * require when feature is fastpass, announcement or ticket, the url is server base url, https://<domain>
       */
      "wifi": [ // require when feature is wifi
        {
          "SSID": "SITCON 2020",
          "password": ""
        },
        ...
      ]
      "visible_roles": [ // option, default for all user, string need match server config
        "staff",
        "speaker"
      ]
    },
    ...
  ]
}
