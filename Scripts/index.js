"use strict";
$(document).ready(() => {

  // Check if there is a cookie and retrieve the array if it exists
  const cookieExists = checkCookie();
  let favorites = [];
  if (cookieExists) {
    favorites = JSON.parse(getCookie("favorites"));
  }

  const apiKey = "NMBJV9I1JXOWWEZ6";

  // Loop through the favorites array and make API requests for each stock
  favorites.forEach((stock) => {
    $.getJSON(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&outputsize=full&apikey=${apiKey}`
    ).then((data) => {
      const stockInfo = data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]];
      const stockPrice = parseFloat(stockInfo["4. close"]).toFixed(2);

      $('#favorites').append(`
        <a onclick="showStock('${stock}')">
        <div class="stock_box">
           <button>Delete</button>
          <h2>${stock}</h2>
          <h2 class="stock_price">$${stockPrice}</h2>
        </div>
        </a>
      `);
    });
  });

  // Function to add a stock to favorites array and create/update cookie
  function addStock() {
    const stockInput = $("#add_form input[type=text]").val().toUpperCase();

    // Make sure input is not empty and stock is not already in favorites
    if (stockInput !== "" && !favorites.includes(stockInput)) {
      favorites.push(stockInput);

      // Create/update cookie
      setCookie("favorites", JSON.stringify(favorites), 365);

      // Make API request for the new stock and add it to the favorites list
      $.getJSON(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockInput}&outputsize=full&apikey=${apiKey}`
      ).then((data) => {
        const stockInfo = data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]];
        const stockPrice = parseFloat(stockInfo["4. close"]).toFixed(2);

        $('#favorites').append(`
          <a onclick="showStock('${stockInput}')">
          <div class="stock_box">
             <button>Delete</button>
            <h2>${stockInput}</h2>
            <h2 class="stock_price">$${stockPrice}</h2>
          </div>
          </a>
        `);
      });

      // Close add stock popup and clear input
      hideAdd();
      $("#add_form input[type=text]").val("");
    }
  }

  // Show add stock popup
  function showAdd() {
    $("#add_popup").show();
  }

  // Hide add stock popup
  function hideAdd() {
    $("#add_popup").hide();
  }

  // Delete stock from favorites array and update cookie
  function deleteStock(stock) {
    const index = favorites.indexOf(stock);
    favorites.splice(index, 1);
    setCookie("favorites", JSON.stringify(favorites), 365);
    $(`#${stock}`).remove();
  }

  // Function to check if a cookie exists
  function checkCookie() {
    return document.cookie.indexOf("favorites") !== -1;
  }

  // Function to set a cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
expires = "; expires=" + date.toUTCString();
}
document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get the value of a cookie
function getCookie(name) {
const nameEQ = name + "=";
const ca = document.cookie.split(";");
for (let i = 0; i < ca.length; i++) {
let c = ca[i];
while (c.charAt(0) == " ") {
c = c.substring(1, c.length);
}
if (c.indexOf(nameEQ) == 0) {
return c.substring(nameEQ.length, c.length);
}
}
return null;
}

});

