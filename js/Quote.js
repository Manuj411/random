const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let ApiQuotes = [];

// Loading Spinner Shown
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQoute() {
    loading();
    const newqoute = ApiQuotes[Math.floor(Math.random() * ApiQuotes.length)]
    // Check if Author field is blank and replace it with 'Unknown'
    if (!newqoute.author) {
        authorText.textContent = 'Unknown';

    } else {
        authorText.textContent = newqoute.author;
    }

    // Check Quote length to determine styling
    if (newqoute.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = newqoute.text;
    complete();

}


// fetiching data from api
async function getqoutes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const Unparsedresponse = await fetch(apiUrl);
        ApiQuotes = await Unparsedresponse.json();
        newQoute()
    } catch (error) {

    }

}


function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}




//Event listeners 
newQuoteBtn.addEventListener('click', newQoute);
twitterBtn.addEventListener('click', tweetQuote);



getqoutes();