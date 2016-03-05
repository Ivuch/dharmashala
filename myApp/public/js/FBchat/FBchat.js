/** Document.onLoad(callback)**/
document.addEventListener("DOMContentLoaded",function(){
  var url = baseURL+"/text"
  var xhr = getNewXHRObject();
  xhr.open("GET", url, true)
  xhr.send(null)

/*  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = "http://"+document.domain+":8080/socket.io/socket.io.js";
  document.body.appendChild(s)
*/
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

var socket = io();

//Para reemplazar código String por Emoji en el mismo Textbox
var textBox = $("input[name=text]")
textBox.change(function(){
  var a = textBox.val().replace(':P', '<img src="images/emoticons/lengua2.gif" alt=":P" />')
  textBox.html(a)
})

/* Ver si algo de esto funciona.
  var element = $('<img />');
  text = textBox.val().split(':P');
  $('.result').append(text[0],element,text[1]);
  $(element).attr('src','images/emoticons/lengua2.gif');
*/