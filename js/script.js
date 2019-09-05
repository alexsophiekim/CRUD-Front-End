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
    workCards();
  },
  error:function(err){
    console.log(err);
    console.log('Something went wrongs');
  }
});

workCards = () => {
  $.ajax({
    url: `${url}/view`,
    type: 'GET',
    dataType:'json',
    success:function(data) {
      // console.log(data);
      $("#cardContainer").empty();

      for (var i = 0; i < data.length; i++) {
        $('#cardContainer').append(
          `<div class="card col-3 mr-2 mb-3">
            <img id="workImg" src="https://via.placeholder.com/150" class="card-img-top">
              <div>
               <div id="worktitle" class="card-title"><h5 class="card-title text-center mt-3" data-id="${data[i].workName}">${data[i].workName}</h5></div>

                <p id="workAuthor" class="card-text text-center">${data[i].workAuthor}</p>
                <div class="d-flex justify-content-between align-items-center btn-group mt-5 col-12">
                  <button type="button" class="btn btn-link text-warning d-none">Edit</button>
                  <button type="button" class="btn btn-link text-danger d-none deleteBtn">Delete</button>
                </div>

              </div>
          </div>`
        );
      }
    },
    error: function(err){
      console.log(err);
      console.log('something went wrong with getting all the products');
    }
  })
}

$('#submittedWork').click(function(){
  event.preventDefault();
  console.log('clicked');
  let workItem = $('#workItem').val();
  let workAuthor = $('#workAuthor').val();
  let authorURL = $('#authorURL').val();
  let imageURL = $('#imageURL').val();

  if(workItem.length === 0){
    console.log('Please give a title for this project');
  }else if(workAuthor.length === 0){
    console.log('Please give an image URL for this project');
  }else if(authorURL.length === 0){
    console.log('Please give an author for this project');
  }else if(imageURL.length === 0){
    console.log('Please give a URL for this project');
  }else {
    console.log('make request');
    $.ajax({
      url: `${url}/add`,
      type: 'POST',
      data: {
        workName: workItem,
        workAuthor: workAuthor,
        workImg: imageURL,
        authorURL: authorURL,
      },
      success:function(result){
        console.log(workItem);
        console.log(workAuthor);
        console.log(authorURL);
        console.log(imageURL);
        $('#workItem').val(null);
        $('#workAuthor').val(null);
        $('#authorURL').val(null);
        $('#imageURL').val(null);

        $('#cardContainer').append(
          `<div class="card col-3 mr-2 mb-3">
            <img id="workImg" src="https://via.placeholder.com/150" class="card-img-top">
              <div>
               <div id="worktitle" class="card-title"><h5 class="card-title text-center mt-3" data-id="${result.workName}">${result.workName}</h5></div>

                <p id="workAuthor" class="card-text text-center">${result.workAuthor}</p>
                <div class="d-flex justify-content-between align-items-center btn-group mt-5 col-12">
                  <button type="button" class="btn btn-link text-warning d-none">Edit</button>
                  <button type="button" class="btn btn-link text-danger d-none deleteBtn">Delete</button>
                </div>

              </div>
          </div>`
        );
      },
      error:function(err){
        console.log(err);
        console.log('oops, something went wrong');
      }
    });
  }
});

$('#cardContainer').on('click', '.deleteBtn', function(){
    event.preventDefault();
    // console.log('clicked');
    const workItem = $(this).parent().parent().data('id');
    console.log(workItem);
    // const li = $(this).parent().parent();



    // $.ajax({
    //   url: `${url}/product/${id}`,
    //   type: 'DELETE',
    //   data: {
    //       workItem: sessionStorage['userID']
    //   },
    //   success:function(result){
    //       if(result == '401'){
    //           alert('401 UNAUTHORIZED');
    //       } else {
    //           li.remove();
    //       }
    //   },
    //   error:function(err) {
    //     console.log(err);
    //     console.log('something went wrong deleting the product');
    //   }
    // })
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
          if (result === 'Sorry, this is already existed') {
            $('#authForm').modal('show');
            $('#errRego').append('<p class="text-danger">Sorry, this is already existes</p>');
          } else {
            $('#authForm').modal('hide');
            $('#loginBtn').text('log out');

            $('#jumbotron-heading').text('Welcome ' + username)

            $('.btn-link').removeClass('d-none');
          }
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
      type: 'GET',
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

            $('#authForm').modal('hide');
            $('#loginBtn').text('log out');

            $('#jumbotron-heading').text('Welcome ' + username)

            $('.btn-link').removeClass('d-none');

          }
      },
      error: function(err){
          console.log(err);
          console.log('Something went wrong');
      }
    })
  }
});
