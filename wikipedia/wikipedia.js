
/*   wikipedia Viewer   */

//if every thing is ready, wait for input!
// the change in the text box running the functionality. 

$(document).ready(function(){
    $('#searchBox').change(function () {
        if ($('#searchBox').val()!=="") {
            sendingRequest();
            $('#searchForm').css("position","inherit");
        }
        else{
            $("#results").empty();
            $('#searchForm').css("position","absolute");
            $('#footer').css("position","absolute");
        }

    });
});

//sending the request and retrieving the data from wikipedia

function sendingRequest(e){
    var searchKey = $("#searchBox").val();
    $.getJSON("http://en.wikipedia.org/w/api.php?callback=?",{
        srsearch: searchKey,
        action: "query",
        list: "search",
        format: "json"
    },  function (searchResults,resultTest){ //displaying the results.
            if (!resultTest) {
                alert(" Wrong search!! ");
            }
            else{
            $("#results").empty();
            $('#footer').css("position","inherit");
            $.each(searchResults.query.search, 
                function(i,item){
                    $("#results").append("<div class='resultItem'><a target='_balnk' href='http://en.wikipedia.org/wiki/" +encodeURIComponent(item.title) + "'>" + item.title + "</a><p>" + item.snippet + "</p></div>");
                });
            }
        });
}        