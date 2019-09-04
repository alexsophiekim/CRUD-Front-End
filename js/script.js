console.log('js connected');

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

$('#submittedWork').click(function(){
  event.preventDefault();

  let workItem = $('#workItem').val();
  let workAuthor = $('#workAuthor').val();
  let authorURL = $('#authorURL').val();
  let imageURL = $('#imageURL').val();

  $('#cardContainer').append(
    `<div class="card col-3 mr-2 mb-3">
       <img id="workImg" src="https://via.placeholder.com/150" class="card-img-top">
         <div class="card-body">
           <div id="worktitle" class="card-title"><h5 class="card-title text-center">` + workItem +`</h5></div>
           <div class="card-body">
             <p id="workAuthor" class="card-text text-center">` + workAuthor +`</p>
           </div>
         </div>
       </div>`
    );
});
