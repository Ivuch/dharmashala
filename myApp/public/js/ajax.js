var baseURL = "http://"+document.domain+":8080"
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
  var user = $("input[name=user]")
  var pass = document.getElementById("loginForm").elements["password"]
  var params = "user="+user.val()+"&password="+pass.value
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
              user.addClass("error")
              pass.classList.add("error")
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

/**  AJAX Request Template1: **/
function ajaxReq(){
	var text = document.getElementById("chatForm").elements["text"]
  socket.emit('chat message', text.value)
}

socket.on('chat message', function(msg){
  var text = document.getElementById("chatForm").elements["text"]
  var chat = document.getElementById("chatContent")
  var finalMsg = getEmojis(msg)
  chat.innerHTML = chat.innerHTML+'<br>'+'<span>'+finalMsg+'</span>';
  updateScroll()
  text.value = ""
});
 /* AJAX Request Template2: "HTTP POST verb - Chat AJAX implementation."
function ajaxReq(){
  var text = document.getElementById("chatForm").elements["text"]
  var chat = document.getElementById("chatContent")
  var url = baseURL+"/text"
  var params = "text="+text.value
  var xhr = getNewXHRObject()
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE ) {
     if(xhr.status == 200){
     		var json = JSON.parse(xhr.responseText)        
        var finalMsg = getEmojis(json.text)
        chat.innerHTML = chat.innerHTML+'<br>'+'<span>'+finalMsg+'</span>';
        updateScroll()
        text.value = ""
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
*/

function getEmojis(msg){
    var finalMsg = msg.replace(/:P/g, '<img src="images/emoticons/lengua2.gif"/>')
        finalMsg = finalMsg.replace(/:p/g,'<img src="images/emoticons/lengua2.gif"/>')
        finalMsg = finalMsg.replace(/\(H\)/g, '<img src="images/emoticons/canchero2.gif"/>')
        finalMsg = finalMsg.replace(/\(h\)/g, '<img src="images/emoticons/canchero2.gif"/>')
        finalMsg = finalMsg.replace(/:oc/g,'<img src="images/emoticons/seeclaro.gif"/>')
        finalMsg = finalMsg.replace(/\(U\)/g,'<img src="images/emoticons/brheart.gif"/>')
        finalMsg = finalMsg.replace(/\(u\)/g,'<img src="images/emoticons/brheart.gif"/>')
        finalMsg = finalMsg.replace(/:O/g,'<img src="images/emoticons/oooo.gif"/>')
        finalMsg = finalMsg.replace(/:o/g,'<img src="images/emoticons/oooo.gif"/>')
        finalMsg = finalMsg.replace(/nono/g,'<img src="images/emoticons/nono.gif"/>')
        finalMsg = finalMsg.replace(/\(L\)/g,'<img src="images/emoticons/heart.gif"/>')
        finalMsg = finalMsg.replace(/\(l\)/g,'<img src="images/emoticons/heart.gif"/>')
        finalMsg = finalMsg.replace(/:\)/g,'<img src="images/emoticons/smile.gif"/>')
        finalMsg = finalMsg.replace(/:\(/g,'<img src="images/emoticons/sad.gif"/>')
        finalMsg = finalMsg.replace(/:D/g,'<img src="images/emoticons/happy.gif"/>')
        finalMsg = finalMsg.replace(/dddd/g,'<img src="images/emoticons/lengua.gif"/>')
        finalMsg = finalMsg.replace(/noniii/g,'<img src="images/emoticons/noni.gif"/>')
        finalMsg = finalMsg.replace(/;\)/g,'<img src="images/emoticons/wink.gif"/>')
        return finalMsg
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