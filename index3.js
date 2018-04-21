var opts = {
    transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlZ25kZXJ5IiwidXNlcl91aWQiOiJUS0wxMElZOVNPIiwiaXNfc3RhZmYiOmZhbHNlLCJsYW5ndWFnZSI6MX0.FP4cwD90Mps4DI7N2gLvhStG9rJkPIZ8CshfvEjLHMI",
            }
        }
    },
    transports: ['polling'],

    reconnect: true,
    forceNew: true
};
const io = require('socket.io-client');
var sockets = [];
for (var i = 0; i < 100; i++) {

    let socket = io.connect('https://realtime.getloconow.com', opts);
    console.log(i);
    sockets.push(socket);
    for (let m = 0; m < 100000000; m++) { let x = 0; x++; x--; x * 1; x + 1; x + 5; }
}
let socket = sockets[99];
console.log(sockets[0] === sockets[1]);
var onevent = socket.onevent;
socket.onevent = function (packet) {
    var args = packet.data || [];
    onevent.call(this, packet);    // original call
    packet.data = ["*"].concat(args);
    onevent.call(this, packet);      // additional call to catch-all
};
socket.on("*", function (event, data) {
    console.log(event, data);
});