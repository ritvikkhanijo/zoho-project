//check env
var env = process.env.Node_ENV || 'development';

//fetch env
var config = require("./config.json");
var envConfig = config[env];

//add config.env to process.env
Object.keys(envConfig).forEach(key=>{
    process.env[key] = envConfig[key]
});