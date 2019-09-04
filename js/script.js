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


$('.btn-success').click(function(){
  $('#cardContainer').empty();
  for (var i = 0; i < data.length; i++) {
      let layout = `<div class="col-12 mb-3">
                     <div class="card">
                     <img id="workImg" src="" class="card-img-top">
                       <div class="card-body">
                         <div id="worktitle" class="card-title"><h5 class="card-title text-center"></h5></div>
                         <div class="card-body">
                           <p id="workAuthor" class="card-text text-center"></p>
                         </div>
                       </div>
                     </div>
                    </div>`
      $('#cardContainer').append(layout);
});
