const errorLog = {
  state: {
    errLog: []
  },
  pushLog(log) {
    this.state.errLog.unshift(log);
  },
  clearLog() {
    this.state.errLog = [];
  }
};

export default errorLog;
