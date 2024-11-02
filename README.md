# googleform-apps-script-projectplace
A Google Apps Script that automates the transfer of Google Form submissions to ProjectPlace, creating project cards with relevant information. It simplifies project management workflows by instantly converting form responses into actionable tasks in ProjectPlace.

## Features
- Automatically creates a new card in ProjectPlace from each Google Form submission.
- Sets a due date for each card 2 days after creation.
- Adds comments to the card with selected form responses for quick reference.

## Setup
### 1. Generate ProjectPlace API Keys

  1. Go to the **Developer** tab on ProjectPlace and create a new application.
  2. When setting up the application, use the following format for the **Callback URL**:

    https://script.google.com/macros/d/{SCRIPT ID}/usercallback

  Where `{SCRIPT ID}` is the ID of the script that is using this library. You
  can find your script's ID in the Apps Script code editor by clicking on the menu
  item "File > Project properties".
  3.**Save your API Key and Secret** immediately, as ProjectPlace only allows you to view them once during creation.

### 2. Add the Script to Google Apps Script

  1. Open your Google Form and go to **Extensions > Apps Script** to open the Script Editor.
  2. Paste the provided code into the Script Editor.

### 3. Download the OAuth1 Library

  1. In the Google Apps Script editor, go to **Resources > Libraries**.
  2. Add the OAuth1 library using the following library ID: `1CXDCY5sqT9ph64fFwSzVtXnbjpSfWdRymafDrtIZ7Z_hwysTY7IIhi7s`
  3. Choose a version (best to choose the latest version) and click the "Save" button 

### 4. Replace Placeholders in the Code

Replace all placeholder variables in the script with your actual values:
```javascript
var API_KEY = 'YOUR_API_KEY';
var API_SECRET = 'YOUR_API_SECRET';
var TOKEN = 'YOUR_ACCESS_TOKEN';
var TOKEN_SECRET = 'YOUR_ACCESS_TOKEN_SECRET';
var ASSIGNEE_ID = 'YOUR_ASSIGNEE_ID';
var BOARD_ID = 'YOUR_BOARD_ID';
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
var SHEET_NAME = 'YOUR_SHEET_NAME';     
