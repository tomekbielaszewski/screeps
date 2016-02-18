var _ = require('lodash');
var factory = require('unitFactory');

module.exports = (function () {

  function update() {
    if (getQueue().length > 0) {
      var queueElement = getQueue().pop();
      console.log('Trying to create ' + queueElement);
      if (queueElement) {
        var result = factory[queueElement]('Home'); //TODO: remove spawn declaration!
        if (!_.isString(result)) {
          console.log('Unsuccessful ' + result);
          getQueue().push(queueElement);
        } else {
          console.log('Created ' + result);
        }
      }
      console.log(getQueue());
    }
  }

  function enqueue(type) {
    var el = _.find(getQueue(), function (el) {
      return el === type;
    });
    if (!el) {
      getQueue().push(queueElement(type));
      console.log(type + " added! Queue length: " + getQueue().length);
    }
  }

  function queueElement(type) {
    return type
  }

  function getQueue() {
    if (!Memory.queue) {
      clear();
    }
    return Memory.queue;
  }

  function clear() {
    setQueue([]);
  }

  function setQueue(queue) {
    Memory.queue = queue;
  }

  return {
    update: update,
    enqueue: enqueue,
    clear: clear
  }
}());