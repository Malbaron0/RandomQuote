$(document).ready(function () {
    startRequest();

    //Call the startRequest function every time button is clicked.
    let refreshQuote = document.querySelector(".refreshButton");
    refreshQuote.addEventListener("click", function () {
        startRequest();
    }, false);

}, false)


//Make an Ajax call to an API that returns a random quote. Returning the AJAX call (promise).
function quoteAPIRequest() {
    return fetch('https://andruxnet-random-famous-quotes.p.rapidapi.com/?count=1', {
        headers: {
            "X-RapidAPI-Key": "Yp8LSdqwRwmshIZYexwjpMhSKbTTp1KlemHjsnKrRECZystDTs",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.json);
        })
        .catch(function (error) {
            console.log('There was a problem with the fetch request' + error.message);
            document.querySelector(".quoteText").textContent = "Problem with connecteing to Server :(";
        })
}

//Parse the paramater to JSON object and retrieve the values and assign the values to the html elements to render
//Also call tweetQuote
function showQuote(result) {
    let quoteObject = result[0];
    let author = quoteObject.author;
    let quote = quoteObject.quote;

    document.querySelector(".quoteText").innerHTML = `"${quote}"`;
    document.querySelector(".authorName").innerHTML = `- ${author}`;
    tweetQuote(quote, author);
}

//Call the API request and if the return value is done then show the resulting quote other wise handle the failure
async function startRequest() {
    let result = await quoteAPIRequest();
    showQuote(result);

}

//Assign the href attribute of element "a" with the proper url and paramaters
function tweetQuote(quote, author) {
    let tweet = document.querySelector(".tweet");
    tweet.setAttribute("href", `https://twitter.com/intent/tweet?text="${quote}" -${author}`);
}