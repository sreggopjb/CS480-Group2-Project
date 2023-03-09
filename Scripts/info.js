/* globals Chart:false, feather:false */
$(document).ready(() => {
  'use strict'
  //Placeholder data
  var name = localStorage.getItem("stock");
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
})