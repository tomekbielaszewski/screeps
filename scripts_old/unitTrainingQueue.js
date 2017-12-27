var _ = require('lodash');
var factory = require('unitFactory');

module.exports = (function () {

  function update() {
    if (getQueue().length > 0) {
      var queueElement = getQueue().pop();
      console.log('Trying to create ' + queueElement.type);
      if (queueElement) {
        var result = factory[queueElement.type]('Home'); //TODO: remove spawn declaration!
        if (!_.isString(result)) {
          console.log('Unsuccessful ' + result);
          getQueue().push(queueElement);
        } else {
          console.log('Created ' + result);
        }
      }
      console.log(JSON.stringify(getQueue()));
    }
  }

  function enqueue(type, priority) {
    var el = _.find(getQueue(), function (el) {
      return el.type === type;
    });
    if (!el) {
      getQueue().push(createQueueElement(type, priority));
      sortByPriority(getQueue());
      console.log(type + " added! Queue length: " + getQueue().length);
    }
  }

  function sortByPriority(queue) {
    setQueue(_.sortBy(queue, function (q) {
      return q.priority
    }))
  }

  function createQueueElement(type, prioroty) {
    return {
      type: type,
      priority: prioroty
    }
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