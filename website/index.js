const fetchDataButton = document.getElementById("fetchData");
const resultElement = document.getElementById("result");

fetchData()

function fetchData(){
    fetch("http://192.168.33.76:3000/getCurrentState")
    .then(response => response.text())
    .then(data => {
        resultElement.innerHTML = data;
    })
    .catch(error => {
        resultElement.innerHTML = error;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchDataButton.addEventListener("click", function () {
       fetchData()
    });
});