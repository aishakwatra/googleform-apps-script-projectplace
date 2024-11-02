var API_KEY = 'YOUR_API_KEY';
var API_SECRET = 'YOUR_API_SECRET';
var TOKEN = 'YOUR_ACCESS_TOKEN';
var TOKEN_SECRET = 'YOUR_ACCESS_TOKEN_SECRET';

var ASSIGNEE_ID = 'YOUR_ASSIGNEE_ID';
var BOARD_ID = 'YOUR_BOARD_ID'; 

var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
var SHEET_NAME = 'YOUR_SHEET_NAME';

function onFormSubmit(e) {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    var data = sheet.getLastRow();
    var rowData = sheet.getRange(data, 1, 1, sheet.getLastColumn()).getValues()[0];
  
    var title = `Submission - ${rowData[0]}`;
    var description = createDescription(rowData);
    var comment = createComment(rowData);
  
    makeProjectPlaceCard(title, description, ASSIGNEE_ID, BOARD_ID, comment);

  }

//--------------------------------------------------------------------------

// GENERATE CARD INFO - DESCRIPTION AND COMMENT
 
function createDescription(rowData) {
  return `Description placeholder based on Row 1: ${rowData[0]}, Row 2: ${rowData[1]}`;
}

function createComment(rowData) {
  return `
    Row 1: ${rowData[0]}
    Row 2: ${rowData[1]}
    Row 3: ${rowData[2]}
    Row 4: ${rowData[3]}
  `;
}


//API CALL TO MAKE CARD
function makeProjectPlaceCard(title, description, assignee_id, board_id, comment) {
    var service = getService_();
    var url = 'https://api.projectplace.com/1/projects/YOUR_PROJECT_ID/cards/create-new';
  
    var dueDate = createDueDate();
  
    var cardData = {
      "title": title,
      "description": description,
      "board_id": board_id,
      "column_id": "0", // Replace if needed
      "due_date": dueDate,
      "assignee_id": assignee_id
    };
  

  var options = {
    'method': 'POST',
    'contentType': 'application/json',
    'payload': JSON.stringify(cardData),
    'muteHttpExceptions': true
  };

  var response = service.fetch(url, options);
  var responseData = JSON.parse(response.getContentText());

  if (responseData && responseData.id) {
    Logger.log("Card created with ID: " + responseData.id);
    addCommentToCard(responseData.id, comment); //CREATE COMMENT
  } else {
    Logger.log("Error creating card: " + response.getContentText());
  }

}

//SET OAUTH1
function getService_() {
  return OAuth1.createService('ProjectPlace')
    .setConsumerKey(API_KEY)
    .setConsumerSecret(API_SECRET)
    .setAccessToken(TOKEN, TOKEN_SECRET);
}

//FUNCTION TO GENERATE A DUE DATE FOR THE CARD 2 DAYS AFTER CARD CREATION
function createDueDate() { 

    var today = new Date();
    today.setDate(today.getDate() + 2);
    var dueDate = today.toISOString().split('T')[0];
    return dueDate;
  
}

// Add a comment to the card using the card ID
function addCommentToCard(cardId, commentText) {
    var service = getService_();
    var url = `https://api.projectplace.com/1/cards/${cardId}/comments/create-new`;
  
    var commentData = {
      "text": commentText
    };
  
    var options = {
      'method': 'POST',
      'contentType': 'application/json',
      'payload': JSON.stringify(commentData),
      'muteHttpExceptions': true
    };

    var response = service.fetch(url, options);
    Logger.log("Comment added: " + response.getContentText());
  
}
  

