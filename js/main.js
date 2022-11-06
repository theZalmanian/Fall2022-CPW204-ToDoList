var ToDoItem = (function () {
    function ToDoItem(itemTitle, itemDueDate) {
        this.title = itemTitle;
        this.dueDate = itemDueDate;
    }
    return ToDoItem;
}());
window.onload = function () {
    setupButton("add-item", addItem);
    loadSavedItems();
};
function addItem() {
    clearErrors();
    if (allDataValid()) {
        var currentItem = createItem();
        displayItem(currentItem);
        saveItem(currentItem);
        clearTextBoxes();
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
function createItem() {
    var itemTitle = getInputByID("title").value;
    var dueDateTextBox = getInputByID("due-date");
    var itemDueDate = new Date(dueDateTextBox.value);
    var currentItem = new ToDoItem(itemTitle, itemDueDate);
    return currentItem;
}
function displayItem(currentItem) {
    var itemContainer = document.createElement("li");
    var itemTitle = currentItem.title;
    var itemDueDate = new Date(currentItem.dueDate.toString());
    var itemDueDateString = itemDueDate.toLocaleDateString();
    itemContainer.innerText = itemTitle + " by " + itemDueDateString;
    itemContainer.onclick = toggleCompletionStatus;
    var displayItemsList = getByID("item-list");
    displayItemsList.appendChild(itemContainer);
    createRemoveItemSpan(itemContainer);
}
function createRemoveItemSpan(currentContainer) {
    var span = document.createElement("span");
    span.classList.add("remove-item");
    var removeIcon = document.createTextNode("\u00D7");
    span.appendChild(removeIcon);
    currentContainer.appendChild(span);
    span.onclick = removeItem;
}
function removeItem() {
    var currentSpan = this;
    var itemContainer = currentSpan.parentElement;
    var displayItemsList = getByID("item-list");
    displayItemsList.removeChild(itemContainer);
}
function toggleCompletionStatus() {
    var currentItem = this;
    if (currentItem.className == "completed") {
        currentItem.classList.remove("completed");
    }
    else {
        currentItem.classList.add("completed");
    }
}
function displayError(errorMessage) {
    var newError = document.createElement("li");
    newError.classList.add("error");
    newError.innerText = errorMessage;
    var displayErrorsList = getByID("error-list");
    displayErrorsList.appendChild(newError);
}
function clearErrors() {
    var errorSummary = getByID("error-list");
    errorSummary.innerText = "";
}
function clearTextBoxes() {
    var allTextBoxes = document.querySelectorAll(".textbox");
    for (var i = 0; i < allTextBoxes.length; i++) {
        var currentTextBox = allTextBoxes[i];
        currentTextBox.value = "";
    }
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
var toDoKey = "todo";
function saveItem(item) {
    var itemString = JSON.stringify(item);
    localStorage.setItem(toDoKey, itemString);
}
function getItem() {
    var itemString = localStorage.getItem(toDoKey);
    var item = JSON.parse(itemString);
    return item;
}
function loadSavedItems() {
    var currentItem = getItem();
    displayItem(currentItem);
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
