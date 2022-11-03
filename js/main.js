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
    if (allDataValid) {
        var currentItem = getToDoItem();
        displayToDoItem(currentItem);
    }
}
function allDataValid() {
    var allDataValid = true;
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
