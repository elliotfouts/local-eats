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
function initContent(restaurantInfo) {

    var name = restaurantInfo.restaurant.name;
    var foodieLevel = restaurantInfo.restaurant.user_rating.aggregate_rating;
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
        console.log("background: url:" + photoUrlArr[i] + ";")
    }
}
initContent(JSON.parse(localStorage.getItem("restInfo")));


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


// updates page if nearby restaurant is clicked 
$(document).on("click", ".content-preview", function(event){
    var restInfoNew = JSON.parse(event.target.getAttribute("data-restInfo"));
    initContent(restInfoNew);
})