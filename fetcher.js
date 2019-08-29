const request = require('request');
const readline = require('readline');
const fs = require('fs');
let command = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const fetcher = function() {
  const net = require('net');
  const conn = net.createConnection({ 
    host: 'example.com',
    port: 80
  });

  conn.setEncoding('UTF8');
  request(command[0], (error, response, body) => {
  if(error){
     process.exit();
  } else {
  console.log('statusCode:', response && response.statusCode); 
  fs.access(command[1], fs.F_OK, (err) => {
    if(fs.existsSync(command[1])) {
      console.log('Path already exists');
      rl.question('Would you like to overwrite the file? Please, type \'y\' and press Enter if you would like to rewrite the file.\n', (answer) => {
      if(answer === 'y'){
        fs.writeFile(command[1], body, (err) => {
         if(err) console.log(err);
           conn.end();
       });
      }
      rl.close(); 
      });
    } else {
      fs.writeFile(command[1], body, (err) => {
      if(err) console.log(err);
        conn.end();
    });
  }
  console.log(err);
  });
  }
  });
};

fetcher();


