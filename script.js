console.log('Hello!');
//create name-space object
const app = {};
//API key for unsplash
app.Key = 'yVNgTxvzD5y8iYopBkUBQHX_YAHRhHuTxrj4Y88soJc'


app.getQuote = () => {
  //use ajax to reach out to Quote Garden API for a random quote
  const response = $.ajax({
    url: 'https://quote-garden.herokuapp.com/api/v3/quotes/random',
    method: 'GET',
    dataType: 'json'

  }).then((response) => {
    //extract the genre from the quote garden API call
    genre = response.data[0].quoteGenre;
    //use the quote genre as a search parameter in the unsplash API call
    return $.ajax({
      url: `https://api.unsplash.com/photos/random`,
      method: 'GET',
      dataType: 'json',
      data: {
        client_id: 'yVNgTxvzD5y8iYopBkUBQHX_YAHRhHuTxrj4Y88soJc',
        query: genre
      }
    }).then((responseSecond) => {
      //call displayBoth with the text, author, and img url
      text = response.data[0].quoteText
      author = response.data[0].quoteAuthor
      newPic = responseSecond.urls.regular
      app.displayBoth(text, author, newPic);
    });

  });

};

// displayBoth will display the pic and the quote on the page
app.displayBoth = function(response, responseSecond) {
  console.log(text, author, newPic);
  //create the HTML for the quote
  const quoteHTML = `
  <h2>${text}</h2>
  <h3>-${author}<h3>
  <h5 class='bottom'><a href='https://junocollege.com/'>Created at JUNO College</a><button id='btn' type='button'>New Quote</button></h5>
  `
  //use .css to set newPic as the background image on the page and then display new quote
  $("header").css("background-image", "url(" + newPic + ")");
  $('.newQuote').append(quoteHTML);

  // watch for user to click on the new quote button to refresh page
  $(function() {
    $('#btn').on('click', function () {
      $('h2').empty();
      app.getQuote();
    });
});
};

//kickoff everything
app.init = () => {
  app.getQuote();

};

$(document).ready(() => {
  app.init();
});