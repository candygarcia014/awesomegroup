
//checks if token is nonexistant or if it is expired, if so it generates a new one
function checkToken(){
  var token = JSON.parse(localStorage.getItem("token"));
  if(localStorage.getItem("token") == null ||  Date.now() > token.expiry + 3600000){
    getToken();
  };
};
//retrieves token from api
function getToken(){
  var queryURL = "https://api.petfinder.com/v2/oauth2/token";
  $.ajax({
  header: origin,
  url: queryURL,
  method: "POST",
  data:{"grant_type":"client_credentials",
        "client_id":"C38uh1DS4F1g75CUZCu8m7iq2hTY5358shsEX4IttueHZjaDMt",
        "client_secret":"AUqzbULUZJs5KL1j6T6iEoRxwIqNuyH3UMXCqvYU"
        }   
  }).then(function(response) {
    var now = Date.now();
    var token = {
      value: response.access_token,
      expiry: now
    }
    localStorage.setItem("token", JSON.stringify(token));
  })
};

// function to run when searching

  function search(){
   var linkAdd = "";
    if($("#cityInput1").val() != ""){
      //general syntax for adding new parameters for search. will be triggered by select inputs
      linkAdd = "location="+ $("#cityInput1").val();
      userlocation = $("cityInput1").val();
    }
    var linkAdd2="";
    if ($("#inputGroupSelect03").val() !="") {
      linkAdd2 = "type=" + $("#inputGroupSelect03").val() 
      } 
       var linkAdd3="";
      if ($("#inputGroupSelect04").val() !="") {
        linkAdd3 = "gender=" + $("#inputGroupSelect04").val() 
        }


      if ($("#breed-input").val() !="") {
        linkAdd5 = "type=" + $("#breed-input").val
      }

          var linkAdd4="";
        if ($("#inputGroupSelect05").val() !="") {
          linkAdd4 = "size=" + $("#inputGroupSelect05").val() 
          }
            var linkAdd5="";
              if ($("#breed-input").val() !="") {
              linkAdd5 = "breed=" + $("#breed-input").val()
                 }
      
  var token = JSON.parse(localStorage.getItem("token"));
    
      var token = JSON.parse(localStorage.getItem("token"));
      var queryURL = "https://api.petfinder.com/v2/animals?limit=10&distance=10&" + linkAdd + "&" + linkAdd2 + "&" + linkAdd3 + "&" + linkAdd4 + "&" + linkAdd5;
      console.log(queryURL);
      $.ajax({
        header:origin,
        url: queryURL,
        method: "GET",
        headers:{"Content-Type": "application/json","Authorization":"Bearer " + token.value}
      }).then(function(response){ 
        console.log (response)
       
        // $(".age").text(linkAdd2)
      });
   };
//runs 
  
     
        
          
            
            
            
checkToken();

//runs when search button is pressed 
$(".my-sm-0").on("click", function(event){
    event.preventDefault();
    checkToken();
    search();
});