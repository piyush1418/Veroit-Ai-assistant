let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN"; // Language set to Hindi (India)
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning, sir.");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon, sir.");
    } else {
        speak("Good evening, sir.");
    }
}

// Uncomment the line below to trigger the wishMe function on page load
// window.addEventListener('load', wishMe);

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript.trim(); // Display the recognized speech
    takeCommand(transcript); // Process the transcript
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none"; // Hide the button
    voice.style.display = "block"; // Show the listening indicator
});

function takeCommand(message) {
    // Reset button and voice areas
    btn.style.display = "flex";
    voice.style.display = "none";

    // Convert message to lowercase for case-insensitive matching
    message = message.toLowerCase().trim();

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, how can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Piyush sir.");
    } else if (message.includes("youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("whatsapp")) {
        speak("Opening WhatsApp Web...");
        window.open("https://web.whatsapp.com/", "_blank");
    } else if (message.includes("google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.startsWith("search")) {
        let query = message.replace("search", "").trim();
        if (query) {
            speak(`Searching Google for ${query}...`);
            window.open(`https://www.google.co.in/search?q=${encodeURIComponent(query)}`, "_blank");
        } else {
            speak("Please specify what you want to search.");
        }
    } else if (message.includes("how are you")) {
        speak("I'm fine! How can I assist you?");
    } else if (message.includes("what are you doing")) {
        speak("I am listening to your commands and trying my best to assist you. How can I help?");
    } else {
        speak("Sorry, I didn't understand that.");
    }
}
