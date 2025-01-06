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
    const questionText = 'Cho a=1 và b=2\nXuất ra tổng a và b';

    // Set the question content
    document.querySelector('.questions-section').innerHTML = `
        <p>
            <span style="font-size: 30px; color: #ff4081;">QUESTION ${defaultQuestionNumber}</span><br><br>
            <span style="font-size: 25px; color: rgb(0, 0, 0);">${questionText}</span><br>
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
    document.getElementById('code').value = '';
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
                <span style="font-size: 30px; color: #ff4081;">QUESTION ${questionNumber}</span><br><br>
                <span style="font-size: 25px; color: rgb(0, 0, 0);">${questionText}</span><br>
            </p>
        `;

        // Highlight the selected button
        document.querySelectorAll('.round-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Reset the code area for the selected question
        document.getElementById('code').value = '';
    });
});

document.getElementById("submit-code").addEventListener("click", () => {
    const code = document.getElementById("code").value;
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

// 1 tab = 4 space
document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('code');

    textarea.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
            event.preventDefault(); // Prevent the default tab behavior
            const start = this.selectionStart;
            const end = this.selectionEnd;

            // Insert 4 spaces at the current cursor position
            this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);

            // Move the cursor after the inserted spaces
            this.selectionStart = this.selectionEnd = start + 4;
        }
    });
});


document.querySelector(".end-test-btn").addEventListener("click", () => {
    // Redirect to the goodbye page
    window.location.href = "/end_test";
});
