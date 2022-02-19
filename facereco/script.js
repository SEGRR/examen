var video = document.getElementById('video');

function startVideo(){
    navigator.mediaDevices.getUserMedia({video: {}}) 
    .then((stream)=> {video.srcObject = stream;},
     (err)=> console.error(err));
  }  

  startVideo();