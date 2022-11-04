var ToDoItem = (function () {
    function ToDoItem(itemTitle, itemDueDate) {
        this.itemTitle = itemTitle;
        this.itemDueDate = itemDueDate;
    }
    return ToDoItem;
}());
window.onload = function () {
    setupButton("add-item", addToDoItem);
};
function addToDoItem() {
    clearPreviousErrors();
    if (allDataValid()) {
        var currentItem = getToDoItem();
        displayToDoItem(currentItem);
    }
    clearTextBoxes();
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
function getToDoItem() {
    var itemTitle = getInputByID("title").value;
    var dueDateTextBox = getInputByID("due-date");
    var itemDueDate = new Date(dueDateTextBox.value);
    var currentItem = new ToDoItem(itemTitle, itemDueDate);
    return currentItem;
}
function displayToDoItem(currentItem) {
    var itemContainer = document.createElement("li");
    var itemTitle = currentItem.itemTitle;
    var itemDueDate = currentItem.itemDueDate.toLocaleDateString();
    var itemInfo = itemTitle + " by " + itemDueDate;
    itemContainer.innerText = itemInfo;
    itemContainer.onclick = toggleCompletion;
    var displayItemsList = getByID("item-list");
    displayItemsList.appendChild(itemContainer);
    createRemoveItemSpan(itemContainer);
}
function createRemoveItemSpan(currentItemContainer) {
    var span = document.createElement("span");
    span.classList.add("remove-item");
    var x = document.createTextNode("\u00D7");
    span.appendChild(x);
    currentItemContainer.appendChild(span);
    span.onclick = removeItem;
}
function removeItem() {
    var currentSpan = this;
    var li = currentSpan.parentElement;
    var displayItemsList = getByID("item-list");
    displayItemsList.removeChild(li);
}
function toggleCompletion() {
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
function clearPreviousErrors() {
    var errorSummary = getByID("error-list");
    errorSummary.innerHTML = "";
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
    if (userInput == "" || userInput.trim() == "") {
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
