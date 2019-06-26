# Kubernetes-3d-vizualizer

This project renders your Kubernetes cluster in 3d: (Nodes, Pods, Namespaces, Deployments, Replicasets).  <br/>

You can also interact with the cluster: delete pods, increase/decrease replicas and open specs. <br/>

Also working with Minikube. <br/>

![](/k8s7.gif)

## Prerequisites

-Make sure you have kubectl API access via http://localhost:8001 (The command 'kubectl proxy' works in most cases). Atleast namespace rights needed.<br/>

-Run chrome with some extra flags to prevent CORS errors. Otherwise it will not show things. <br/>
 ("C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir=~/chromeTemp") <br/>

then goto localhost:80 If your chrome is correctly started (see above) it should work. <br/>

### Getting Started

Todo:  <br/>
-Add services to rendering <br/>
-Autodiscovery option for namespaces (make this an option) <br/>
-Clean up code <br/>

I am not an expert on JS or CSS, but I do like to build things.

#### Credits to..
Threejs as this app makes use of:
https://threejs.org/docs/#examples/renderers/CSS3DRenderer

Based on an example from:
https://threejs.org/examples/css3d_periodictable.html
