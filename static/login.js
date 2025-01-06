// Function to open the modal
function openModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Function to save user details and close the modal
function saveUserDetails() {
    const userID = document.getElementById('userID').value.trim();
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!userID || !fullName || !email) {
        alert("Please fill in all fields!");
        return;
    }

    // Save details to localStorage or send to Flask
    localStorage.setItem("userID", userID);
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);

    alert("Details saved successfully! Click OK to start the test!");
    document.getElementById('loginModal').style.display = 'none';
    window.location.href = "/webcode";  
}
