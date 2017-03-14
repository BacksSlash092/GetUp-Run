var startPos, watchID;

function startTracking(){
    
  if(navigator.geolocation){
      //initialize UI
      init() 
      document.querySelector('#main-header').style.color = "red";
      
      // Get Location
      navigator.geolocation.getCurrentPosition(showPosition, showError);
      
      // Watch Position
      watchID = navigator.geolocation.watchPosition(showPositionUpdate, showError);
      
      
  }  else {
      
      alert("Geolocation not Supported by your browser.")
  }
    
    
};


//Stop Tracking
function stopTracking(){
      document.querySelector('#main-header').style.color = "black";
      init()
      navigator.geolocation.clearWatch(watchID);
    
    
};




function showPosition(position){
    startPos = position; 
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude; 
    
    
};



function showPositionUpdate(position){
    
     document.getElementById('currentLat').innerHTML = position.coords.latitude;
     document.getElementById('currentLon').innerHTML = position.coords.longitude; 
    document.getElementById('distance').innerHTML = calculateDistance(position.coords.latitude, position.coords.longitude,startPos.coords.latitude, startPos.coords.longitude );
    
    
};

function showError(error){
    switch(error.code){
            
        case error.PERMISSION_DENIED:
            console.log("User Denied the request for Geolocation");
            break;
            
        case error.POSITION_UNAVAILABLE:
            console.log("Location Not Availible");
            break;
            
            
        case error.TIMEOUT:
            console.log("Timeout");
            break;
            
        case error.UNKOWN_ERROR:
            console.log("Error");
            break;
            
            
    }
    
};

function calculateDistance(lat1, lon1, lat2, lon2){
        	
    var R = 6371; // metres
    var dLat = (lat2 - lat1).toRad();
    var dLon = (lon2-lon1).toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLon/2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * C;
    return d;
   
    
};

function init(){
    
      document.querySelector('#startBtn').classList.toggle('hidden');
      document.querySelector('#stopBtn').classList.toggle('hidden');
      document.querySelector("#startLat").classList.toggle("active-cords");
      document.querySelector("#startLon").classList.toggle("active-cords");
      document.querySelector("#currentLat").classList.toggle("active-cords");
      document.querySelector("#currentLon").classList.toggle("active-cords");
}

