$(document).ready(function(){
    let req = new XMLHttpRequest()

    req.open('GET','data/userinfo.json',true)
    req.onreadystatechange = function(){
        if(req.readyState != 4 || req.status != 200){
            return;
        }
        localStorage.setItem("userinfo",req.responseText)
    }
    req.onerror = function(){
        alert(req.responseText)
    }
    req.send()

	$('#btnLogin').on('click',function(event){
        let uname = $('#uname').val()
        let upass = $('#upass').val()
        $('#loginText').text = "Login successful"
        if(uname != '' && upass != ''){
            event.preventDefault()
            let userinfo = localStorage.getItem("userinfo")
            userinfo = JSON.parse(userinfo)
            userinfo = userinfo.filter(function(data){
                return data.uname === uname && data.upass === upass
            })

            let info = userinfo.length

            $('#loginText').css("margin-top","10px")
            $('#loginText').css("margin-bottom","-20px")
            
            if(info === 1){
                $('#loginText').css("color","green")
                $('#loginText').text("Login Successful!")
                window.open("play.html","_self")
            }else{
                $('#loginText').css("color","red")
                $('#loginText').text("Wrong Combination of Username & Password.")
            }
        }

	})
})