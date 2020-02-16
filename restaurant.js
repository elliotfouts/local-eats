var nameElement = $(".content-title");
var avgPriceElement = $("#content-price-span");
var phoneNumberElement = $(".phone-number-span");
var addressElement = $(".address-span");
var urlElement = $("#content-website")
var urlElementSpan = $(".url-span");
var mapElement = $("#google-map");

var foodieLevel

// entrance animation
animationDelay = 100;
setTimeout(function(){
  $("#overlay").addClass("after")
}, animationDelay)

// updates content with latest restaurant 
function initContent(restaurantInfo) {
    
    var name = restaurantInfo.restaurant.name;
    foodieLevel = restaurantInfo.restaurant.user_rating.aggregate_rating;
    var avgPrice = "$" + restaurantInfo.restaurant.average_cost_for_two;
    var phoneNumber = restaurantInfo.restaurant.phone_numbers;
    var address = restaurantInfo.restaurant.location.address;
    var websiteUrl = restaurantInfo.restaurant.url;
    var latitude = restaurantInfo.restaurant.location.latitude;
    var longitude = restaurantInfo.restaurant.location.longitude;
    var googleMapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBJPnC19aXMo2B3ng58WQBA1RsmUEonMN8&q=" + address
    var restInfoAdditional = JSON.parse(localStorage.getItem("restInfoAdditional"))
    var photoUrlArr = JSON.parse(localStorage.getItem("photoUrlArr"))

    nameElement.text(name)
    avgPriceElement.text(avgPrice)
    phoneNumberElement.text(phoneNumber)
    addressElement.text(address)
    urlElementSpan.text("website")
    urlElement.attr("href", websiteUrl);
    urlElement.attr("target", "blank")
    mapElement.attr("src", googleMapUrl)
    for (i = 0; i < photoUrlArr.length; i++) {
        var previewElement = $(".content-preview").eq(i);
        previewElement.attr("style", "background: url('" + photoUrlArr[i] + "'); background-size: cover;background-position: center;")
        previewElement.attr("data-restInfo", JSON.stringify(restInfoAdditional[i]));
        // console.log("background: url:" + photoUrlArr[i] + ";")
    }
}
initContent(JSON.parse(localStorage.getItem("restInfo")));

function formatAddress () {}

function displayFoodieLevel () {
    var foodieLevelNum = parseInt(foodieLevel)
    var stars1 = $("<li>").addClass("fas fa-star fa-1x")
    var stars2 = $("<li>").addClass("fas fa-star fa-1x")
    var stars3 = $("<li>").addClass("fas fa-star fa-1x")
    var stars4 = $("<li>").addClass("fas fa-star fa-1x")
    var stars5 = $("<li>").addClass("fas fa-star fa-1x")
    
    if (foodieLevelNum <= 1){
        $("#content-rating-title").append(stars1)
    } else if (foodieLevelNum <=2){
        $("#content-rating-title").append(stars1)
        $("#content-rating-title").append(stars2)
    } else if (foodieLevelNum <=3){
        $("#content-rating-title").append(stars1)
        $("#content-rating-title").append(stars2)
        $("#content-rating-title").append(stars3)
    } else if (foodieLevelNum <=4){
        $("#content-rating-title").append(stars1)
        $("#content-rating-title").append(stars2)
        $("#content-rating-title").append(stars3)
        $("#content-rating-title").append(stars4)
    } else if (foodieLevelNum >=5){
        $("#content-rating-title").append(stars1)
        $("#content-rating-title").append(stars2)
        $("#content-rating-title").append(stars3)
        $("#content-rating-title").append(stars4)
        $("#content-rating-title").append(stars5)
    }
}
displayFoodieLevel()

// grabs new search value 
$(".fa-search").click(function(){
    var city = $(".search-InputBar").val();
    localStorage.setItem("city", city)
    $("#overlay").removeClass("after")
    setTimeout(function(){
        location.replace("results.html");
    }, 700)
  });


// updates page if nearby restaurant is clicked 
$(document).on("click", ".content-preview", function(event){
    var restInfoNew = JSON.parse(event.target.getAttribute("data-restInfo"));
    initContent(restInfoNew);
})

// google autocomplete 
var input = document.querySelector(".search-InputBar");
var autocomplete = new google.maps.places.Autocomplete(input,{types: ['(cities)']});