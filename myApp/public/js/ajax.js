var baseURL = "http://127.0.0.1:8082"
function getNewXHRObject(){
  var xhr
  if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()// code for IE7+, Firefox, Chrome, Opera, Safari
  } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
    }
  return xhr;
}

/** 
LOGIN function():
  Si el status = 200 inicia 
  El Content-type Negociation: 
        Si es "application/json" -->login con error (se setea la clase .error de CSS)
        Si es cualquier otro  -->> se hace un render al xhr.responseText (debería ser un HTML)
**/
function login(){
  var url = baseURL+"/login"
  var user = document.getElementById("loginForm").elements["user"].value
  var pass = document.getElementById("loginForm").elements["password"].value
  var params = "user="+user+"&password="+pass
  var xhr = getNewXHRObject()
  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params)
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE ) {
       if(xhr.status == 200){
          var content = xhr.getResponseHeader("Content-Type")
          if(content == "application/json; charset=utf-8"){
            var json = JSON.parse(xhr.responseText)
            if(json.isERROR){
              document.getElementById("loginForm").classList.add("error")
            }
          }else{
            document.open()
            document.write(xhr.responseText)
            document.close()
          }  
        }else if(xhr.status == 400) {
          alert('There was an error 400')
        }else {
          alert('something else other than 200 was returned')
      }
    }
  }
}

/** Document.onLoad(callback)**/
document.addEventListener("DOMContentLoaded",function(){
  var url = baseURL+"/text"
  var xhr = getNewXHRObject();
  xhr.open("GET", url, true)
  xhr.send(null)
  xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE ) {
         if(xhr.status == 200){
            var json = JSON.parse(xhr.responseText)
            var text= json.user.conversations[0].messages[0].text
             document.getElementById("chatContent").innerHTML = text;
         }
         else if(xhr.status == 400) {
            alert('There was an error 400')
         }
         else {
             alert('something else other than 200 was returned')
         }
      }
  }
})

/**  AJAX Request Template**/
function ajaxReq(){
  var url = baseURL+"/text"
	var text = document.getElementById("chatForm").elements["text"].value
	var params = "text="+text
  var xhr = getNewXHRObject()
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE ) {
     if(xhr.status == 200){
     		var json = JSON.parse(xhr.responseText)
        var chat = document.getElementById("chatContent")
        chat.innerHTML = chat.innerHTML+'<br>'+ json.text;
        updateScroll()
        document.getElementById("chatForm").elements["text"].value = ""
      }
      else if(xhr.status == 400) {
        alert('There was an error 400')
      }
      else {
         alert('something else other than 200 was returned')
      }
    }
  }
}

var scrolled = false;
function updateScroll(){
    if(!scrolled){
        var element = document.getElementById("chatContent");
        element.scrollTop = element.scrollHeight;
    }
}
/*If you want to scrolldown ONLY if the user didn't move
$("#yourDivID").on('scroll', function(){
    scrolled=true;
});
*/