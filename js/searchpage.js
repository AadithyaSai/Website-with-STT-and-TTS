import { initSR, initSS } from "./WebSpeech.js";

const searcharea = document.getElementById("searcharea");
const searchBar = document.getElementById("search");
const resultArea = document.getElementById("resultarea");

const params = new URLSearchParams(document.location.search);
let query = params.get("query") || "Something";
let resultCount = 6;

searchBar.value = query;

for (let i = 1; i <= resultCount; i++) {
  let resBtn = document.createElement("button");
  resBtn.className = "result";
  resBtn.textContent = query + " " + i;
  resBtn.onclick = () => {
    alert(`You have chosen ${resBtn.textContent}`);
  };
  resultArea.appendChild(resBtn);
}

searcharea.onsubmit = () => {
  window.location.href = `${location.origin + location.pathname}?query=${
    searchBar.value
  }`;
  return false;
};

setTimeout(async () => {
  if (confirm("Use Voice Assistant?")) {
    const synthesizer = initSS();

    synthesizer.speak(
      new SpeechSynthesisUtterance("Showing results for " + query)
    );

    const results = [...resultArea.children];
    let focused = 0;
    for (const result of results) {
      const utterance = new SpeechSynthesisUtterance(result.textContent);

      utterance.onstart = () => {
        results[focused].focus();
      };

      utterance.onend = () => {
        focused++;
      };

      let oldOnClick = result.onclick;
      result.onclick = () => {
        synthesizer.cancel();
        oldOnClick();
      };
      synthesizer.speak(utterance);
    }
  }
}, 300);
