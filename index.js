var opts = {
    extraHeaders: {
        'X-Custom-Header-For-My-Project': 'my-secret-access-token',
        'Cookie': 'user_session=NI2JlCKF90aE0sJZD9ZzujtdsUqNYSBYxzlTsvdSUe35ZzdtVRGqYFr0kdGxbfc5gUOkR9RGp20GVKza; path=/; expires=Tue, 07-Apr-2015 18:18:08 GMT; secure; HttpOnly'
    }
};

var socket = require('engine.io-client')('https://realtime.getloconow.com', opts);
socket.on('open', function () {
    socket.on('message', function (data) { });
    socket.on('close', function () { });
});
var onevent = socket.onevent;
socket.onevent = function (packet) {
    var args = packet.data || [];
    onevent.call(this, packet);    // original call
    packet.data = ["*"].concat(args);
    onevent.call(this, packet);      // additional call to catch-all
};
socket.on("*", function (event, data) {
    console.log(event);
    console.log(data);
});