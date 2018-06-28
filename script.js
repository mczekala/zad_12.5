$(document).ready(function() {

var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var isSending=false;
$("button").attr("disabled",false);
$.ajaxSetup({ cache: false });
getQuote();

function getQuote() {
    if(!isSending) {
        $("button").attr("disabled",true);
        isSending=true;
	   $.getJSON(prefix + quoteUrl, createTweet);
    }	
}

function createTweet(input) {
    var data = input[0];
    var quoteText = $(data.content).text().trim();
    var quoteAuthor = data.title;

    isSending=false;
    $("button").attr("disabled",false);
    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }
    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
    if (tweetText.length > 140) {
        getQuote();
    } 
    else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        $('.quote').text(quoteText);
        $('.author').text("Author: " + quoteAuthor);
        $('.tweet').attr('href', tweet);
    }

}
    $('.trigger').click(function() {
        getQuote();
    })
});