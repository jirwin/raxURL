
var INTEGRITY_ERROR = 19;
/**
 * makeClass - By John Resig (MIT Licensed)
 * Takes a function and ensures that new is called so that __this__ is properly bound
 * @param {proto} optional prototype to set on the returned function
 */
exports.make_class = function(proto){
  var f = function(args){
    // did you make me with new?
    if (this instanceof arguments.callee){
      // am I a function?
      if (typeof this.init === "function"){
        //PREGUNTA: why not always pass apply arguments?
        if (args){
          return this.init.apply(this, args.callee ? args : arguments );
        }
        else{
          return this.init.apply(this, arguments);
        }
      }
    } else{
      // didn't use new, return a properly instantiated object
      return new arguments.callee(arguments);
    }
  };
  if (proto){
    f.prototype = proto;
  }
  return f;
};

exports.is_integrity_error = function(err){
  return (err && err.errno === INTEGRITY_ERROR);
};

exports.die = function () {
  var args = Array.prototype.slice.call(arguments);
  args.unshift("DYING because:");
  console.error.apply(null, args);
  process.exit(1);
};

/**
 * Takes a username and password and returns a basic auth token fully formed
 *
 */