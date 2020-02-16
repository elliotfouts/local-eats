var nameElement = $(".content-title");
var avgPriceElement = $("#content-price-span");
var phoneNumberElement = $(".phone-number-span");
var addressElement = $(".address-span");
var urlElement = $("#content-website")
var urlElementSpan = $(".url-span");
var mapElement = $("#google-map");

// entrance animation
animationDelay = 100;
setTimeout(function(){
  $("#overlay").addClass("after")
}, animationDelay)

// updates content with latest restaurant 
function initContent() {
    var restaurantInfo = JSON.parse(localStorage.getItem("restInfo"));
    console.log(restaurantInfo);

    var name = restaurantInfo.restaurant.name;
    var foodieLevel = restaurantInfo.restaurant.user_rating.aggregate_rating;
    var avgPrice = "$" + restaurantInfo.restaurant.average_cost_for_two;
    var phoneNumber = restaurantInfo.restaurant.phone_numbers;
    var address = restaurantInfo.restaurant.location.address;
    var websiteUrl = restaurantInfo.restaurant.url;
    var latitude = restaurantInfo.restaurant.location.latitude;
    var longitude = restaurantInfo.restaurant.location.longitude;
    var googleMapUrl = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBJPnC19aXMo2B3ng58WQBA1RsmUEonMN8&q=" + address
    

    nameElement.text(name)
    avgPriceElement.text(avgPrice)
    phoneNumberElement.text(phoneNumber)
    addressElement.text(address)
    urlElementSpan.text("website")
    urlElement.attr("href", websiteUrl);
    urlElement.attr("target", "blank")
    mapElement.attr("src", googleMapUrl)
    console.log(mapElement);
}
initContent();


function formatAddress () {}
function displayFoodieLevel () {}


// grabs new search value 
$(".fa-search").click(function(){
    var city = $(".search-InputBar").val();
    localStorage.setItem("city", city)
    $("#overlay").removeClass("after")
    setTimeout(function(){
        location.replace("results.html");
    }, 700)
  });