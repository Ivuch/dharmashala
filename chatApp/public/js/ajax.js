function ajaxReq(){
	var text = document.getElementById("chatForm").elements["text"].value
	var url = "http://127.0.0.1:8081/text?text="+text
	var urlPost = "http://127.0.0.1:8081/text"
	var params = text
	var xhr;

    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

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

    xhr.open("POST", urlPost, true);
    xhr.send(params);
}