var ToDoItem = (function () {
    function ToDoItem(itemTitle, itemDueDate, isCompleted) {
        this.itemTitle = itemTitle;
        this.itemDueDate = itemDueDate;
        this.isCompleted = isCompleted;
    }
    return ToDoItem;
}());
