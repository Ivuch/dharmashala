var user = $("input[name=user]")
var pass = $("input[name=password]")

/* Clear the element and remove error css-class*/
user.click(function(){
	$(this).removeClass("error")
})
user.focus(function(){user.click()})

/* Clear the element and remove error css-class*/
pass.focus(function(){pass.click()})
pass.click(function(){
	$(this).removeClass("error")
})