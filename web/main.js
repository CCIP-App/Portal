Vue.component('input-i18n', {
  data: function () {
    return {
      forms: [{
        lang: 'en',
        content: ''
      }, {
        lang: 'tw',
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
        <div v-for="(item,index) in forms">
          <input type="text" placeholder="Any ISO 639-1 lang" v-model="item.lang" />
          <input type="text" placeholder="translate" v-model="item.content" />
          <button type="button" v-if="index+1 === forms.length" @click="add">+</button>
        </div>
      </div>
      `
})

Vue.component('custom-feature', {
  props: {
    value: Array
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
      <div>
        <div v-for="(item,index) in value">
          <input type="text" placeholder="http://" v-model="item.icon" />
          <input-i18n @result="item.display_name = $event"></input-i18n>
          <input type="text" placeholder="http://" v-model="item.url" />
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
