var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function() {
    this.countDown = 10000000
  },
  socketNotificationReceived: function(notification, payload) {
    switch(notification) {
      case "setHeader":
        this.data.header = payload;
        //this.sendSocketNotification("I_DID", (this.countDown - payload))
        break
    }
  },
})
