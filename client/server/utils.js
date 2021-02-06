const SocketIndex = require('../../src/socket.io/index');

module.exports.promisify = function (nodeFunction) {
  function promisified(...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...result) {
        if (err) return reject(err);
        if (result.length === 1) return resolve(result[0]);
        return resolve(result);
      }
      nodeFunction.call(null, ...args, callback);
    });
  }
  return promisified;
};

//https://github.com/Abazhenov/express-async-handler/blob/master/index.js
module.exports.asyncUtil = (fn) =>
  function asyncUtilWrap(...args) {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };

module.exports.sendServerChatMessage = (message) => {
  setTimeout(() => {
    SocketIndex.server.sockets.emit('event:serverChatMessage', {
      message: message
    });
  }, 200); //lidl solution, server message will apear after user message
};
