//
// Retrieve pod info.
//
const Client = require('kubernetes-client').Client
const config = require('kubernetes-client/backends/request').config

const express = require('express')
const app = express()
const port = 80
var path = require('path');
var fs = require('fs');
var url = require('url');
var http = require('http');
var router = express.Router();
var envtoken = 'empty';
var authtoken = 'also empty';
const client = new Client({ version: '1.13' })



app.use(express.static('public'));
//require('./router/server')(app);
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '\views');
app.set('view engine', 'ejs');


async function getpods (namespace_name) {
  //console.log('envtoken'+ envtoken)
  //console.log('authtoken'+ authtoken)
  try {
    //console.log(namespace_name);
    let pods = await client.api.v1.namespaces(namespace_name).pods.get()
     //console.log(pods)
    return(pods);
  } catch (err) {
    console.error('Error: ', err)
  }
}

async function getdelete (namespace_name, mypodname, myauthtoken) {
   if (envtoken == myauthtoken) {
      try {
         //console.log(namespace_name);
         let pods = await client.api.v1.namespaces(namespace_name).pods(mypodname).delete()

         return(pods);
      } catch (err) {
          console.error('Error: ', err)
      }
   }
}

async function getpoddetails (namespace_name, poddetails_name) {
    try {
        //console.log(namespace_name);
        let pods = await client.api.v1.namespaces(namespace_name).pods(poddetails_name).get({
            qs: {
                tailLines: 20,
                pretty: true
            }
        })

        return(pods);
    } catch (err) {
        console.error('Error: ', err)
    }
}

async function getpodlogs (namespace_name, poddetails_name, myauthtoken) {
   if (envtoken == myauthtoken) {

      try {
        //console.log(namespace_name);
        //xhttp.open("GET", "http://localhost:8001/api/v1/namespaces/"+mynamespace+"/pods/"+event.target.children[2].id+"/log?tailLines=20", true);

        let pods = await client.api.v1.namespaces(namespace_name).pods(poddetails_name).log.get()

        return(pods);
      } catch (err) {
        console.error('Error: ', err)
      }
   }
}

async function getnodes (namespace_name) {
    try {
        //console.log(namespace_name);
        let nodes = await client.api.v1.nodes.get()
        return(nodes);
    } catch (err) {
        console.error('Error: ', err)
    }
}

async function getdeployments (namespace_name) {
    try {
        //console.log(namespace_name);
        let deployments = await client.apis.apps.v1.namespaces(namespace_name).deployments.get()
        return(deployments);
    } catch (err) {
        console.error('Error: ', err)
    }
}

async function getingress (namespace_name) {
    try {
        //console.log(namespace_name);
         //console.log('ingress opvragen!!!!!')
        let ingress = await client.apis.extensions.v1beta1.namespaces(namespace_name).ingresses.get()
        //console.log(ingress)
        return(ingress);
    } catch (err) {
        console.error('Error: ', err)
    }
}

async function getevents (namespace_name) {
    try {
        //console.log(namespace_name);
        //"http://localhost:8001/apis/extensions/v1beta1/namespaces/"+mynamespace+"/ingresses/",
        let myevents = await client.api.v1.namespaces(namespace_name).events.get()
        return(myevents);
    } catch (err) {
        console.error('Error: ', err)
    }
}


app.get('/', function (req, res) {
    res.render('../views/index.html');
    console.log("Home page displayed");
});

//app.get('/', function(req, res) {
//    res.sendFile(path.join(__dirname + '/style.css'));
//})

app.get('/api', (req, res) => res.send('Hello World!'))
app.get("/pods", function(httpRequest, httpResponse, next){
    var namespace_name =httpRequest.query.mynamespace;
    var pods = getpods(namespace_name)

   pods.then(function(result) {
       //console.log(result)
       httpResponse.send(result);
   });
});

app.get("/poddetail", function(httpRequest, httpResponse, next){
    var namespace_name =httpRequest.query.mynamespace;
    var poddetail_name =httpRequest.query.mypoddetail;

    var pods = getpoddetails(namespace_name, poddetail_name)

    pods.then(function(result) {
        //console.log(result)
        httpResponse.send(result);
    });
});

app.get("/podlogs", function(httpRequest, httpResponse, next){
    var namespace_name =httpRequest.query.mynamespace;
    var poddetail_name =httpRequest.query.mypoddetail;
    var myauthtoken =httpRequest.query.myauthtoken;

    var pods = getpodlogs(namespace_name, poddetail_name, myauthtoken)

    pods.then(function(result) {
        //console.log(result)
        httpResponse.send(result);
    });
});

app.get("/nodes", function(httpRequest, httpResponse, next){
    var namespace_name =httpRequest.query.mynamespace;
    var nodes = getnodes(namespace_name)

    nodes.then(function(result) {
        //console.log(result)
        httpResponse.send(result);
    });
});

app.get("/deployments", function(httpRequest, httpResponse, next){
    var namespace_name =httpRequest.query.mynamespace;
    var deployments = getdeployments(namespace_name)

    deployments.then(function(result) {
        //console.log(result)
        httpResponse.send(result);
    });
});

app.get("/getingress", function(httpRequest, httpResponse, next){
    var namespace_name =httpRequest.query.mynamespace;
    var ingress = getingress(namespace_name)

    ingress.then(function(result) {
        //console.log(result)
        httpResponse.send(result);
    });
});

app.get("/myevents", function(httpRequest, httpResponse, next){
    var namespace_name =httpRequest.query.mynamespace;
    var myevents = getevents(namespace_name)

    myevents.then(function(result) {
        //console.log(result)
        httpResponse.send(result);
    });
});

app.get("/deletepod", function(httpRequest, httpResponse, next){
    var namespace_name =httpRequest.query.mynamespace;
    var mypodname =httpRequest.query.podname;
    var myauthtoken =httpRequest.query.myauthtoken;
    var mydelete = getdelete(namespace_name, mypodname, myauthtoken)

    mydelete.then(function(result) {
        //console.log(result)
        httpResponse.send(result);
    });
});

app.get("/token", function(httpRequest, httpResponse, next){
    authtoken =httpRequest.query.mytoken;
    console.log('Setting token: '+ authtoken)

});

var server = app.listen(80, function () {

    var host = server.address().address
    var port = server.address().port
    envtoken = process.env.TOKEN
    //console.log(envtoken)
    console.log('Kubernetes-3d-vizualizer  listening at http://%s:%s', host, port);

});

