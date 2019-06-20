
var topics = ["cooking", "coding", "camping", "swimming", "boxing"];
var hobbyBtn;
var hobbyImage;

var rating;

function renderButtons() {

  $("#buttons").empty();

 
  $("#hobby-input").val("");

  for (var i=0; i < topics.length; i++) {

    var hobbyBtn = $("<button>");

    hobbyBtn.addClass("hobby-btn");

    hobbyBtn.attr("data-hobby", topics[i]);

    hobbyBtn.text(topics[i]);

  
    $("#buttons").append(hobbyBtn);

    console.log(topics[i]);
  }
}

function displayImages() {
  
  $("#gifs-appear-here").empty();
  $(".item").empty();

 

    var hobby = $(this).attr("data-hobby");
    console.log("this: " + this);
    console.log("hobby: " + hobby);
    
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hobby + "&api_key=sXElAiZCr49cM5Gy3s6YvqQSzT3pGw5Z";

    //
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    //
    .done(function(response) {

      console.log(response);
      //
      var results = response.data;


      var x = 10;
      
     
      for (var i = 0; i < x; i++) {
        console.log("results.length: " + results.length);
      
        var gifDiv = $("<div class='item float-left'>");

      
        var rating = results[i].rating;

        
        if (rating !== "r" && rating !== "pg-13") {
    
          var p = $("<p>");

         
          var hobbyImage = $("<img>");

      
          hobbyImage.attr("src", results[i].images.fixed_height_still.url);

          hobbyImage.attr("data-state", "still");

   
          hobbyImage.attr("data-still", results[i].images.fixed_height_still.url);

        
          hobbyImage.attr("data-animate", results[i].images.fixed_height.url);

          hobbyImage.addClass("gif");


          gifDiv.prepend(hobbyImage);
          gifDiv.prepend(p);


          $("#gifs-appear-here").prepend(gifDiv);
          
          
        }

        
        else {
          x++;
        }

          
      }

     
      $(".gif").on("click", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        }

        else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }
      });
    });
  
  }


$("#add-hobby").on("click", function(event) {
 
  event.preventDefault();

  var newTopic = $("#hobby-input").val().trim();

  topics.push(newTopic);

  renderButtons();

});

renderButtons();

$(document).on("click", ".hobby-btn", displayImages);
