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

Vue.component('vue-multiselect', window.VueMultiselect.default)
Vue.component('feature-select', {
  data: function() {
    return {
      value: "",
      isLoading: false,
      options: [],
      defaultOptions: [
        {
          "feature": "schedule",
          "display_text": {
            "en": "Schedule",
            "zh": "議程"
          }
        },
        {
          "feature": "announcement",
          "display_text": {
            "en": "Announcement",
            "zh": "大會公告"
          }
        },
        {
          "feature": "puzzle",
          "display_text": {
            "en": "Booth Reward Activity",
            "zh": "開源巔峰挑戰賽"
          }
        },
        {
          "feature": "ticket",
          "display_text": {
            "en": "Ticket",
            "zh": "我的票券"
          }
        },
        {
          "feature": "telegram",
          "display_text": {
            "en": "Telegram",
            "zh": "Telegram"
          },
          "url": "https://t.me/<@group>"
        },
        {
          "feature": "im",
          "display_text": {
            "en": "IRC Log",
            "zh": "IRC Log"
          },
          "url": "https://ysitd.licson.net/channel/<@group>/today"
        },
        {
          "feature": "venue",
          "display_text": {
            "en": "Venue",
            "zh": "會場地圖"
          },
          "url": "https://<url>/?mode=app"
        },
        {
          "feature": "sponsors",
          "display_text": {
            "en": "Sponsors",
            "zh": "贊助"
          },
          "url": "https://<url>/?mode=app"
        },
        {
          "feature": "staffs",
          "display_text": {
            "en": "Staffs",
            "zh": "工作人員"
          },
          "url": "https://<url>/?mode=app"
        }
      ]
    }
  },
  methods: {
    featureName ({ feature, display_text }) {
      return `${feature} (${display_text.zh == "" ? "自訂功能" : display_text.zh})`
    },
    getDefaults() {
      return this.defaultOptions.filter(o => !this.$parent.value.map(f=>f.feature).includes(o.feature))
    },
    listOptions(query) {
      this.isLoading = true
      new Promise((resolve, reject) => {
        setTimeout(resolve, 250)
      }).then(() => {
        var feature = query.length > 0 ? {
          "feature": query,
          "display_text": {
            "en": "",
            "zh": ""
          },
          "url": ""
        } : null
        this.options = [feature].concat(this.getDefaults()).filter(f => f)
        this.isLoading = false
      })
    },
    open (id) {
      this.options = this.getDefaults()
    },
    close (value, id) {
      this.options = this.getDefaults()
    },
  },
  watch: {
    value: {
      handler: function (value) {
        this.$emit('value', this.value)
      },
      deep: true
    }
  },
  template: `
    <vue-multiselect
      v-model="value"
      :options="options"
      :custom-label="featureName"
      :internal-search="false"
      :searchable="true"
      :loading="isLoading"
      :max-height="200"
      :show-no-results="false"
      :allow-empty="false"
      open-direction="bottom"
      placeholder="基本功能，或輸入自訂功能"
      label="feature"
      track-by="feature"
      select-label=""
      deselect-label=""
      selected-label=""
      @search-change="listOptions"
      @open="open"
      @close="close"
    ></vue-multiselect>
  `
})

Vue.component('opass-feature', {
  props: {
    value: Array
  },
  methods: {
    setFeature: function (item, $event) {
      item.feature = $event.feature
      item.display_text = $event.display_text
    },
    remove: function (index) {
      this.value.splice(index, 1);
    }
  },
  watch: {
    value: {
      handler: function (value) {
        this.$emit('value', this.value)
      },
      deep: true
    }
  },
  template: `
    <div class="feature-list">
      <div v-for="(item, index) in value" class="feature">
        <button type="button" class="icon" @click="remove(index)">×</button>
        <div class="item">
          <label>功能名稱 <code>feature</code></label>
          <div>
            <feature-select @value="setFeature(item, $event)" placeholder="功能"></feature-select>
          </div>
        </div>
        <div class="item">
          <label>顯示名稱 <code>display_text</code></label>
          <input-i18n v-model="item.display_text"></input-i18n>
        </div>
        <div class="item">
          <label>內容網址 <code>url</code></label>
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
    features: [],
  },
  methods: {
    add: function () {
      this.features.push({
        feature: '',
        display_text: {
          zh: '',
          en: ''
        },
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
