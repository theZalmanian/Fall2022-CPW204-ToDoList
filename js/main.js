var ToDoItem = (function () {
    function ToDoItem(itemID, itemTitle, itemDueDate, isItemComplete) {
        this.id = itemID;
        this.title = itemTitle;
        this.dueDate = itemDueDate;
        this.isComplete = isItemComplete;
    }
    return ToDoItem;
}());
window.onload = function () {
    setupButton("add-item", addItem);
    displayAllSavedItems();
};
function addItem() {
    clearAllErrors();
    if (allDataValid()) {
        var newItem = createItem();
        displayItem(newItem);
        saveItem(newItem);
        clearAllTextBoxes();
    }
}
function createItem() {
    var itemID = incrementIDCount();
    var itemTitle = getInputByID("title").value;
    var dueDateTextBox = getInputByID("due-date");
    var itemDueDate = new Date(dueDateTextBox.value);
    var newItem = new ToDoItem(itemID, itemTitle, itemDueDate, false);
    return newItem;
}
function displayItem(currItem) {
    var itemContainer = document.createElement("li");
    var itemTitle = currItem.title;
    var itemDueDate = new Date(currItem.dueDate.toString());
    var itemDueDateString = itemDueDate.toLocaleDateString();
    itemContainer.innerText = itemTitle + " by " + itemDueDateString;
    itemContainer.onclick = function () {
        toggleCompletionStatus(itemContainer, currItem);
    };
    if (currItem.isComplete) {
        markAsCompleted(itemContainer, currItem);
    }
    var displayItemsList = getByID("item-list");
    displayItemsList.appendChild(itemContainer);
    createRemoveItemSpan(itemContainer, currItem);
}
function toggleCompletionStatus(currContainer, currItem) {
    if (currItem.isComplete) {
        markAsUncompleted(currContainer, currItem);
    }
    else if (!currItem.isComplete) {
        markAsCompleted(currContainer, currItem);
    }
    saveItem(currItem);
}
function markAsCompleted(currContainer, currItem) {
    currItem.isComplete = true;
    currContainer.classList.add("completed");
}
function markAsUncompleted(currContainer, currItem) {
    currItem.isComplete = false;
    currContainer.classList.remove("completed");
}
function createRemoveItemSpan(currContainer, currItem) {
    var span = document.createElement("span");
    span.classList.add("remove-item");
    var removeIcon = document.createTextNode("\u00D7");
    span.appendChild(removeIcon);
    currContainer.appendChild(span);
    span.onclick = function removeItemFromPage() {
        removeItemFromStorage(currItem);
        var displayItemsList = getByID("item-list");
        displayItemsList.removeChild(currContainer);
    };
}
function removeItemFromStorage(currItem) {
    var savedItems = getAllSavedItems();
    for (var currIndex = 0; currIndex < savedItems.length; currIndex++) {
        if (currItem.id == savedItems[currIndex].id) {
            savedItems.splice(currIndex, 1);
        }
    }
    pushToStorage(savedItems);
}
function saveItem(currItem) {
    var savedItems = getAllSavedItems();
    if (savedItems == null) {
        savedItems = new Array();
    }
    var itemReplaced = false;
    for (var currIndex = 0; currIndex < savedItems.length; currIndex++) {
        if (currItem.id == savedItems[currIndex].id) {
            savedItems.splice(currIndex, 1, currItem);
            itemReplaced = true;
        }
    }
    if (!itemReplaced) {
        savedItems.push(currItem);
    }
    pushToStorage(savedItems);
}
function getAllSavedItems() {
    var itemsString = localStorage.getItem(toDoKey);
    var savedItems = JSON.parse(itemsString);
    return savedItems;
}
function displayAllSavedItems() {
    resetAllItemID();
    var savedItems = getAllSavedItems();
    for (var currIndex = 0; currIndex < savedItems.length; currIndex++) {
        displayItem(savedItems[currIndex]);
    }
}
function allDataValid() {
    var allDataValid = true;
    if (isInputEmpty("title")) {
        displayError("You must enter an item title!");
        allDataValid = false;
    }
    if (!isValidDate("due-date")) {
        allDataValid = false;
    }
    return allDataValid;
}
function isInputEmpty(id) {
    var userInput = getInputByID(id).value;
    if (userInput.trim() == "") {
        return true;
    }
    return false;
}
function isValidDate(id) {
    var userInput = getInputByID(id).value;
    if (isInputEmpty(id)) {
        displayError("You must select a due date!");
        return false;
    }
    var dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;
    var isDate = dateFormat.test(userInput);
    if (!isDate) {
        displayError("Please enter due date as mm/dd/yyyy");
        return false;
    }
    return true;
}
function displayError(errorMessage) {
    var errorContainer = document.createElement("li");
    errorContainer.classList.add("error");
    errorContainer.innerText = errorMessage;
    var displayErrorsList = getByID("error-list");
    displayErrorsList.appendChild(errorContainer);
}
function clearAllErrors() {
    var errorSummary = getByID("error-list");
    errorSummary.innerText = "";
}
function clearAllTextBoxes() {
    var allTextBoxes = document.querySelectorAll(".textbox");
    for (var currIndex = 0; currIndex < allTextBoxes.length; currIndex++) {
        var currTextBox = allTextBoxes[currIndex];
        currTextBox.value = "";
    }
}
var totalIDCount = 1;
function incrementIDCount() {
    return totalIDCount++;
}
function resetAllItemID() {
    totalIDCount = 1;
    var savedItems = getAllSavedItems();
    for (var currIndex = 0; currIndex < savedItems.length; currIndex++) {
        var currItem = savedItems[currIndex];
        currItem.id = incrementIDCount();
    }
    pushToStorage(savedItems);
}
var toDoKey = "todo-items";
function pushToStorage(savedItems) {
    var itemsString = JSON.stringify(savedItems);
    localStorage.setItem(toDoKey, itemsString);
}
function setupButton(id, useFunction) {
    var button = getByID(id);
    button.onclick = useFunction;
}
function getInputByID(id) {
    return getByID(id);
}
function getByID(id) {
    return document.getElementById(id);
}
