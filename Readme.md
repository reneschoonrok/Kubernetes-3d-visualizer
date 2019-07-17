# Kubernetes-3d-vizualizer

Interact with your kubernetes cluster in 3d..just by starting a pod. :) <br/>
<br/>
View pod logs, details and cluster events with a single click. <br/>
 <br/>
Delete pods and watch the cluster orchestration do its work. <br/>
<br/>
Also working with Minikube. <br/>
<br/>
![](/k8s8.gif)
<br/>
## Prerequisites <br/>
This version is built on Nodejs and everything is done from within the pod/cluster.  <br/>
No sidecar needed or no kubectl proxy needed, but make sure the pod has enough rights to read other pods etc (it will use the pod serviceaccount rights). <br/>

<br/>
Minikube instructions: <br/>
kubectl create deployment k8s3d --image=reneschoonrok/kubernetes-3d-visualizer:latest <br/>
kubectl expose deployment k8s3d --type=LoadBalancer --port=80 <br/>
minikube service k8s3d <br/>

Cleanup:
kubectl delete service k8s3d
kubectl delete deployment k8s3d
 <br/>
This should make the app available in your browser and you should see pods if you select a namespace where serviceacount has rights on. <br/>
If you use deployment yaml then you can add an env var: 'TOKEN' = <a value>. This can give access to logs and delete pods. <br/>
 <br/>
### Credits.. <br/>
Threejs as this app makes use of: <br/>
https://threejs.org/docs/#examples/renderers/CSS3DRenderer <br/>

Godaddy kubernetes-client: <br/>
https://github.com/godaddy/kubernetes-client <br/>

Based on an example from: <br/>
https://threejs.org/examples/css3d_periodictable.html <br/>
