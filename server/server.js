const http = require('http');
const fs = require('fs');
const cors = require('cors'); 

const server = http.createServer((req, res) => {

  cors()(req, res, () => {


  if (req.method === 'POST' && req.url === '/api') {
    let requestBody = '';

    req.on('data', (chunk) => {
      requestBody += chunk;
    });

    req.on('end', () => {
      
      fs.writeFile('currentState.txt', requestBody, (err) => {
        if (err) {
          res.statusCode = 500;
          res.end('Error saving data');
        } else {
          res.statusCode = 201;
          res.end('Data saved successfully');
          console.log(requestBody)

        }
      });
    });
  } else if (req.method === 'GET' && req.url === '/getCurrentState') {
    fs.readFile('currentState.txt', 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500; 
        res.end('Error reading data');
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Endpoint not found');
  }
}
)});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
