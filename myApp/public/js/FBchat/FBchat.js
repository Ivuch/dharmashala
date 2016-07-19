/** Document.onLoad(callback)**/
document.addEventListener("DOMContentLoaded",function(){
  //no cookie? Why??? :(
  var url= baseURL+"/session?id="+document.cookie
  var xhr = getNewXHRObject();
  xhr.open("GET", url, true)
  xhr.send(null)
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE ) {
       if(xhr.status == 200){
          var user = JSON.parse(xhr.responseText)
          var name= user[0].nickname
          document.getElementById("chatHeader").innerHTML = name;
          if(name == 'Palomita'){
            $('header').html('<img src="images/logo.png">')
            $('header').addClass('pink')
            $('#chatHeader').addClass('pink')
            $('#contactsHeader').addClass('pink')
            $('span').addClass('pink')
          }else if(user[0].name == 'nextel'){
          //  $('header').html('<h1 style="display:inline; text-align:left;">Nextel ABM</h1>')
            $('header').addClass('nextel')
            $('#chatHeader').addClass('nextel')
            $('#contactsHeader').addClass('nextel')
            $('span').addClass('nextel')
          }
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

/* Funcion que devuevle "hey!" 
$('input[name="text"]').click(function(){
  var url = baseURL+"/text"
  var xhr = getNewXHRObject();
  xhr.open("GET", url, true)
  xhr.send(null)
  xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE ) {
         if(xhr.status == 200){
            var json = JSON.parse(xhr.responseText)
            var text= json.user.conversations[0].messages[0].text
            var chat = document.getElementById("chatContent")
            chat.innerHTML = chat.innerHTML+'<br><span>'+text+'</span>';
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
*/

var socket = io();

/**  AJAX Request Template1:  .broadcast**/
function sendMsg(){
  var text = document.getElementById("chatForm").elements["text"]
  var chat = document.getElementById("chatContent")
  socket.emit('chat message', text.value)
  var finalMsg = getEmojis(text.value)
  chat.innerHTML = chat.innerHTML+'<br>'+'<span class="ownMsg">'+finalMsg+'</span>'
  text.value = ""
  updateScroll()
}

socket.on('chat message', function(msg){
  var chat = document.getElementById("chatContent")
  var finalMsg = getEmojis(msg)
  chat.innerHTML = chat.innerHTML+'<br>'+'<span id="othersMsg">'+finalMsg+'</span>';
  updateScroll()
});

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

function addContact(){
  var url= baseURL+"/addContact"
  var xhr = getNewXHRObject();
  xhr.open("PUT", url, true)
  xhr.send(null)
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE ) {
       if(xhr.status == 200){
         alert("OK")
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