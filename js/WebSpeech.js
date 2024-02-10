export function initSR() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "This browser does not support Speech Recognition! If you are using Firefox, then try enabling speech recognition flags from about:config"
    );
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return recognition;
}

export function initSS() {
  return window.speechSynthesis;
}
