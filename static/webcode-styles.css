function startCountdown(duration) {
    let timer = duration;
    const intervalId = setInterval(() => {
        const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
        const seconds = String(timer % 60).padStart(2, "0");
        document.getElementById("countdown").textContent = `${minutes}:${seconds}`;
        if (--timer < 0) clearInterval(intervalId);
    }, 1000);
}

function setDefaultQuestion() {
    const defaultQuestionNumber = '1'; // Default question number
    const questionText1a = 'Cho a=1 và b=2';
    const questionText1b = 'Xuất ra tổng a và b';

    // Set the question content
    document.querySelector('.questions-section').innerHTML = `
        <p>
            <span style="font-size: 30px; color: #e35ac3;">QUESTION ${defaultQuestionNumber}</span><br><br>
            <span style="font-size: 25px; color: rgb(252, 252, 252);">${questionText1a}</span><br>
            <span style="font-size: 25px; color: rgb(252, 252, 252);">${questionText1b}</span><br>
        </p>
    `;

    // Highlight the default button
    document.querySelectorAll('.round-btn').forEach(button => {
        if (button.getAttribute('data-question') === defaultQuestionNumber) {
            button.classList.add('active'); 
        } else {
            button.classList.remove('active');
        }
    });

    // Reset the code area for the default question
    const editor = document.querySelector('.CodeMirror').CodeMirror;
    if (editor) editor.setValue('');
}

document.querySelectorAll('.round-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const questionNumber = e.target.getAttribute('data-question');

        // Update the question based on the button clicked
        let questionText = '';
        if (questionNumber === '1') {
            questionText = 'Cho a=1 và b=2\nXuất ra tổng a và b';
        } else if (questionNumber === '2') {
            questionText = 'Example question for 2';
        } else if (questionNumber === '3') {
            questionText = 'Example question for 3';
        }

        // Update the question text in the HTML
        document.querySelector('.questions-section').innerHTML = `
            <p>
                <span style="font-size: 30px; color: #f4b9f0;">QUESTION ${questionNumber}</span><br><br>
                <span style="font-size: 25px; color: rgb(255, 255, 255);">${questionText}</span><br>
            </p>
        `;

        // Highlight the selected button
        document.querySelectorAll('.round-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Reset the code area for the selected question
        const editor = document.querySelector('.CodeMirror').CodeMirror;
        if (editor) editor.setValue('');
    });
});

document.getElementById("submit-code").addEventListener("click", () => {
    const editor = document.querySelector('.CodeMirror').CodeMirror;
    const code = editor ? editor.getValue() : '';
    const language = document.getElementById("language").value;
    const outputElement = document.getElementById("output");
    const activeButton = document.querySelector('.round-btn.active');
    const questionNumber = activeButton ? activeButton.getAttribute('data-question') : null;

    const userID = localStorage.getItem("userID");
    const fullName = localStorage.getItem("fullName");
    const email = localStorage.getItem("email");

    if (!userID || !fullName || !email) {
        outputElement.textContent = "User details are missing! Please log in again.";
        return;
    }

    if (!code.trim()) {
        outputElement.textContent = "Please type your code!";
        return;
    }

    if (!questionNumber) {
        outputElement.textContent = "Please select a question!";
        return;
    }

    fetch("/test_code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userID,
            fullName,
            email,
            code,
            language,
            q_num: questionNumber
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            outputElement.textContent = data.success
                ? data.message
                : `Error: ${data.message}`;
        })
        .catch((error) => {
            outputElement.textContent = `Error: ${error.message}`;
        });
});

// Initialize the page with default question and countdown
window.onload = () => {
    startCountdown(7200);
    setDefaultQuestion();
};

// Handle tab for 4 spaces in code editor
document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('code');
    textarea.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 4;
        }
    });
});


document.querySelector(".end-test-btn").addEventListener("click", () => {
    // Confirmation dialog
    const userConfirmed = window.confirm("Are you sure you've submitted all the questions? You won't be able to go back.");

    if (userConfirmed) {
        sessionStorage.setItem("testEnded", "true");
        window.location.replace("/end_test");
    }
});

if (sessionStorage.getItem("testEnded") === "true") {
    // Disable the back navigation by pushing a new history state
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function() {
        // Keep pushing the same state when back button is pressed
        window.history.pushState(null, null, window.location.href);
    };
}


