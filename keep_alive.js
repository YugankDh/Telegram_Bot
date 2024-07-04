var http = require('http')

http.createServer(fuction (req,res) {
  res.write("I'm alive")
  res.send
}).listen(8080)
