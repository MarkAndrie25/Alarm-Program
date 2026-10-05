let currentAudio = null;

function playSound(soundName) {

    // Stop the previous sound
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Create the audio file
    currentAudio = new Audio(`sounds/${soundName}.mp3`);

    // Make the sound loop continuously
    currentAudio.loop = true;

    // Play the sound
    currentAudio.play()
        .then(() => {
            console.log("Playing:", soundName);
        })
        .catch(error => {
            console.error("Unable to play sound:", error);
        });
}


function stopSound() {

    if (currentAudio) {

        currentAudio.pause();
        currentAudio.currentTime = 0;

        console.log("Sound stopped.");
    }
}




// ===============================
// TEXT TO SPEECH
// ===============================

let voices = [];


// Load available voices
function loadVoices() {

    voices = speechSynthesis.getVoices();

    const voiceSelect = document.getElementById("voiceSelect");

    // Clear existing options
    voiceSelect.innerHTML = "";

    voices.forEach((voice, index) => {

        const option = document.createElement("option");

        option.value = index;

        option.textContent = `${voice.name} (${voice.lang})`;

        voiceSelect.appendChild(option);
    });
}


// Load voices when available
speechSynthesis.onvoiceschanged = loadVoices;


// Convert text to speech
function speakText() {

    const text = document.getElementById("speechText").value;

    // Check if empty
    if (text.trim() === "") {

        alert("Please enter some text.");

        return;
    }

    // Stop previous speech
    speechSynthesis.cancel();

    // Create speech
    const speech = new SpeechSynthesisUtterance(text);

    // Get selected voice
    const selectedVoiceIndex =
        document.getElementById("voiceSelect").value;

    const selectedVoice =
        voices[selectedVoiceIndex];

    // Apply selected voice
    if (selectedVoice) {

        speech.voice = selectedVoice;

        speech.lang = selectedVoice.lang;
    }

    // Speech settings
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    // Speak
    speechSynthesis.speak(speech);

    console.log("Speaking:", text);
}


// ===============================
// STOP SPEECH
// ===============================

function stopSpeech() {

    speechSynthesis.cancel();

    console.log("Speech stopped.");
}




