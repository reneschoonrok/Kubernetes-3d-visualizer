# Kubernetes-3d-vizualizer

Interact with your kubernetes cluster in 3d..just by starting a pod. :) <br/>
<br/>
View pod logs, details and cluster events with a single click. <br/>
 <br/>
Delete pods and watch the cluster orchestration do its work. <br/>
<br/>
This version is built on Nodejs and everything is done from within the pod and cluster.  <br/>
No sidecar needed, no kubectl proxy needed. <br/>
<br/>
Make sure the pod has enough rights to read other pods and query kube-apiserver (it will use the pod serviceaccount rights). <br/>
<br/>
Also working with Minikube. <br/>
<br/>
![](/k8s8.gif)
<br/>
## Prerequisites <br/>
Get up and running with included yamls: <br/>
kubectl apply -f 1-deployment.yaml <br/> 
kubectl apply -f 2-service.yaml <br/>
minikube service kubernetes-3d <br/>
<br/>
This should open your browser and the page will show. <br/>
<br/>
Without yamls files: <br/>
kubectl create deployment kubernetes-3d --image=reneschoonrok/kubernetes-3d-visualizer:latest <br/>
kubectl expose deployment kubernetes-3d --type=LoadBalancer --port=80 <br/>
minikube service kubernetes-3d <br/>
<br/>
If you are not on minikube but on a full cluster than expose via loadbalancer/ingress etc.
<br/>
Cleanup: <br/>
kubectl delete service kubernetes-3d <br/>
kubectl delete deployment kubernetes-3d <br/>
<br/>
See deployment yaml for the TOKEN env var which can give rights to logfiles and pod deletion. <br/>
<br/>
<br/>
### Credits.. <br/>
Threejs as this app makes use of: <br/>
https://threejs.org/docs/#examples/renderers/CSS3DRenderer <br/>

Godaddy kubernetes-client: <br/>
https://github.com/godaddy/kubernetes-client <br/>

Based on an example from: <br/>
https://threejs.org/examples/css3d_periodictable.html <br/>
