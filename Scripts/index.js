"use strict";
$(document).ready(() => {
    //cookie
        //if theres a cookie
            //get the array and pass it to the API
        // if no cookie
            //create one
        var someStocks = ["APL", "AMZN", "MSFT", "TSLA"];

        $.each(someStocks, function (index, point) {
            $('#favorites').append(
                '<div class = "stock_box">' +
                    '<h2>'+point+'</h2>' +
                    '<h2>$12.34</h2>' +
                '</div>'
            );
        });
    }

);
