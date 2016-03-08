var Service = require('node-windows').Service;
var winCommand = require('node-windows');
console.log(winCommand);
// Create a new service object
var svc = new Service({
  name:'Web service',
  description: 'The nodejs.org example web server.',
  script: require('path').join(__dirname,'webServer.js'),
  env:{
    name: "NODE_ENV",
    value: "production"
  }
});

console.log(svc.script);

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

// Just in case this file is run twice.
svc.on('alreadyinstalled',function(){
  console.log('This service is already installed.');
});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',function(){
  console.log("starting windows service");
  /*console.log("starting node command");
  const exec = require('child_process').exec;
  const child = exec('node index.js',
    (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });*/
});

// Install the script as a service.
svc.install();