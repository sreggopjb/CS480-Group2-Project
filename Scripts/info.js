/* globals Chart:false, feather:false */
'use strict'
$(document).ready(() => {

    let stock = localStorage.getItem("stock");
    let  open, close, beta, pe, eps;
    const apiKey = "NMBJV9I1JXOWWEZ6";

    $("#stock_Title").text(stock);

    $.getJSON(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&outputsize=full&apikey=${apiKey}`
    ).then((data) => {

        const stockInfo = data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]];

        $("#open").text(parseFloat(stockInfo["1. open"]).toFixed(2));

        $("#close").text(parseFloat(stockInfo["4. close"]).toFixed(2));

    });
    $.getJSON(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock}&apikey=${apiKey}`
    ).then((data) => {
        beta = parseFloat(data["Beta"]).toFixed(2);
        $("#beta").text(beta);
        pe = parseFloat(data["PERatio"]).toFixed(2);
        $("#pe").text(pe);
        eps = parseFloat(data["EPS"]).toFixed(2);
        $("#eps").text(eps);

        // do something with beta, pe, and eps
    });

    let exchange = getExchange(stock, apiKey)
    console.log(exchange);
    var myChart = new TradingView.widget(

        {
            "autosize": true,
            "symbol": "NASDAQ:" + stock,
            "interval": "D",
            "timezone": "America/Los_Angeles",
            "theme": "light",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "myChart"
        }
    );

  $('#dashboardBtn').on('click', function(event) {
    //Stops the click event from bubbling up to underlying elements
    event.stopPropagation();
    window.location.assign("index.html");
  });

})

function  getExchange(stock, apiKey){

    $.getJSON(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock}&apikey=${apiKey}`
    ).then((data) => {
        let exchange = data["Exchange"];
        console.log(exchange)
        return exchange;

    });
}