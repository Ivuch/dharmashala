function getNewXHRObject(){
  var xhr
  if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()// code for IE7+, Firefox, Chrome, Opera, Safari
  } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
    }
  return xhr;
}
document.addEventListener("DOMContentLoaded",function(){
  var url = "http://127.0.0.1:8082/text"
  var xhr = getNewXHRObject();
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

    xhr.open("GET", url, true)
    xhr.send(null)

})

function ajaxReq(){
	var text = document.getElementById("chatForm").elements["text"].value
	var urlPost = "http://127.0.0.1:8082/text"
	var params = "text="+text
  var xhr = getNewXHRObject()
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

    xhr.open("POST", urlPost, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
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