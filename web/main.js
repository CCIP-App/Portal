Vue.component('input-i18n', {
  data: function () {
    return {
      forms: [{
        lang: 'en',
        content: ''
      }, {
        lang: 'zh',
        content: ''
      }]
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
    forms: {
      handler: function (value) {
        let result = {}
        for (form of this.forms) {
          if (form.lang !== '')
            result[form.lang] = form.content
        }
        this.$emit('result', result)
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
            <input-i18n @result="item.display_name = $event"></input-i18n>
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
