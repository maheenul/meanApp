const http = require('http');

// see ES6 conventions
const server = http.createServer((req,res)=>{
  res.end('This is my first response')
});

server.listen(process.env.PORT || 3000);
