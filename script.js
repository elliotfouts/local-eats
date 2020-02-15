// grabs initial search result from local storage
function initResults() {
  var city = localStorage.getItem("city");
  loadResults(city);
}
initResults();

// grabs new search value 
$(".result-search-button").click(function(){
  var city = $(".searchbar-input").val();
  localStorage.setItem("city", city)
  loadResults(city);

});

// actually loads the search results 
function loadResults(city) {
  $(".result-city-name").text(city)
  collectingCityID(city)
}


function collectingCityID (city){

    var queryURL = "https://developers.zomato.com/api/v2.1/locations?query="+city

    $.ajax({
        url: queryURL,
        headers: {"Accept": "application/json","user-key": "b57e6ffbd82ae4ad1a93a7986917dcaa"},
        method: "GET"
      }).then(function(response){

        var entityID = response.location_suggestions[0].entity_id

        // (/cities) response.location_suggestions[array with different stuff inside relating to the city (can have multiple searches, would need to edit url)].entity_id
        // The entity_id we collect in this call will need to be used to make a different ajax call that will provide us with restaurant info  

        collectingEstablishmentID(entityID)

      })
}

function collectingEstablishmentID (entityID){
    var queryURLestablishments = "https://developers.zomato.com/api/v2.1/search?entity_id="+entityID+"&entity_type=city&count=10"

    $.ajax({
        url: queryURLestablishments,
        headers: {"Accept": "application/json","user-key": "b57e6ffbd82ae4ad1a93a7986917dcaa"},
        method: "GET"
      }).then(function(response){

        console.log(response);

        var foodType = response.restaurants[0].restaurant.cuisines;

        // this provides us with items such as the following: popularity, night life index, nearby rest., top cuisine, best rated restaurant array[10 choices], can also get lat and lon for top 10 rest. which we will need for google maps api 

        // RESTUARANT NAME 
        console.log(response.restaurants[0].restaurant.name)

        // RESTAURANT ADDRESS 
        console.log(response.restaurants[0].restaurant.location.address)

        // PHONE NUMBER 
        console.log(response.restaurants[0].restaurant.phone_numbers)

        // RESTAURANT WEBSITE 
        console.log(response.restaurants[0].restaurant.url)

      })

}



// function collectingEstablishmentID (entityID){
//   var queryURLestablishments = "https://developers.zomato.com/api/v2.1/search?entity_id="+entityID+"&entity_type=city&count=10"

//   $.ajax({
//       url: queryURLestablishments,
//       headers: {"Accept": "application/json","user-key": "b57e6ffbd82ae4ad1a93a7986917dcaa"},
//       method: "GET"
//     }).then(function(response){

//       // console.log(response)
//       // this provides us with items such as the following: popularity, night life index, nearby rest., top cuisine, best rated restaurant array[10 choices], can also get lat and lon for top 10 rest. which we will need for google maps api 


//       var restArray = response.restaurants

//       console.log(restArray)

//       for (let i = 0; i < restArray.length; i++) {
        
//         var resultDiv = $("<div>")
//         resultDiv.addClass("result")
//         resultDiv.attr("id", i)

//         var restNameDiv = $("<div>")
//         restNameDiv.addClass("result-name")
//         var restName = restArray[i].restaurant.name
//         $(".result-name").text(restName)

//         $(resultDiv).append(restNameDiv)

//         $(".results-container").append(resultDiv)
        
//       }


      // RESTUARANT NAME 
      // console.log(response.restaurants[0].restaurant.name)
      // var restName = response.restaurants[0].restaurant.name
      // $(".result-name").text(restName)

      // RESTAURANT ADDRESS 
      // console.log(response.restaurants[0].restaurant.location.address)


//     })
// }


// adds functionality to search buttons




