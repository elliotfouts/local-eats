$(".home-search-button").on("click", function() {
    var city = $(".searchbar-input").val();
    localStorage.setItem("city", city)
    location.replace("results.html");
  });
