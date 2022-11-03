class ToDoItem {
    itemTitle:string;
    itemDueDate:Date;
    isCompleted:boolean;

    constructor(itemTitle:string, itemDueDate:Date, isCompleted:boolean) {
        this.itemTitle = itemTitle;
        this.itemDueDate = itemDueDate;
        this.isCompleted = isCompleted;
    }
}