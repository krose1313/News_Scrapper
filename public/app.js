// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p class='article' data-id='" + data[i]._id + "'><strong>" + (data[i].title).toUpperCase() + "</strong><br />" + data[i].byline + "<br />" + data[i].summary + " <img src='" + data[i].link + "' class='img-responsive' style='width:200px;height:200px'></p>");
  }
});

// When you click the Find Articles button
$(document).on("click", "#find", function (event) {
  // Now make an ajax call for the Scrape Article
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function (data) {
    $.ajax({
      method: "GET",
      url: "/articles"
    }).then(function  (data) {
      console.log(data);
      $("articles").append("#articlesHolder")
      for (var i = 0; i < data.length; i++) {
      // Display the article information on the page
        // $("#articlesHolder").append("<p class='article' data-id='" + data[i]._id + "'><strong>" + (data[i].title).toUpperCase() + "</strong><br />" + data[i].byline + "<br />" + data[i].summary + "<br /><img src='" + data[i].link + "' class='img-responsive' style='width:200px;height:200px'><br /><br /></p>");
        if (data[i].saved === true) {
        $("#articlesHolder").prepend(
              '<div class="row">' +
                '<div class="card" style= "width: 100%;">' +
                '<div class="card-body">' +
                '<h5 class="card-title">'+data[i].title+'</h5>' +
                '<h6 class="card-subtitle mb-2 text-muted">'+data[i].byline+'</h6>' +
                '<p class="card-text"></p>' +
                '<a href="'+data[i].link+'" class="card-link" target="_blank">View Article  </a>' +
                '<button type="button" class="btn btn-outline-primary saveArt" data-id="savedArtButton'+data[i]._id+'" disabled>Saved</button>' +
                '<button type="button" class="btn btn-outline-primary note-button" data-toggle="modal" data-target="#notesModal"' +
                    'id="notesButton'+data[i]._id+'" data-id= "'+data[i]._id+'">Notes</button>' + 
                    '</div></div>'
        );
        }else{
          $("#articlesHolder").prepend(
            '<div class="row">' +
            '<div class="card" style= "width: 100%;">' +
            '<div class="card-body">' +
            '<h5 class="card-title">'+data[i].title+'</h5>' +
            '<h6 class="card-subtitle mb-2 text-muted">'+data[i].byline+'</h6>' +
            '<p class="card-text"></p>' +
            '<a href="'+data[i].link+'" class="card-link" target="_blank">View Article  </a>' +
            '<button type="button" class="btn btn-outline-primary saveArt" data-id="saveArtButton'+data[i]._id+'">Save Article</button>' +
            '<button type="button" class="btn btn-outline-primary note-button" data-toggle="modal" data-target="#notesModal"' +
              'id="notesButton'+data[i]._id+'" data-id= "'+data[i]._id+'">Notes</button>' +
              '</div></div>'
          );
      }
      }
    })
  });
});

// declairing a global variabel for the id associated with each note button
var recentId = -1

// Whenever someone clicks on the Notes button the notes modal appears
$(document).on("click", ".note-button", function () {
  console.log('i was clicked')

  // fetch note associated with this article
  // then show the modal and display the note as well as the textarea
  // or store the value of the text area to be the origional note
  $("#notesModal").modal("show");
  recentId = $(this).attr("data-id");
  console.log(recentId);
});

// When you click the savenote button
$(document).on("click", "#saveNote", function () {
  // Grab the id associated with the article from the note button
  console.log('id', recentId)

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
      method: "POST",
      url: "/articles/" + recentId,
      data: {
        // Value taken from note body
        body: $("#notesField").val()
      }
    })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes body section
      $("#body").empty();
    });

    // Also, remove the values entered in the input and note body for note entry
    $("#notesField").val("");
    $("#notesModal").hide();

});

// When you click the 'Save Article' button
$(document).on("click", "#saveArtButton", function(){

})
