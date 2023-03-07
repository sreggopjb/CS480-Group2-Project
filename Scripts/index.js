"use strict";
const someStocks = ["AAPL", "AMZN", "MSFT", "TSLA"];
$(document).ready(() => {
//cookie
        //if theres a cookie
            //get the array and pass it to the API
        // if no cookie
            //create one
  const apiKey = "NMBJV9I1JXOWWEZ6";


  for (let i = 0; i < someStocks.length; i++) {
    $.getJSON(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${someStocks[i]}&outputsize=full&apikey=${apiKey}`
    ).then((data) => {
      const stockInfo = data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]];
      const stockPrice = parseFloat(stockInfo["4. close"]).toFixed(2);

      $('#favorites').append(`
        <a onclick="showStock(someStocks[i])">
        <div class="stock_box">
           <button>Delete</button>
           
          <h2>${someStocks[i]}</h2>
          <h2 class="stock_price">$${stockPrice}</h2>
        </div>
        </a>
      `);
    });
  }
});


function addStock(){
  let popup = document.getElementById("add_popup");
  document.location.reload();

}

