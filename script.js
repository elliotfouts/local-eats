function collectingCityID (city){

    var queryURL = "https://developers.zomato.com/api/v2.1/locations?query="+city

    $.ajax({
        url: queryURL,
        headers: {"Accept": "application/json","user-key": "b57e6ffbd82ae4ad1a93a7986917dcaa"},
        method: "GET"
      }).then(function(response){

        // console.log(response)
        var cityIDVal = response.location_suggestions
        console.log(cityIDVal)
        // (/cities) response.location_suggestions[array with different stuff inside relating to the city (can have multiple searches, would need to edit url)].entity_id
        // The entity_id we collect in this call will need to be used to make a different ajax call that will provide us with restaurant info  

        collectingEstablishmentID(cityIDVal)

      })
}

function collectingEstablishmentID (cityIDVal){
    var queryURLestablishments = "https://developers.zomato.com/api/v2.1/search?entity_id="+cityIDVal+"&count=100"

    $.ajax({
        url: queryURLestablishments,
        headers: {"Accept": "application/json","user-key": "b57e6ffbd82ae4ad1a93a7986917dcaa"},
        method: "GET"
      }).then(function(response){

        console.log(response)

        var foodType = response;
        // this provides us with items such as the following: popularity, night life index, nearby rest., top cuisine, best rated restaurant array[10 choices], can also get lat and lon for top 10 rest. which we will need for google maps api 
      })

}



$(".fa-search").on("click", function(event){
    event.preventDefault();
    
    var city = $(".searchbar-input").val();

    collectingCityID(city)
})

