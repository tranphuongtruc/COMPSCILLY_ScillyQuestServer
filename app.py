from dotenv import load_dotenv
import os
from oauth2client.service_account import ServiceAccountCredentials
import gspread
from flask import Flask, render_template, request, jsonify
import datetime


# Initialize Flask app
app = Flask(__name__)

# Setup for Google Sheets API
scope = ["https://www.googleapis.com/auth/spreadsheets",
         "https://www.googleapis.com/auth/drive"]

# Load environment variables
load_dotenv()
service_account_file_path = os.getenv("SERVICE_ACCOUNT_FILE")

credentials = ServiceAccountCredentials.from_json_keyfile_name(
    service_account_file_path, scope)
gc = gspread.authorize(credentials)

# Open the Google Sheet
sheet = gc.open("ScillyQuest Code Submissions").sheet1  # Google Sheets title

# Define file extensions for different languages
FILE_EXTENSIONS = {"python": "py", "cpp": "cpp", "java": "java"}


@app.route('/')
def login():
    """Render the login page."""
    return render_template('login.html')


@app.route('/webcode', methods=["GET"])
def webcode():
    """Render the webcode page after successful login."""
    return render_template('webcode.html')


@app.route('/test_code', methods=["POST"])
def test_code():
    """Handle code submission."""
    try:
        # Ensure the data is received as JSON
        data = request.get_json()

        # Extract values from the request data
        code = data.get("code")
        language = data.get("language")
        q_num = data.get("q_num")
        user_id = data.get("userID")
        full_name = data.get("fullName")
        email = data.get("email")

        # Check if all required fields are present
        if not code or not language or not q_num or not user_id or not full_name or not email:
            return jsonify({"success": False, "message": "Missing required data!"}), 400

        # Check for valid file extension based on language
        file_extension = FILE_EXTENSIONS.get(language)
        if not file_extension:
            return jsonify({"success": False, "message": "Unsupported language!"}), 400

        # Attempt to write the data to Google Sheets
        submitted_time = datetime.datetime.now()
        formatted_time = submitted_time.strftime('%Y-%m-%d %H:%M:%S')
        sheet.append_row([user_id, full_name, email, q_num,
                         language, formatted_time, code])

        return jsonify({"success": True, "message": f"Question {q_num} saved successfully to Google Sheets!"})
    except Exception as e:
        # Log any errors and return failure response
        print(f'Error occurred: {e}')
        return jsonify({"success": False, "message": f"Failed to save code: {e}"}), 500


@app.route('/end_test', methods=["GET"])
def end_test():
    """Render the goodbye page after ending the test."""
    return render_template('goodbye.html')


if __name__ == "__main__":
    app.run()
