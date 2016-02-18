module.exports = (function () {

  function calc(body) {
    return _.reduce(body, function (sum, bodyPart) {
      return sum + cost(bodyPart);
    },0);
  }

  function cost(bodyPart) {
    var cost = {
      move: 50,
      work: 100,
      carry: 50,
      attack: 80,
      ranged_attack: 150,
      heal: 250,
      claim: 600,
      tough: 10
    };
    return cost[bodyPart];
  }

  return {
    calc: calc
  }
}());