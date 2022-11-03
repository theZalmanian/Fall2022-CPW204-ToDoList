var ToDoItem = (function () {
    function ToDoItem(itemTitle, itemDueDate, isCompleted) {
        this.itemTitle = itemTitle;
        this.itemDueDate = itemDueDate;
        this.isCompleted = isCompleted;
    }
    return ToDoItem;
}());
window.onload = function () {
    setupButton("add-item", addToDoItem);
};
function addToDoItem() {
}
function allDataValid() {
    var allDataValid = true;
    return allDataValid;
}
function getToDoItem() {
}
function displayToDoItem() {
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
