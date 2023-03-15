$(document).ready(()=>{
   let stock = localStorage.getItem("stock");
   let open, close, beta, pe, eps;
    const apiKey = "NMBJV9I1JXOWWEZ6";
    $("#stock_Title").text(stock);

    $.getJSON(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&outputsize=full&apikey=${apiKey}`
    ).then((data) => {
        const stockInfo = data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]];
        open = parseFloat(stockInfo["1. open"]).toFixed(2);
        close = parseFloat(stockInfo["4. close"]).toFixed(2);

    });
    $.getJSON(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock}&apikey=${apiKey}`
    ).then((data) => {
        beta = parseFloat(data["Beta"]).toFixed(2);
        pe = parseFloat(data["PERatio"]).toFixed(2);
        eps = parseFloat(data["EPS"]).toFixed(2);
        // do something with beta, pe, and eps
    });

    $("#stock_info").append(`
       <table>
           <tr>
                <td>Open</td>
                <td>${open}</td>
            </tr>
            <tr>
                <td>Close</td>
                <td>${close}</td>
            </tr>
            <tr>
                <td>Beta</td>
                <td>{beta}</td>
            </tr>
            <tr>
                <td>Price to Earning</td>
                <td>{pe}</td>
            </tr>
            <tr>
                 <td>Earnings Per Share </td>
                 <td>{eps}</td>
            </tr>
        </table>
        
    `)
});