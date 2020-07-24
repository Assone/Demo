const App = new Vue({
  el: "#app",
  data: {
    result: "0",
    isDecimalAdded: false,
    isOperatorAdded: false,
    isStarted: false,
  },
  methods: {
    clear() {
      this.result = "0";
      this.isDecimalAdded = false;
      this.isOperatorAdded = false;
      this.isStarted = false;
    },
    isOperator(key) {
      return ["+", "-", "×", "÷"].indexOf(key) !== -1;
    },
    append(val) {
      if (this.result === "0" && !this.isOperator(val)) {
        if (val === "." && !this.isDecimalAdded) {
          this.result += val;
          this.isDecimalAdded = true;
        } else {
          this.result = "" + val;
        }

        this.isStarted = true;
        return;
      }

      if (!this.isOperator(val)) {
        if (val === "." && this.isDecimalAdded) {
          return;
        }

        if (val === ".") {
          this.isDecimalAdded = true;
          this.isOperatorAdded = true;
        } else if (this.isOperatorAdded) {
          this.isOperatorAdded = false;
        }

        this.result += "" + val;
      }

      if (this.isOperator(val) && !this.isOperatorAdded) {
        this.result += "" + val;
        this.isDecimalAdded = false;
        this.isOperatorAdded = true;
      }
    },
    calculate() {
      const exp = this.result.replace(/×/g, "*").replace(/÷/g, "/");

      this.result = parseFloat(eval(exp).toFixed(9)).toString();
      this.isDecimalAdded = false;
      this.isOperatorAdded = false;
    },
    calculatePercentage() {
      if (!this.isOperatorAdded && this.isStarted) {
        this.result += "/100";
        this.calculate();
      }
    },
    calculateToggle() {
      if (!this.isOperatorAdded && this.isStarted) {
        this.result += "*-1";
        this.calculate();
      }
    },
  },
});
