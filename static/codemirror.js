document.addEventListener("DOMContentLoaded", () => {
    // Get the initial language from the dropdown
    const languageSelector = document.getElementById("language");
    const initialLanguage = languageSelector.value;

    // Map dropdown values to CodeMirror modes
    const languageModes = {
        python: "python",
        cpp: "text/x-c++src",
        java: "text/x-java"
    };

    // Initialize the CodeMirror editor with the mode from the initial dropdown value
    const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        lineNumbers: true,
        mode: languageModes[initialLanguage], // Use initial dropdown value to set the mode
        theme: "dracula",
        matchBrackets: true,
    });

    // Update the editor's mode dynamically when the dropdown value changes
    languageSelector.addEventListener("change", (event) => {
        const selectedLanguage = event.target.value;
        const mode = languageModes[selectedLanguage] || "javascript"; // Fallback to JavaScript if no match
        editor.setOption("mode", mode);
    });
});

