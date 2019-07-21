Vue.component('input-i18n', {
  props: {
    value: {
      type: Object
    },
    forms: {
      type: Array,
      default: function() {
        return [{
          lang: 'en',
          content: ''
        }, {
          lang: 'zh',
          content: ''
        }]
      }
    }
  },
  methods: {
    add: function () {
      this.forms.push({
        lang: '',
        content: ''
      })
    },
    remove: function (index) {
      this.forms.splice(index, 1);
    }
  },
  watch: {
    value: {
      handler: function(value) {
        let langs = Object.keys(value)
        let form_keys = this.forms.map(f=>f.lang)
        if (langs.length > this.forms.length) {
          for (var i = 0; i <= langs.length - this.forms.length; i++)
            this.add()
        }
        Object.entries(value).map(kv => {
          let i = this.forms.map((f, i) => f.lang == kv[0] ? i : -1).filter(f => f != -1)[0]
          if (i == -1) {
            this.forms.push({
              lang: kv[0],
              content: kv[1]
            })
          } else {
            this.forms[i].lang = kv[0]
            this.forms[i].content = kv[1]
          }
        })
      }
    },
    forms: {
      handler: function (value) {
        let result = {}
        for (form of this.forms) {
          if (form.lang !== '')
            result[form.lang] = form.content
        }
        this.$emit('input', result)
      },
      deep: true
    }
  },
  template: `
      <div>
        <div v-for="(item, index) in forms" class="i18n-input">
          <input type="text" placeholder="Any ISO 639-1 lang" v-model="item.lang" />
          <input type="text" placeholder="translate" v-model="item.content" />
          <button type="button" class="icon" v-if="forms.length > 1" @click="remove(index)">×</button>
        </div>
        <button type="button" class="raised" @click="add">新增語言</button>
      </div>
  `
})

Vue.component('custom-feature', {
  props: {
    value: Array
  },
  methods: {
    remove: function (index) {
      this.value.splice(index, 1);
    }
  },
  watch: {
    value: {
      handler: function (value) {
        this.$emit('input', this.value)
      },
      deep: true
    }
  },
  template: `
      <div class="feature-list">
        <div v-for="(item, index) in value" class="feature">
          <button type="button" class="icon" @click="remove(index)">×</button>
          <div class="item">
            <label>圖示網址</label>
            <input type="text" placeholder="http://" v-model="item.icon" />
          </div>
          <div class="item">
            <label>顯示名稱</label>
            <input-i18n v-model="item.display_name"></input-i18n>
          </div>
          <div class="item">
            <label>內容網址</label>
            <input type="text" placeholder="http://" v-model="item.url" />
          </div>
        </div>
      </div>
      `
})

var app = new Vue({
  el: '#app',
  data: {
    event_id: '',
    display_name: {
      zh: '',
      en: ''
    },
    logo_url: '',
    publish: {
      start: '',
      end: ''
    },
    server_base_url: '',
    schedule_url: '',
    features: {
      irc: '',
      telegram: '',
      puzzle: '',
      staffs: '',
      venue: '',
      sponsors: '',
      partners: ''
    },
    custom_features: [],
  },
  methods: {
    add: function () {
      this.custom_features.push({
        icon: '',
        display_name: {},
        url: ''
      })
    },
    save: function () {
      let result = JSON.stringify(this.$data, undefined, 4)
      result = result.replace(/\n/g, '%0a')
      window.location.href = 'https://github.com/CCIP-App/Portal/new/master?filename=events/' + this.event_id + '.json&value=' + result
    }
  }
})
