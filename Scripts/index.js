"use strict";
$(document).ready(() => {
//cookie
  //if theres a cookie
  //get the array and pass it to the API
  // if no cookie
  //create one
  const apiKey = "NMBJV9I1JXOWWEZ6";



  // Check if there is a cookie and retrieve the array if it exists
  //const cookieExists = checkCookie();
  let favorites = ["TSLA", "AAPL", "AMZN", "MSFT"];
  /*if (cookieExists) {
    favorites = JSON.parse(getCookie("favorites"));
  }*/

    // Loop through the favorites array and make API requests for each stock
    favorites.forEach((stock) => {
      $.getJSON(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&outputsize=full&apikey=${apiKey}`
      ).then((data) => {
        name = stock;
        const stockInfo = data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]];
        const stockPrice = parseFloat(stockInfo["4. close"]).toFixed(2);
        $('#favorites').append(`
        <a onclick="showStock('${stock}')">
        <div class="stock_box">
           <button>Delete</button>
          <h2>${stock}</h2>
        
          <h2 class="stock_price">$${stockPrice}</h2>
        </div></a>
      `);
      });
    });
  });

  // Function to add a stock to favorites array and create/update cookie

function showStock(stock = "aaple"){
  console.log(stock);
  localStorage.setItem("stock", stock);
  window.location.assign("../stock.html");
}
function addStock() {
  let popup = document.getElementById("add_popup");
  document.location.reload();
}
  // Show add stock popup


  // Hide add stock popup


  // Delete stock from favorites array and update cookie

  // Function to check if a cookie exists

/*  function checkCookie() {
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

*/