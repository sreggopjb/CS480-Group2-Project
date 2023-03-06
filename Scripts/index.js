"use strict";
$(document).ready(() => {
        var someStocks = ["APL", "AMZN", "MSFT", "TSLA"];

        $.each(someStocks, function (index, point) {
            $('#favorites').append(
                '<div class = "stock_box">' +
                    '<h1>'+point+'</h1>' +
                    '<h2>$12.34</h2>' +
                '</div>'
            );
        });
    }

);
