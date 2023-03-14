"use strict";
let favorites = new Array();
$(document).ready(() => {

  if(!checkCookie()) createCookie(favorites);
  favorites = getCookie();


  const apiKey = "NMBJV9I1JXOWWEZ6";

    // Loop through the favorites array and make API requests for each stock
  if(favorites!= null && favorites.length > 0){
      favorites.forEach((stock) => {
        $.getJSON(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock}&outputsize=full&apikey=${apiKey}`
        ).then((data) => {
          name = stock;
          const stockInfo = data["Time Series (Daily)"][Object.keys(data["Time Series (Daily)"])[0]];
          const stockPrice = parseFloat(stockInfo["4. close"]).toFixed(2);
          $('#favorites').append(`
            <div class="stock_box" style="cursor: pointer;">
                <div>
                    <a href ='#' ><i class="fa fa-trash stock_buttons delete_button"></i></a>
                    <a><i class="fa fa-refresh stock_buttons change_button"></i></a>
                </div>
              <h2>${stock}</h2>
              <h2 class="stock_price">$${stockPrice}</h2>
            </div>
        `);
          // Click event listener for stock_box element
          $('.stock_box').on('click', function(event) {
            //Stops the click event from bubbling up to underlying elements
            event.stopPropagation();
            showStock(stock);
          });

          // Click event listener for delete_button element
          $('.delete_button').on('click', function(event) {
            //Stops the click event from bubbling up to underlying elements
            event.stopPropagation();
            del(stock);
          });
        });
      });

  }
    });


function showStock(stock = "aaple"){
  console.log(stock);
  localStorage.setItem("stock", stock);
  window.location.assign("info.html");
}
function editMode() {
  console.log("EditMode");
  document.getElementById("editMode").style.visibility = "visible";
  const temp =document.getElementsByClassName("stock_buttons");
  for(let i= 0; i< temp.length; i++){
    temp[i].style.visibility = "visible";
  }
  let button = document.getElementById("edit_button");
  button.innerText = "Back";
  button.setAttribute("onclick", 'toggleEdit()');

}
function toggleEdit(){
  document.getElementById("editMode").style.visibility = "hidden";
  if(favorites.length >0){

    const temp =document.getElementsByClassName("stock_buttons");
    for(let i= 0; i< temp.length; i++){
      temp[i].style.visibility = "hidden";
    }
  }
  let button = document.getElementById("edit_button");
  button.innerText = "Edit";
  button.setAttribute("onclick", "editMode()");
  document.getElementById("add_form").style.visibility=  'hidden';

}
  // Show add stock popup
function showAdd(){
  document.getElementById("add_form").style.visibility=  'visible';

}



  // Delete stock from favorites array and update cookie
function del(stock){
  console.log(stock);
  let x = favorites.indexOf(stock);
  favorites.splice(x, 1);
  createCookie(favorites);
  window.location.reload();


}


function add_stock(){
  let x = document.getElementById("stock_name").value;
  if(favorites == null){
    favorites = [x];
    console.log(favorites);
  }
  else{
    favorites.push(x);
    console.log(favorites);
  }

  createCookie(favorites);
  window.location.reload();
}
  // Function to check if a cookie exists

  function checkCookie() {
    return document.cookie.indexOf("favorites") !== -1;
  }

  function createCookie(favorites){
    let date = new Date();
    date.setTime(date.getTime() + (2*24 *60*60*2000));
    let expires  = "expires=" + date.toUTCString();
    let arr = JSON.stringify(favorites);
    document.cookie = "favorites ="+arr+";" + expires + ";path =/";

}
function getCookie() {
  let cookieArray = new Array();
  let result = new Array();

  //Get cookie
  let cookieValue = document.cookie;

  //Divide the cookie into an array and convert them to JSON
  if(cookieValue){
    cookieArray = cookieValue.split(';');

    cookieArray.forEach(data => {
      data = data.split('=');

      //data[0]: Cookie name
      //data[1]: Cookie value

      console.log(data[0]+ ' ' + data[1]);
      result = JSON.parse(data[1]);

    });
  }
  return result;
}

