//////////////////////////////////
const app = require('express')(), 
    http=require('http').Server(app),
    s_io = require('socket.io')(http);
s_io.on('connection', function(socket){
    console.log('user connected');
})
const port = 50155;
http.listen(port, ()=> {
    console.log("Listening to:"+port);
})

/////////////////////////////////////


var opts = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxlZ25kZXJ5IiwidXNlcl91aWQiOiJUS0wxMElZOVNPIiwiaXNfc3RhZmYiOmZhbHNlLCJsYW5ndWFnZSI6MX0.FP4cwD90Mps4DI7N2gLvhStG9rJkPIZ8CshfvEjLHMI",
                }
            }
        },
        transports: ['polling'],

        reconnect: true
    };
const io = require('socket.io-client');
var socket = io.connect('https://realtime.getloconow.com', opts);
var onevent = socket.onevent;
socket.onevent = function (packet) {
    var args = packet.data || [];
    onevent.call(this, packet);    // original call
    packet.data = ["*"].concat(args);
    onevent.call(this, packet);      // additional call to catch-all
};
socket.on("*", function (event, data) {
    s_io.emit(event,  data);
});
socket.on("contest", function (data) {
    s_io.emit('contest', data);
});
socket.on("question",(data)=>{
    s_io.emit('question',data);
})