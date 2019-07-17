# Kubernetes-3d-vizualizer

Interact with your kubernetes cluster in 3d. <br/>
View pod logs and details with a single click. <br/>
See what the cluster is doing by seeing events happen without typing commands. <br/>
Delete pods and watch the cluster orchestration do its work. <br/>

Also working with Minikube. <br/>

![](/k8s8.gif)

## Prerequisites <br/>
This new version is based on nodejs and everything is done from within the pod. <br/>
Make sure the pod has enough rights to read other pods etc. (it will use the pod serviceaccount rights ) <br/>
I will give example files later on. <br/>

To use: run a pod with: reneschoonrok/kubernetes-3d-visualizer:latest it will use port 80 (and is based on node10-alpine) <br/>
Start the pod with an env variable: 'TOKEN' and a value and use that value in the app to view logs and delete pods. <br/>

Do not use on production systems yet!
I am not an expert on nodeJS or CSS, but I do like to build things.

#### Credits to..
Threejs as this app makes use of:
https://threejs.org/docs/#examples/renderers/CSS3DRenderer

Godaddy kubernetes-client:
https://github.com/godaddy/kubernetes-client

Based on an example from:
https://threejs.org/examples/css3d_periodictable.html
