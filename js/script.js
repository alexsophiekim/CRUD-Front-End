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

WorkCards = () => {
  $.ajax({
    url: `${url}/view`,
    type: 'GET',
    dataType: 'json',
    success:function(data) {
      $("#cardContainer").empty();

      console.log(data);
      for (var i = 0; i < data.length; i++) {
        $('#cardContainer').append(
          `<div class="card col-3 mr-2 mb-3">
            <img id="workImg" src="https://via.placeholder.com/150" class="card-img-top">
              <div class="card-body">
               <div id="worktitle" class="card-title"><h5 class="card-title text-center">${data[i].workName}</h5></div>
               <div class="card-body">
                <p id="workAuthor" class="card-text text-center">${data[i].workAuthor}</p>
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

    $.ajax({
      url: `${url}/add`,
      type: 'POST',
      data: {
        workName: workName,
        workAuthor: workAuthor,
        workImg: workImg,
        authorURL: authorURL,
      },
      success:function(result){
        let workItem = $('#workItem').val(null);
        let workAuthor = $('#workAuthor').val(null);
        let authorURL = $('#authorURL').val(null);
        let imageURL = $('#imageURL').val(null);

        console.log(workItem);
        console.log(workAuthor);
        console.log(authorURL);
        console.log(imageURL);
      },
      error:function(err){
        console.log(err);
        console.log('oops, something went wrong');
      }
    });
  }
});
