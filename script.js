function collectingCityID (city){

    var queryURL = "https://developers.zomato.com/api/v2.1/locations?query="+city

    $.ajax({
        url: queryURL,
        headers: {"Accept": "application/json","user-key": "b57e6ffbd82ae4ad1a93a7986917dcaa"},
        method: "GET"
      }).then(function(response){

        console.log(response)
        var cityIDVal = response.location_suggestions[0].entity_id
        console.log(cityIDVal)
        // (/cities) response.location_suggestions[array with different stuff inside relating to the city (can have multiple searches, would need to edit url)].entity_id
        // The entity_id we collect in this call will need to be used to make a different ajax call that will provide us with restaurant info  

        collectingEstablishmentID(cityIDVal)

      })
}

function collectingEstablishmentID (cityIDVal){
    var queryURLestablishments = "https://developers.zomato.com/api/v2.1/location_details?entity_id="+cityIDVal+"&entity_type=city"

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

// GOOGLE MAPS - FOR LATER USE 
// var map 

// function initMap(){
//     map = new google.maps.Map($(".content-map"), {
//         center:{lat: -34.397 , lng: 150.644},
//         zoom:8
//     });
// }

$(".btn").on("click", function(event){
    event.preventDefault();
    
    var city = $(".search-input").val();

    collectingCityID(city)
})

