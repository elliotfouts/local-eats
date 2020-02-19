// entrance animation
animationDelay = 100;
setTimeout(function(){
  $("#overlay").addClass("after")
  $(".searchbar").addClass("appear")
  $(".filter-button").addClass("appear")
  $(".img-banner").addClass("grow")
  $(".result-title").addClass("appear")
}, animationDelay)

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
  for (var i = 0; i < city.length; i++) {
    if (city[i] == ",") {
      city = city.substr(0, i);
    }
  }
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
    "&entity_type=city&count=30";
  $.ajax({
    url: queryURLestablishments,
    headers: {
      Accept: "application/json",
      "user-key": "b57e6ffbd82ae4ad1a93a7986917dcaa"
    },
    method: "GET"
  }).then(function(response) {
    restaurantPrice(response.restaurants);
  });
}

function restaurantPrice(restaurantsArray) {
  for (var i = 0; i < restaurantsArray.length; i++) {
    var newDiv = $("<div>");
    newDiv.addClass("result");
    newDiv.attr("data-restInfo",JSON.stringify(restaurantsArray[i]))

    console.log(restaurantsArray[i].restaurant)
    var restName = $("<h2>");
    restName.addClass("result-name");
    restName.text(restaurantsArray[i].restaurant.name);
    newDiv.append(restName);

    var newDiv2 = $("<div>");
    newDiv2.addClass("result-subtitle-container");
    newDiv.append(newDiv2);

    var cuisine = $("<h3>");
    cuisine.addClass("result-type");
    var type = restaurantsArray[i].restaurant.cuisines;
    if (type == "") {
      type = "unknown cuisine";
    }
    cuisine.text(type);

    var price = $("<h3>");
    price.addClass("result-price");
    var priceNum = restaurantsArray[i].restaurant.price_range
    
    if (priceNum <=1){
      price.text("$");
    } else if (priceNum <=2){
      price.text("$$");
    } else if (priceNum <=3){
      price.text("$$$");
    } else if (priceNum <=4){
      price.text("$$$$");
    } else if (priceNum >=5){
      price.text("$$$$$");
    }

    // Hides results options that do not match the price range selected by the user
    var priceRange = localStorage.getItem("priceLevelSlider")
    if(priceRange <= 10 && priceNum >= 1){
      $(".result").addClass("hide")
    } else if (priceRange <= 20 && priceNum >= 2){
      $(".result").addClass("hide")
    } else if (priceRange <= 30 && priceNum >= 3){
      $(".result").addClass("hide")
    } else if (priceRange <= 40 && priceNum >= 4){
      $(".result").addClass("hide")
    } else if (priceRange > 40 && priceNum >= 5){
    }

    newDiv2.append(cuisine).append(price);
    $(".results-container").append(newDiv);
  }
  var i = 0;
  var animationInterval = setInterval( function() {

    $(".result").eq(i).addClass("appear");
    
    if (i == restaurantsArray.length) {
      clearInterval(animationInterval)
    }

    i++;
  }, 200);
}


$(document).on("click",".result",function(){
  var resultArr = $(".result")
  var restInfoArr = [];
  var photoUrlArr = [];

  var restInfo = $(this).attr("data-restInfo")
  localStorage.setItem("restInfo", restInfo)

  for (var i = 0; i < 4; i++) {
    var restInfoExtra = JSON.parse(resultArr.eq(i).attr("data-restInfo"));
    var photoUrl = restInfoExtra.restaurant.featured_image;
    restInfoArr.push(restInfoExtra);
    photoUrlArr.push(photoUrl)
    console.log(restInfoArr)
  }
  localStorage.setItem("restInfoAdditional", JSON.stringify(restInfoArr));
  localStorage.setItem("photoUrlArr", JSON.stringify(photoUrlArr));
  $("#overlay").removeClass("after")
  setTimeout(function(){
      location.replace("restaurant.html");
  }, 700)
})

$(".fa-search").on("click", function(event) {
  event.preventDefault();

  var city = $(".searchbar-input").val();
  for (var i = 0; i < city.length; i++) {
    if (city[i] == ",") {
      city = city.substr(0, i);
    }
  }
  $(".result-city-name").text(city);

  collectingCityID(city);
});


// toggles menu open and closed 
var menuElement = document.querySelector("menu");
var filterButton = document.querySelector(".filter-button");
var closeButton = document.querySelector(".close-button");
var saveButton = document.querySelector(".save-button")

filterButton.addEventListener("click", function() {
  menuElement.classList.add("open");
});

// Saved Filtered Options 
saveButton.addEventListener("click", function() {
  var foodieLevelSliderInput = $(".menu-slider-foodie").val();
  var priceLevelSliderInput = $(".menu-slider-price").val();
  var openNowCheckBox = $(".open-now");
  var olDeliveryCheckbox = $(".online-delivery");

  localStorage.setItem("foodieLevelSlider", foodieLevelSliderInput);

  localStorage.setItem("priceLevelSlider", priceLevelSliderInput);

  if (openNowCheckBox.prop("checked")){
    localStorage.setItem("openNowCheckBox",openNowCheckBox.val());
  } else {
    localStorage.setItem("openNowCheckBox","0")
  }

  if (olDeliveryCheckbox.prop("checked")){
    localStorage.setItem("olDeliveryCheckBox",$(".online-delivery").val());
  } else {
    localStorage.setItem("olDeliveryCheckBox","0")
  }

  menuElement.classList.remove("open");
});

closeButton.addEventListener("click", function() {
  menuElement.classList.remove("open");
});

// google autocomplete 
var input = document.querySelector(".searchbar-input");
var autocomplete = new google.maps.places.Autocomplete(input,{types: ['(cities)']});

$(window).on("scroll", function(){
  var autocompleteAttr = $(".searchbar-input").attr("autocomplete");
  // console.log(autocompleteAttr);
})