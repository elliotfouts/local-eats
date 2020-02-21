// entrance animation
animationDelay = 100;
setTimeout(function() {
  $("#overlay").addClass("after");
  $(".searchbar").addClass("appear");
  $(".filter-button").addClass("appear");
  $(".img-banner").addClass("grow");
  $(".result-title").addClass("appear");
}, animationDelay);
// grabs initial search result from local storage
function initResults() {
  var city = localStorage.getItem("city");
  loadResults(city);
}
initResults();
// grabs new search value
$(".result-search-button").click(function() {
  $(".results-container").empty();
  var city = $(".searchbar-input").val();
  localStorage.setItem("city", city);
  loadResults(city);
});
// actually loads the search results
function loadResults(city) {
  for (var i = 0; i < city.length; i++) {
    if (city[i] == ",") {
      city = city.substr(0, i);
    }
  }
  $(".result-city-name").text(city);
  collectingCityID(city);
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
var restaurantsArray;
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
    restaurantsArray = response.restaurants;
  });
}
function restaurantPrice(restaurantsArray) {
  for (var i = 0; i < restaurantsArray.length; i++) {
    var newDiv = $("<div>");
    newDiv.addClass("result");
    newDiv.attr("data-restInfo", JSON.stringify(restaurantsArray[i]));
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
    // Cuisine Filter Function
    cuisineFilter(type, newDiv);
    var price = $("<h3>");
    price.addClass("result-price");
    var priceNum = restaurantsArray[i].restaurant.price_range;

    if (priceNum <= 1) {
      price.text("$");
    } else if (priceNum <= 2) {
      price.text("$$");
    } else if (priceNum <= 3) {
      price.text("$$$");
    } else if (priceNum <= 4) {
      price.text("$$$$");
    } else if (priceNum >= 5) {
      price.text("$$$$$");
    }
    // Price Filter Function
    priceFilter(priceNum, newDiv);
    // Caliber Filter Function
    var caliber = restaurantsArray[i].restaurant.user_rating.aggregate_rating;
    caliberSlider(caliber, newDiv);
    // Delivery Available Filter Function
    var deliveryAvailable = restaurantsArray[i].restaurant.has_online_delivery;
    devileryAvailability(deliveryAvailable, newDiv);
    newDiv2.append(cuisine).append(price);
    $(".results-container").append(newDiv);
  }
  var i = 0;
  var animationInterval = setInterval(function() {
    $(".result")
      .eq(i)
      .addClass("appear");

    if (i == restaurantsArray.length) {
      clearInterval(animationInterval);
    }
    i++;
  }, 200);
}
$(document).on("click", ".result", function() {
  var resultArr = $(".result");
  var restInfoArr = [];
  var photoUrlArr = [];
  var restInfo = $(this).attr("data-restInfo");
  localStorage.setItem("restInfo", restInfo);
  for (var i = 0; i < 4; i++) {
    var restInfoExtra = JSON.parse(resultArr.eq(i).attr("data-restInfo"));
    var photoUrl = restInfoExtra.restaurant.featured_image;
    restInfoArr.push(restInfoExtra);
    photoUrlArr.push(photoUrl);
    console.log(restInfoArr);
  }
  localStorage.setItem("restInfoAdditional", JSON.stringify(restInfoArr));
  localStorage.setItem("photoUrlArr", JSON.stringify(photoUrlArr));
  $("#overlay").removeClass("after");
  setTimeout(function() {
    location.replace("restaurant.html");
  }, 700);
});
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
var saveButton = document.querySelector(".save-button");
filterButton.addEventListener("click", function() {
  menuElement.classList.add("open");
});
// Saved Filtered Options
saveButton.addEventListener("click", function() {
  var foodieLevelSliderInput = $(".menu-slider-foodie").val();
  var priceLevelSliderInput = $(".menu-slider-price").val();
  var olDeliveryCheckbox = $(".online-delivery");
  localStorage.setItem("foodieLevelSlider", foodieLevelSliderInput);
  localStorage.setItem("priceLevelSlider", priceLevelSliderInput);
  if (olDeliveryCheckbox.prop("checked")) {
    localStorage.setItem("olDeliveryCheckBox", $(".online-delivery").val());
  } else {
    localStorage.setItem("olDeliveryCheckBox", "0");
  }
  var cuisineArray = $(".radio-button");
  var isChecked = [];
  for (let i = 0; i < cuisineArray.length; i++) {
    isChecked.push(cuisineArray.eq(i).prop("checked"));
  }
  localStorage.setItem("cuisineArray", JSON.stringify(isChecked));
  menuElement.classList.remove("open");
<<<<<<< HEAD
  $(".results-container").empty();
  restaurantPrice(restaurantsArray);
=======

    $(".results-container").empty()

    restaurantPrice(restaurantsArray)
  }
>>>>>>> 9ba9011089f0bd096842aaaf77bab9b3fd5c0b3b
});
closeButton.addEventListener("click", function() {
  menuElement.classList.remove("open");
});
function cuisineFilter(type, specificResult) {
  var cuisineArray = $(".radio-button");
  var cuisineChoices = $(".cuisine-option");
  for (let f = 0; f < type.length; f++) {
    if (type[f] == ",") {
      type = type.substr(0, f);
    }
  }
  if (
    ($("#American").prop("checked") == false && type == "American") ||
    type == "Burger" ||
    type == "Sandwich" ||
    type == "Steak" ||
    type == "Bar Food" ||
    type == "New American" ||
    type == "Southern"
  ) {
    specificResult.addClass("hide");
  }
  if ($("#Chinese").prop("checked") == false && type == "Chinese") {
    specificResult.addClass("hide");
  }
  if (
    ($("#Mexican").prop("checked") == false && type == "Mexican") ||
    type == "Spanish" ||
    type == "Tapas" ||
    type == "Latin American"
  ) {
    specificResult.addClass("hide");
  }
  if (
    ($("#Italian").prop("checked") == false && type == "Italian") ||
    type == "Pizza"
  ) {
    specificResult.addClass("hide");
  }
  if (
    ($("#Japanese").prop("checked") == false && type == "Japanese") ||
    type == "Seafood"
  ) {
    specificResult.addClass("hide");
  }
  if (
    ($("#Indian").prop("checked") == false && type == "Indian") ||
    type == "Northern Indian"
  ) {
    specificResult.addClass("hide");
  }
  if ($("#Fusion").prop("checked") == false && type == "Fusion") {
    specificResult.addClass("hide");
  }
  if (
    ($("#Cafe").prop("checked") == false && type == "Cafe") ||
    type == "French"
  ) {
    specificResult.addClass("hide");
  }
  if ($("#Dessert").prop("checked") == false && type == "Dessert") {
    specificResult.addClass("hide");
  }
}
function priceFilter(priceNum, specificResult) {
  // Hides results options that do not match the price range selected by the user
  var priceRange = localStorage.getItem("priceLevelSlider");
  if (priceRange <= 10 && priceNum >= 1) {
    specificResult.addClass("hide");
  } else if (priceRange <= 20 && priceNum >= 2) {
    specificResult.addClass("hide");
  } else if (priceRange <= 30 && priceNum >= 3) {
    specificResult.addClass("hide");
  } else if (priceRange <= 40 && priceNum >= 4) {
    specificResult.addClass("hide");
  } else if (priceRange >= 41 && priceNum <= 5) {
    specificResult.removeClass("hide");
  }
}
function caliberSlider(caliber, specificResult) {
  var caliberValueSlider = localStorage.getItem("foodieLevelSlider");
  if (caliberValueSlider <= 10 && caliber >= 1) {
    specificResult.addClass("hide");
  } else if (caliberValueSlider <= 20 && caliber >= 2) {
    specificResult.addClass("hide");
  } else if (caliberValueSlider <= 30 && caliber >= 3) {
    specificResult.addClass("hide");
  } else if (caliberValueSlider <= 40 && caliber >= 4) {
    specificResult.addClass("hide");
  } else if (caliberValueSlider >= 41 && caliber <= 5) {
    specificResult.removeClass("hide");
  }
}
function devileryAvailability(deliveryAvailable, specificResult) {
  var olDeliveryIsChecked = localStorage.getItem("olDeliveryCheckBox");
  // if its checked
  if (olDeliveryIsChecked == 1 && deliveryAvailable == 1) {
    specificResult.addClass("hide");
  } else if (olDeliveryIsChecked == 0 && deliveryAvailable == 0) {
    // Maybe the order of things are interfering
  }
}
// google autocomplete
// var input = document.querySelector(".searchbar-input");
// var autocomplete = new google.maps.places.Autocomplete(input,{types: ['(cities)']});
// $(window).on("scroll", function(){
//   var autocompleteAttr = $(".searchbar-input").attr("autocomplete");
//   // console.log(autocompleteAttr);
// })

// loading animation
<<<<<<< HEAD

=======
>>>>>>> 9ba9011089f0bd096842aaaf77bab9b3fd5c0b3b
window.addEventListener("load", function() {
  const loader = document.querySelector(".loader");
  // console.log(loader);
  loader.className += " hidden"; // class "loader hidden"
});
