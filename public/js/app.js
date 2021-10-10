console.log("Client side js file is loaded!");

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//   response.json().then((data)=>{
//     console.log(data);
//   })
// })

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector('#message1');
const messageTwo = document.querySelector('#message2');

weatherForm.addEventListener("submit", (e) => {
  messageOne.textContent = "Loading";
  messageTwo.textContent = "";
  e.preventDefault();
  const location = search.value;
  fetch("http://localhost:3000/weather?adress="+location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = "Something went wrong!";
        messageTwo.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
