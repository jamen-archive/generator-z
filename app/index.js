var generator = require('yeoman-generator');
var argv = process.argv.slice(3);

var Z = generator.Base.extend({
  initializing: function() {
    if (argv) {
      var stop = /,$/;
      var gens = [];
      var temp = [];
      var stun;

      argv.forEach(arg => {
        temp.push(arg);
        if (stop.test(arg)) {
          temp[temp.length-1] = temp[temp.length-1].slice(0, -1);
          gens.push(temp);
          temp = [];
        }
      });
      gens.push(temp);

      gens.forEach(gen => {
        this.composeWith(gen[0], { args: gen.slice(1) });
      });
    }
  }
});

module.exports = Z;
