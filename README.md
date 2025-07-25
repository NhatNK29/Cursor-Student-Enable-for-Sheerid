# Cursor-Student-Enable-for-Sheerid

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Version](https://img.shields.io/badge/version-0.3-blue)

A simple UserScript to add your country to the country list on Cursor's student verification page (powered by SheerID), allowing students to apply for the free Pro plan.

---

### 📝 About
This script intercepts network requests on the SheerID verification page to do two things:
1.  Add **"YourCountry"** to the list of supported countries.
2.  Set the verification code's validity period to **365 days**.

This allows students at universities of your ci=ountry to find and select their institution to proceed with the verification.

### 🤔 Why is this script needed?
[Cursor's](https://cursor.com/) student verification program is handled by the SheerID service. At the time of this script's creation, Vietnam was not included in the default list of supported countries, which prevented students from completing the registration process. This script was created to solve that problem.

### ✨ Features
* Automatically adds "Vietnam" to the country dropdown in the verification form.
* Automatically sets the verification validity period to 365 days.
* Works seamlessly in the background with no extra configuration needed.

### 🛠️ Requirements
* A modern web browser like Google Chrome, Mozilla Firefox, or Microsoft Edge.
* A UserScript manager extension. **Tampermonkey** is the recommended choice.
    * [Install Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
    * [Install Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
    * [Install Tampermonkey for Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

### 🚀 Installation

1.  Make sure you have installed Tampermonkey (or a similar manager) using the links above.
2.  Click one of the installation links below:
    * **Install from GreasyFork (Recommended):**
        > [!NOTE]
        > *You should upload your script to [GreasyFork.org](https://greasyfork.org/) and paste the link here. It is the most common and secure way to share UserScripts.*
        > **[Click here to install from GreasyFork](YOUR-GREASYFORK-LINK)**

    * **Install directly from GitHub:**
3.  A new Tampermonkey tab will open. Click the **"Install"** button to finish.

### 🧑‍💻 Usage
1.  After successful installation, navigate to the [Cursor Student Verification page](https://www.cursor.com/student).
2.  When the SheerID form loads, open the "Country" dropdown menu.
3.  You should now see **"YourCountry"** in the list. Select it.
4.  Proceed to enter your university's name and complete the remaining verification steps.

### ⚠️ Important Disclaimer
* This script only modifies data on your client-side (your browser). Final verification success still depends on SheerID's policies and the documents you provide.
* Future updates from SheerID or Cursor may break this script. If you encounter issues, please open an issue on GitHub.
* Use responsibly.

### 📜 License
This project is licensed under the [MIT License](LICENSE).
