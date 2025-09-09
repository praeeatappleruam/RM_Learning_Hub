const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);
  
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/plain';
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 RM Training Platform Demo running at:`);
  console.log(`📱 Local: http://localhost:${PORT}`);
  console.log(`🌐 Network: http://192.168.1.100:${PORT}`);
  console.log(`\n✨ Demo Features:`);
  console.log(`   • Interactive simulation with AI customer`);
  console.log(`   • Real-time performance tracking`);
  console.log(`   • AI-powered recommendations`);
  console.log(`   • Navi mascot coaching system`);
  console.log(`\n🎯 Try these interactions:`);
  console.log(`   • Click Navi beaver for encouragement`);
  console.log(`   • Start a simulation in Simulation Lab`);
  console.log(`   • Generate recommendations`);
  console.log(`   • Use Alt+1-6 for quick navigation`);
});
