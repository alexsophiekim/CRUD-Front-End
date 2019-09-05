let serverURL;
let serverPort;
let url;
let editing = false;

$.ajax({
    url:'config.json',
    type:'GET',
    dataType:'json',
    success:function(keys){
      console.log(keys);
      serverURL = keys['SERVER_URL'];
      serverPort = keys['SERVER_PORT'];
      url = `${keys['SERVER_URL']}:${keys['SERVER_PORT']}`;
    },
    error:function(err){
      console.log(err);
      console.log('Something went wrongs');
    }
});


$('.btn-success').click(function(){
  $('#cardContainer').append(
    `<div class="col-12 mb-3">
       <div class="card">
       <img id="workImg" src="" class="card-img-top">
         <div class="card-body">
           <div id="worktitle" class="card-title"><h5 class="card-title text-center"></h5></div>
           <div class="card-body">
             <p id="workAuthor" class="card-text text-center"></p>
           </div>
         </div>
       </div>
      </div>`);
});

$('#loginBtn').click(function(){
    $('#authForm').modal('show');
})

$('#loginTabBtn').click(function(){
  event.preventDefault();
  $('.nav-link').removeClass('active');
  $(this).addClass('active');
  $('#loginForm').show();
  $('#registerForm').hide();
});

$('#RegisterTabBtn').click(function(){
  event.preventDefault();
  $('.nav-link').removeClass('active');
  $(this).addClass('active');
  $('#loginForm').hide();
  $('#registerForm').removeClass('d-none').show();
});

$('#registerForm').submit(function(){
  event.preventDefault();
  const username = $('#rUsername').val();
  const email = $('#rEmail').val();
  const password = $('#rPassword').val();
  const confirmPassword = $('#rConfirmPassword').val();

  if(username.length === 0){
       console.log('please enter a username');
   } else if(email.length === 0){
       console.log('please enter an email');
   } else if(password.length === 0){
       console.log('please enter a password');
   } else if(confirmPassword.length === 0){
       console.log('please confirm your password');
   } else if(password !== confirmPassword){
       console.log('your passwords do not match');
   } else {
     $.ajax({
       url: `${url}/users`,
       type: 'POST',
       data: {
         username: username,
         email: email,
         password: password
       },
       success: function(result){
          console.log(result);
       },
       error: function(){
          console.log(err);
          console.log('Something went wrong');
       }
     })
   }
});


$('#loginForm').submit(function(){
  event.preventDefault();
  const username = $('#lUsername').val();
  const password = $('#lPassword').val();

  if ((username.length === 0)||(password.length === 0)) {
      console.log('Please enter your username and password');
  } else {
    $.ajax({
      url: `${url}/getUser`,
      type: 'POST',
      data: {
        username: username,
        password: password
      },
      success: function(result){
          if (result === 'invalid user') {
            console.log('cannot find user with that username');
          } else if (result === 'invalid password') {
            console.log('your password id wrong');
          } else {
            console.log('lets log you in');
            console.log(result);

            $('#authForm').modal('hide');
            $('#loginBtn').hide();
            $('#logoutBtn').removeClass('d-none');
          }
      },
      error: function(err){
          console.log(err);
          console.log('Something went wrong');
      }
    })
  }
});
