$(document).ready(function () {
    startRequest();

    //Call the startRequest function every time button is clicked.
    let refreshQuote = document.querySelector(".refreshButton");
    refreshQuote.addEventListener("click", function(){
    startRequest();
    }, false);

}, false)


//Make an Ajax call to an API that returns a random quote. Returning the AJAX call (promise).
function quoteAPIRequest() {
    let data;
    let promise = $.ajax({
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
        headers: {
            'accepts': 'json',
            'X-Mashape-Key': 'FFZEl0a9f3msh57KQZDMGo2exgCop1H0W2JjsntQPH3pLqrTRY'
        }
    });

    return promise;
}

//Parse the paramater to JSON object and retrieve the values and assign the values to the html elements to render
//Also call tweetQuote
function showQuote(result) {
    let quoteObject = JSON.parse(result);
    let author = quoteObject.author;
    let quote = quoteObject.quote;

    document.querySelector(".quoteText").innerHTML = `"${quote}"`;
    document.querySelector(".authorName").innerHTML = `- ${author}`;
    tweetQuote(quote, author);
}

//Call the API request and if the return value is done then show the resulting quote other wise handle the failure
function startRequest(){
     quoteAPIRequest().done(function (result) {
        console.log("Ajax call was a success");
        showQuote(result);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error with the AJAX request: " + jqXHR.status + "  " + textStatus + "  " + errorThrown);
        document.querySelector(".quoteText").textContent = "Problem with connecteing to Server :(";

    })
}

//Assign the href attribute of element "a" with the proper url and paramaters
function tweetQuote(quote, author){
    let tweet = document.querySelector(".tweet");
    tweet.setAttribute("href", `https://twitter.com/intent/tweet?text="${quote}" -${author}`);
}