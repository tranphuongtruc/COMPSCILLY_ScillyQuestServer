# COMPSCILLY - ScillyQuest: Web Code Submission (Round 2)

Welcome to **ScillyQuest** – the thrilling coding competition by **COMPSCILLY**! This repository contains the web code for **Round 2**, where the contestants who passed **Round 1** will submit their work. 

The project is built using **Flask**, and integrates with **Google Sheets** to store the contestants' submissions. Below you'll find all the details you need to get started with the setup and contribute.

---

## 🚀 Project Introduction

The **ScillyQuest Round 2 Web Code Submission** application allows contestants to:

- Log in to submit their code.
- Submit coding solutions in **Python**, **C++**, or **Java**.
- Have their submissions stored in a **Google Sheet** for easy tracking and evaluation.

The application is designed to streamline the submission process, ensure proper handling of coding challenges, and provide a smooth experience for participants.

### Features:
- **Code Submission**: Contestants can submit their solutions via the web interface.
- **Google Sheets Integration**: All submissions are automatically logged into a Google Sheet.
- **Simple Interface**: Easy-to-use login page and code submission form.

---

## 📋 Installation Guide

To get started, follow these steps to clone and set up the project on your local machine.

### Step 1: Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/tranphuongtruc/COMPSCILLY_ScillyQuestServer
```

### Step 2: Install dependencies

Before running the app, make sure you have all the required packages installed. Navigate to the project directory and install the dependencies from requirements.txt:

```bash
cd scillyquest-round-2-webcode
pip install -r requirements.txt
```

### Step 3: Setup Google API Credentials

To interact with Google Sheets, you'll need to set up the credentials file for Google API.

1. Visit the Google Cloud Console.
2. Create a new project.
3. Enable the Google Sheets API and Google Drive API.
4. Download the credentials JSON file for the service account.
5. Put the JSON file to .env folder before running the app.

---

## 🎮 How to Run the App
After setting up the project and installing dependencies, you can run the web app locally.

To start the server, use:

```bash
python app.py
```
Once the app is running, you can visit the following URL in your browser:

```bash
http://127.0.0.1:5000/
```

---


## 🌐 Deployment
Once you're ready, you can deploy the app to a platform like  [Render](https://render.com/) to make it publicly accessible. The app is designed to run seamlessly both locally and on cloud platforms.

---

## 💡 Contribute
We welcome contributions! If you'd like to add new features or fix bugs, feel free to submit a pull request. Here's how you can contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
    ```bash
    git commit -am 'Add new feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature
    ```


---

## 🏆 Good Luck to All Contestants!
We hope you enjoy participating in ScillyQuest! May the best coder win 🎉

---

## 🤝 Support
If you have any questions or encounter issues, feel free to reach out to us. We're here to help!
Email: compscilly@gmail.com