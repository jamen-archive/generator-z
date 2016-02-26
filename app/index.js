var generator = require('yeoman-generator');
var minimist = require('minimist');
var args = process.argv.slice(3);

var Z = generator.Base.extend({
  initializing: function() {
    if (args) {
      var stop = /,$/;
      var gens = [];
      var temp = [];
      args.forEach(arg => {
        temp.push(arg);
        if (stop.test(arg)) {
          temp[temp.length-1] = temp[temp.length-1].slice(0, -1);
          gens.push(temp);
          temp = [];
        }
      });
      gens.push(temp);

      var minicli = [];
      gens.forEach(gen => {
        minicli = minimist(gen);
        this.composeWith(gen[0], { args: minicli._, options: minicli });
      });
    } else {
      console.log('Hello world!');
    }
  }
});

module.exports = Z;
