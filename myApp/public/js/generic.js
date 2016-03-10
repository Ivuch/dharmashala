var user = $("input[name=user]")
var pass = $("input[name=password]")

/* Clear the element and remove error css-class*/
user.focus(function(){user.click()})
user.click(function(){
	$(this).removeClass("error")
	$(this).val("")
})

/* Clear the element and remove error css-class*/
pass.focus(function(){pass.click()})
pass.click(function(){
	$(this).removeClass("error")
	$(this).val("")
})