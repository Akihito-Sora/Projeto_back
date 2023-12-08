const swaggerAutogen = require('swagger-autogen')()

output = './swagger_doc.json'
endpoints = ['./app.js','./router_control/alunoAPI.js','./router_control/profAPI.js', './router_control/salaAPI.js', './router_control/installAPI' ,'./routes/login.js']


swaggerAutogen(output, endpoints)