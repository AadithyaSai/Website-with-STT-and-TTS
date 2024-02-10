import { initSR, initSS } from "./WebSpeech.js";

var recognition = initSR();

const status = document.getElementById("status");
const searchBar = document.getElementById("search");

const synthesizer = initSS();

if (synthesizer)
  synthesizer.speak(
    new SpeechSynthesisUtterance(
      document.getElementById("helptext").textContent
    )
  );

searcharea.onsubmit = () => {
  if (searchBar.value) {
    window.location.href = `${
      location.origin + location.pathname
    }/searchpage?query=${searchBar.value}`;
  }
  return false;
};

document.onkeydown = (keyEvent) => {
  if (keyEvent.key !== " ") return;
  startListening();
};

status.onclick = startListening;

function confirmText(txt) {
  if (txt === "search") {
    if (confirm("go search this?")) {
      document.getElementById("searcharea").submit();
    }
  } else if (confirm(`Is this correct: "${txt}"?`)) {
    searchBar.value = txt;
  }
}

let speechRecStarted = false;
function startListening() {
  if (speechRecStarted) return;
  speechRecStarted = true;

  recognition.start();
  console.log("Started STT...");
  status.innerHTML = recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    console.log(text);
    confirmText(text);
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  recognition.onstart = () => {
    status.style = "background-color: green; padding: 20px";
    status.textContent = "Listening...";
  };

  recognition.onend = () => {
    status.style = "background-color: red; padding: 20px";
    status.textContent = "Off";
    speechRecStarted = false;
  };

  recognition.onnomatch = () => {
    console.log("No matches...");
  };

  recognition.onerror = (event) => {
    console.log("Error: " + event.error);
  };
}
