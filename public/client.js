let rate = 0; //global
let rate1 = 0;

var countries = [
  "CAD",
  "HKD",
  "ISK",
  "PHP",
  "DKK",
  "HUF",
  "CZK",
  "GBP",
  "RON",
  "SEK",
  "IDR",
  "INR",
  "BRL",
  "RUB",
  "USD",
  "EUR",
  "CNY",
  "JPY",
  "KRW",
  "THB",
  "CHF",
  "MYR",
  "BGN",
  "TRY",
  "NOK",
  "NZD",
  "ZAR",
  "MXN",
  "SGD",
  "AUD",
  "ILS",
  "HRK",
  "PLN"
];
const BASE_URL2 = "https://api.exchangeratesapi.io/latest?base=CAD";
//const url_ft2 = BASE_URL2 + "?access_key=a5dae196d138037a959833c36649fee8&format=2";
var i = 0;
const BASE_URL3 = "https://api.exchangeratesapi.io/latest?base=CAD";
function updateData(n, c) {
  fetch(BASE_URL3)
    .then(resp => resp.json()) // Transform the data into json
    .then(function(data) {
      document.getElementById("Exchangerate").innerHTML = "";

      document.getElementById("Exchangerate").innerHTML +=
        countries[n] + ": " + data.rates[countries[n]] + "<br>";
      rate = parseFloat(data.rates[countries[n]]);
      console.log(data.rates[countries[n]]);
    })
    .catch(function(error) {
      document.getElementById("content").innerHTML += error;
    });
}
function changeCurrency() {
  const select = document.getElementById("selectCurrency");
  const selected = select.options[select.selectedIndex];
  const geo = selected.value;
  updateData(geo);
}

document
  .getElementById("butDialogAdd")
  .addEventListener("click", changeCurrency());



//USD Exchange

var countries = [
  "CAD",
  "HKD",
  "ISK",
  "PHP",
  "DKK",
  "HUF",
  "CZK",
  "GBP",
  "RON",
  "SEK",
  "IDR",
  "INR",
  "BRL",
  "RUB",
  "CAD",
  "EUR",
  "CNY",
  "JPY",
  "KRW",
  "THB",
  "CHF",
  "MYR",
  "BGN",
  "TRY",
  "NOK",
  "NZD",
  "ZAR",
  "MXN",
  "SGD",
  "AUD",
  "ILS",
  "HRK",
  "PLN"
];
const BASE_URL4 = "https://api.exchangeratesapi.io/latest?base=USD";
//const url_ft2 = BASE_URL2 + "?access_key=a5dae196d138037a959833c36649fee8&format=2";
var i = 0;
const BASE_URL5 = "https://api.exchangeratesapi.io/latest?base=USD";
function updateData1(n, c) {
  fetch(BASE_URL4)
    .then(resp => resp.json()) // Transform the data into json
    .then(function(data) {
      document.getElementById("Exchangerate1").innerHTML = "";

      document.getElementById("Exchangerate1").innerHTML +=
        countries[n] + ": " + data.rates[countries[n]] + "<br>";
      rate1 = parseFloat(data.rates[countries[n]]);
      console.log(data.rates[countries[n]]);
    })
    .catch(function(error) {
      document.getElementById("content").innerHTML += error;
    });
}
function changeCurrency1() {
  const select = document.getElementById("selectCurrency1");
  const selected = select.options[select.selectedIndex];
  const geo = selected.value;

  updateData1(geo);
}

document
  .getElementById("butDialogAdd1")
  .addEventListener("click", changeCurrency1());

function calcAmount() {
  let convert = parseFloat(document.getElementById("input").value);
  console.log(convert);
  console.log(rate);
  let newValue = convert * rate;
  console.log(newValue);
  document.getElementById("output").innerHTML =
    Math.round(newValue * 100) / 100;
}

function calcAmount1() {
  let convert1 = parseFloat(document.getElementById("input1").value);
  console.log(convert1);
  console.log(rate1);
  let newValue = convert1 * rate1;
  console.log(newValue);
  document.getElementById("output1").innerHTML =
     Math.round(newValue * 100) / 100;
}
