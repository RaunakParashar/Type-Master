const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

let time = 60;
let timer;
let currentSentence = "";

// Your paragraphs array stays the same
const paragraphs = [
    "Practice typing every day to improve speed and accuracy. Focus on correct spelling and steady rhythm while typing. Small daily improvements will gradually build strong and confident keyboard skills.",
    
    "Learning to type faster requires patience and focus. Keep your hands relaxed on the keyboard and watch the screen carefully. Regular practice helps your brain and fingers work together smoothly.",
    
    "Typing is an important skill in todays digital world. Students, programmers, and writers benefit greatly from faster typing. Practicing simple paragraphs regularly can significantly improve performance and confidence.",

    "Consistency matters more than speed when beginning typing practice. Start slowly and try to type each word correctly. Over time your fingers will learn the keyboard layout naturally.",

    "A calm mind helps improve typing accuracy and control. Avoid rushing through sentences and concentrate on pressing correct keys. With enough practice your typing speed will increase naturally.",

    "Every beginner makes mistakes while learning typing. Instead of worrying about errors, use them as learning opportunities. Careful practice builds confidence and improves keyboard control over time.",

    "Typing practice may feel boring at first, but persistence makes it rewarding. Training your fingers regularly makes writing emails, messages, and documents faster and easier.",

    "Focus on rhythm and accuracy while typing sentences. Smooth and steady typing usually produces better results. Accuracy should always be more important than typing speed.",

    "Many professionals rely on fast typing skills daily. Programmers write code, writers draft stories, and students complete assignments. Faster typing saves time and improves productivity.",

    "Typing tests are useful tools for measuring improvement. They help identify mistakes and track progress over time. Monitoring results motivates learners to continue practicing regularly.", 

    "Keyboard familiarity plays a big role in typing speed. Memorizing the key positions allows fingers to move naturally without constantly looking at the keyboard.",

    "Short paragraphs are excellent for daily typing practice. They train the brain to recognize words quickly while improving finger movement and keyboard confidence.",

    "Accuracy should always come before speed in typing practice. Rushing through sentences usually causes unnecessary mistakes and reduces overall performance.",

    "Typing is similar to learning a musical instrument. Practice improves coordination between the mind and fingers, gradually making typing faster and more comfortable.",

    "Many online tools help people practice typing efficiently. These tools provide timers, accuracy tracking, and word challenges that make learning easier.",

    "Proper finger placement is essential for efficient typing. The home row keys guide finger movement across the keyboard and help maintain accuracy.",

    "Typing smoothly requires relaxed posture and comfortable hand position. Keeping wrists straight helps prevent fatigue during long typing sessions.",

    "Fast typing saves valuable time in everyday work. Writing emails, notes, and documents becomes quicker and more efficient.",

    "Many learners improve typing skills through short daily sessions. Even ten minutes of focused practice can make noticeable progress.",

    "Typing practice strengthens memory of common word patterns. Familiar words become easier to type quickly and accurately.",

    "Patience plays an important role when learning typing. Early progress may feel slow, but regular practice gradually builds strong skills.",

    "Typing games can make practice more enjoyable. They combine learning with fun challenges and goals.",

    "Clear focus helps reduce typing errors. Avoid distractions while practicing and concentrate on each word.",

    "Reading the sentence carefully before typing improves accuracy. Understanding the structure of the text prevents mistakes.",

    "Typing faster allows people to express ideas more efficiently. Writers can capture thoughts quickly before they fade.",

    "Developing typing skills takes time and dedication. Progress grows steadily through repeated practice and patience.",

    "Many schools encourage students to learn typing early. This skill supports research, assignments, and communication.",

    "The keyboard layout may seem confusing for beginners. However repeated practice quickly builds familiarity with the keys.",

    "Typing correctly reduces frustration during writing tasks. Smooth typing allows ideas to flow naturally and clearly.",

    "Consistent effort is the secret to mastering typing. Even small daily practice sessions eventually produce impressive results."

];

function loadSentence() {
    inputEl.focus();
    currentSentence = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    sentenceEl.innerHTML = "";
    currentSentence.split("").forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        sentenceEl.appendChild(span);
    });
}

function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        time--;
        timeEl.innerText = time;
        if (time <= 0) {
            clearInterval(timer);
            inputEl.disabled = true;
            showResult();
        }
    }, 1000);
}

inputEl.addEventListener("input", () => {
    const typedText = inputEl.value;
    const chars = sentenceEl.querySelectorAll("span");

    // Highlight typed chars
    chars.forEach((char, index) => {
        if (index < typedText.length) {
            char.style.color = typedText[index] === char.innerText ? "green" : "red";
        } else {
            char.style.color = "black";
        }
    });

    // Calculate live accuracy
    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === currentSentence[i]) correctChars++;
    }
    const accuracy = typedText.length === 0 ? 100 : (correctChars / typedText.length) * 100;
    accuracyEl.innerText = accuracy.toFixed(0);

    // Calculate live WPM
    const elapsedMinutes = (60 - time) / 60;
    const wpm = elapsedMinutes > 0 ? Math.round((typedText.length / 5) / elapsedMinutes) : 0;
    wpmEl.innerText = wpm;
});
function showResult() {
    const typedText = inputEl.value.trim();
    const typedWords = typedText.split(/\s+/).filter(Boolean);
    const originalWords = currentSentence.trim().split(/\s+/);

    let correctWords = 0;

    for (let i = 0; i < typedWords.length; i++) {
        if (typedWords[i] === originalWords[i]) correctWords++;
    }

    const accuracy = typedWords.length > 0 
        ? Math.round((correctWords / typedWords.length) * 100) 
        : 100;

    const wpm = Math.round((typedText.length / 5));

    // 🔥 Set values in overlay
    document.getElementById("finalWpm").innerText = "WPM: " + wpm;
    document.getElementById("finalAccuracy").innerText = "Accuracy: " + accuracy + "%";

    // 🔥 Show animation
    const screen = document.getElementById("resultScreen");
    screen.classList.add("active");

    // 🔄 Reset after 3 sec
    setTimeout(() => {
        screen.classList.remove("active");
        resetTest();
    }, 3000);
}

function resetTest() {
    clearInterval(timer);
    inputEl.disabled = false;
    inputEl.value = "";
    time = 60;
    timeEl.innerText = time;
    wpmEl.innerText = "0";
    accuracyEl.innerText = "100";
    loadSentence();
    startTimer();
}

// Initialize
loadSentence();
startTimer();