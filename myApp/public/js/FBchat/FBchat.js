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