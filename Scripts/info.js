/* globals Chart:false, feather:false */
$(document).ready(() => {
  'use strict'
  var name = localStorage.getItem("stock");
  localStorage.removeItem("stock");
  var myChart = new TradingView.widget(
        {
        "autosize": true,
        "symbol": "NASDAQ:" + name,
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
  var dict = {
        stockName:  name,
                    stockPrice: 701.53,
                    trend: "up"
            };
            $('#tbody_content').append(
                    "<tr>" +
                    "<td>Stock Name</td>" +
                    "<td>" + dict["stockName"] + "</td>" +
                    "</tr>"+
                    "<tr>" +
                    "<td>Stock Price</td>" +
                    "<td>" + dict["stockPrice"] + "</td>" +
                    "<tr>" +
                    "<td>Trend</td>" +
                    "<td>" + dict["trend"] + "</td>" +
                    "</tr>"+
                    "</tr>");
                $('#stockName').text(dict["stockName"]);
                $('#company').text(dict["company"]);
  // Click event listener for stock_box element
  $('#dashboardBtn').on('click', function(event) {
    //Stops the click event from bubbling up to underlying elements
    event.stopPropagation();
    window.location.assign("index.html");
  });
})