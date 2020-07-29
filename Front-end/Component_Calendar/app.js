Vue.component('Calendar', {
  data() {
    return {
      time: {
        year: this.getTime().year || 1987,
        month: this.getTime().month + 1 || 1,
        date: this.getTime().date || 1,
      },
      dateUnit: ['日', '一', '二', '三', '四', '五', '六'],
      showCalendarState: false,
    };
  },
  props: {
    showDate: {
      type: String,
      validator(value) {
        return new Date(value).toString !== 'Invalid Date';
      },
    },
  },
  created() {
    window.addEventListener('mousedown', evt => {
      const calendarView = document.querySelector('.calendar-view');

      if (evt.target.tagName === 'I') {
        this.showCalendarState = !this.showCalendarState;
      } else if (calendarView && calendarView.contains(evt.target)) {
        this.showCalendarState = true;
      } else {
        this.showCalendarState = false;
      }
    });
  },
  methods: {
    getTime() {
      const time = new Date(this.showDate);

      return {
        year: time.getFullYear(),
        month: time.getMonth(),
        date: time.getDate(),
      };
    },
    getDates() {
      let time = new Date([this.time.year, this.time.month].join('-'));
      time.setMonth(this.time.month);
      time.setDate(0);
      return time.getDate();
    },
    getDays() {
      return new Date([this.time.year, this.time.month, 1].join('-')).getDay();
    },
    /**
     * 格式化时间
     * @param {number} time 进行格式化的时间
     */
    formatTime(time) {
      return time < 10 ? `0${time}` : time;
    },
    // 切换选项
    switchItem({ keyCode, target }) {
      const previousElement =
        target.previousElementSibling &&
        target.previousElementSibling.previousElementSibling;
      const nextElement =
        target.nextElementSibling &&
        target.nextElementSibling.nextElementSibling;
      const unit = target.attributes.unit.nodeValue;

      switch (keyCode) {
        case 38:
          this.changeTime(unit, +1);
          break;
        case 40:
          this.changeTime(unit, -1);
          break;
        case 37:
          previousElement && previousElement.focus();
          break;
        case 39:
          nextElement && nextElement.focus();
          break;
      }
    },
    /**
     * 改变时间
     * @param {str} unit 时间单位
     * @param {number} value 改变的量
     */
    changeTime(unit, value) {
      if (value !== undefined) this.time[unit] += value;

      switch (unit) {
        case 'year':
          if (this.time.date > this.getDates())
            this.time.date = this.getDates();
          break;
        case 'month':
          const month = this.time.month;

          if (month < 1) {
            this.time.year -= 1;
            this.time.month = 12;
          } else if (month > 12) {
            this.time.year += 1;
            this.time.month = 1;
          }

          this.changeTime('year');
          break;
        case 'date':
          const date = this.time.date;

          if (date > this.getDates()) {
            this.changeTime('month', +1);
            this.time.date = 1;
          } else if (date < 1) {
            this.changeTime('month', -1);
            this.time.date = this.getDates();
          }
          break;
      }
    },
    resetDate(val) {
      this.time.date = Number(val);
      this.showCalendarState = false;
    },
  },
  computed: {
    // 获取格式化的内容
    formatContent() {
      return [
        [this.time.year, 'year'],
        [this.formatTime(this.time.month), 'month'],
        [this.formatTime(this.time.date), 'date'],
      ]
        .join(' / ')
        .split(' ')
        .map(item => item.split(','));
    },
    showDateList() {
      const temp = [],
        list = [];
      const DATE_END = this.getDates(),
        DAY_START = this.getDays();

      while (temp.length < DAY_START) {
        temp.push('');
      }

      for (let i = 1; i <= DATE_END; i++) {
        temp.push(i);
      }

      temp.forEach((content, index) => {
        const position = Math.floor(index / 7);
        if (!list[position]) list[position] = [];
        list[position].push(content);
      });

      while (list[list.length - 1].length <= 7) {
        list[list.length - 1].push('');
      }

      return list;
    },
  },
  template: `
  <div class='calendar'>
    <div class='calendar-container'>
      <div>
        <span
        v-for='(content, index) in formatContent'
        :tabindex='content[1] ? 1 : null'
        :unit='content[1]'
        :key='index'
        @keydown='switchItem'>{{content[0]}}</span>
      </div>
      <i class='icon icon-calendar'></i>
    </div>
    <Calendar-View
      :show-view ="showCalendarState"
      :time ='{
        year: time.year,
        month: formatTime(time.month),
        date: time.date
      }'
      :list ='showDateList'
      :units ='dateUnit'
      @updateTime = 'changeTime'
      @updateDate = 'resetDate'
      >
    </Calendar-View>
  </div>
  `,
});

Vue.component('Calendar-View', {
  props: ['showView', 'time', 'list', 'units'],
  methods: {
    updateMonth(val) {
      this.$emit('updateTime', 'month', val);
    },
    updateDate(evt) {
      if (evt.target.tagName === 'TD') {
        if (evt.target.textContent !== '') {
          this.$emit('updateDate', evt.target.textContent);
        }
      }
    },
  },
  template: `
  <div v-if='showView' class='calendar-view'>
    <div class='calendar-controls'>
      <div class='calendar-time'>{{time.year}}年{{time.month}}月</div>
      <div class='calendar-flip'>
        <i class='icon icon-arrows' @click='updateMonth(-1)'></i>
        <i class='icon icon-arrows next' @click='updateMonth(+1)'></i>
      </div>
    </div>
    <table @click='updateDate'>
      <thead>
        <tr>
          <th v-for='unit in units'>{{unit}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='item in list'>
          <td v-for='content in item'>{{content}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
});

new Vue({
  el: '#app',
});
