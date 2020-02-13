function tryingout (city){

    var queryURL = "https://developers.zomato.com/api/v2.1/cities?q="+city

    $.ajax({
        url: queryURL,
        headers: {"Accept": "application/json","user-key": "b57e6ffbd82ae4ad1a93a7986917dcaa"},
        method: "GET"
      }).then(function(response){

        console.log(response)
      })
}

$(".btn").on("click", function(event){
    event.preventDefault();
    
    var city = $(".search-input").val();

    console.log(city)
})

