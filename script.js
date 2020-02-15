// grabs initial search result from local storage
function initResults() {
  var city = localStorage.getItem("city");
  loadResults(city);
}
initResults();

// grabs new search value 
$(".result-search-button").click(function(){
  $(".results-container").empty();
  var city = $(".searchbar-input").val();
  localStorage.setItem("city", city)
  loadResults(city);
});

// actually loads the search results 
function loadResults(city) {
  $(".result-city-name").text(city)
  collectingCityID(city)
}


function collectingCityID(city) {
  var queryURL =
    "https://developers.zomato.com/api/v2.1/locations?query=" + city;
  $.ajax({
    url: queryURL,
    headers: {
      Accept: "application/json",
      "user-key": "b57e6ffbd82ae4ad1a93a7986917dcaa"
    },
    method: "GET"
  }).then(function(response) {
    var entityID = response.location_suggestions[0].entity_id;
    // (/cities) response.location_suggestions[array with different stuff inside relating to the city (can have multiple searches, would need to edit url)].entity_id
    // The entity_id we collect in this call will need to be used to make a different ajax call that will provide us with restaurant info
    collectingEstablishmentID(entityID);
  });
}

function collectingEstablishmentID(entityID) {
  var queryURLestablishments =
    "https://developers.zomato.com/api/v2.1/search?entity_id=" +
    entityID +
    "&entity_type=city&count=10";
  $.ajax({
    url: queryURLestablishments,
    headers: {
      Accept: "application/json",
      "user-key": "b57e6ffbd82ae4ad1a93a7986917dcaa"
    },
    method: "GET"
  }).then(function(response) {
    console.log(response);
    restaurantPrice(response.restaurants);
  });
}

function restaurantPrice(restaurantsArray) {
  for (var i = 0; i < restaurantsArray.length; i++) {
    var newDiv = $("<div>");
    newDiv.addClass("result");
    var restName = $("<h2>");
    restName.addClass("result-name");
    restName.text(restaurantsArray[i].restaurant.name);
    newDiv.append(restName);
    var newDiv2 = $("<div>");
    newDiv2.addClass("result-subtitle-container");
    newDiv.append(newDiv2);
    var cuisine = $("<h3>");
    cuisine.addClass("result-type");
    cuisine.text(restaurantsArray[i].restaurant.cuisines);
    var price = $("<h3>");
    price.addClass("result-price");
    price.text(restaurantsArray[i].restaurant.price_range);
    newDiv2.append(cuisine).append(price);
    $(".results-container").append(newDiv);
  }
}

$(".results-container").click(".result", function() {
  console.log($(this).text());
});

// $(".fa-search").on("click", function(event) {
//   event.preventDefault();

//   var city = $(".searchbar-input").val();

//   $(".result-city-name").text(city);

//   collectingCityID(city);
// });
