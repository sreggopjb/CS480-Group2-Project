"use strict";
$(document).ready(() => {
        var dict = {
            stockName: "AAPL",
            stockPrice: 700.53,
            trend: "up"
        };
        $('tbody_content').append(
            '<h2>' + dict["stockName"] + '</h2>'
        );

        $('tbody_content').append(
            '<h2>' + dict["stockPrice"] + '</h2>'
        );

        $('tbody_content').append(
            '<h2>' + dict["trend"] + '</h2>'
        );


    }
);

// // loop approach:

// for(var key in dict) {
//     $('tbody_content').append(
//         '<tr><td>' + key + '</td><td>' + dict[key] + '</td></tr>'
//     );
// }


// $('#tbody_content').append(
//     "<tr>" +
//     "<td>"+dictkey+"</td>" +
//     "<td>"+dictval+"</td>" +
//     "</tr>"+
//     "<tr>" +
//     "<td>"+dictkey+"</td>" +
//     "<td>"+dictval+"</td>" +
//     "</tr>"+