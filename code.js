
function breedSearch(){
    var input = $("#breedSearch").val()
    var queryURL = "https://api.thedogapi.com/v1/breeds"
      console.log(queryURL);
      $.ajax({
        header:origin,
        url: queryURL,
        method: "GET",
        headers:{"x-api-key": "444115c6-6719-4989-974c-15985644036e"}
      }).then(function(response){
          console.log(response)
        for(var i = 0; i < response.length; i++){
            if(response[i].name.toLowerCase().substring(0,4) == input.toLowerCase().substring(0,4)){
               var breed =  $("<h1 class = 'breed'>").html("Breed: " + response[i].name);
               var height =  $("<div class = 'height'>").html("Height: " + response[i].height.imperial + "in");
               var weight =  $("<div class = 'weight'>").html("Weight: " + response[i].weight.imperial + "lbs");
               var lifespan = $("<div class = 'lifespan'>").html("Lifespan: " + response[i].life_span);
                var temper = $("<div class = 'temper'>").html("Temperament: " + response[i].temperament);
                var bredFor = $("<div class = 'bredFor'>").html("Bred For: " + response[i].bred_for);
                var origin = $("<div class = 'origin'>").html("Origin: " + response[i].origin);
                if(response[i].name != undefined){
                    $(".breedInfo").prepend(breed)
                }
                if(response[i].height != undefined){
                    $(".breedInfo").append(height)
                }
                if(response[i].weight != undefined){
                    $(".breedInfo").append(weight)
                }
                if(response[i].life_span != undefined){
                    $(".breedInfo").append(lifespan)
                }
                if(response[i].temperament != undefined){
                    $(".breedInfo").append(temper)
                }
                if(response[i].bred_for != undefined){
                    $(".breedInfo").append(bredFor)
                }
                if(response[i].origin != undefined){
                    $(".breedInfo").append(origin)
                }

                var breed_id = response[i].id
                var queryURL = 'https://api.thedogapi.com/v1/images/search?include_breed=1&breed_id=' + breed_id
                $.ajax({
                    header:origin,
                    url: queryURL,
                    headers:{"x-api-key": "444115c6-6719-4989-974c-15985644036e"}
                }).then(function(response){
                    console.log(response)
                    var img = $("<img height='300px' src ="+response[0].url+">")
                    $(".breedInfo").prepend(img)
                });
                return;
            };
        };
        console.log (response)
      });
};

function clearSearch(){
    $(".breedInfo").html("")
};
$(".breedBtn").on("click", function(){
    event.preventDefault(); 

    clearSearch();
    breedSearch();
});