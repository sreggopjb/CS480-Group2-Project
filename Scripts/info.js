/* globals Chart:false, feather:false */

(function () {
  'use strict'
  feather.replace({ 'aria-hidden': 'true' })
  //Placeholder data
  var myChart = new TradingView.widget(
        {
        "autosize": true,
        "symbol": "NASDAQ:AAPL",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "myChart"
        }
    );
})()

