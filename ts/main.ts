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

window.onload = function():void {
    // setup onclick event for add game button
    setupButton("add-item", addToDoItem);
}

/** 
 * This function is called when the add item button is clicked,
 * and displays the to-do item if all form input is valid
*/
function addToDoItem():void {
    // clear out previous errors, if any

    // check if all data is valid
    if(allDataValid) {
        // create new to-do item
        let currentItem:ToDoItem = getToDoItem();

        // display to-do item
        displayToDoItem(currentItem);
    }
}

/**
 * Checks if all the submitted form data is valid input.
 * 
 * If all data is valid, returns true, if not returns false and displays
 * the appropriate error message(s)
 * @returns True if all data is valid, False if not
 */
 function allDataValid():boolean {
    // setup flag
    let allDataValid:boolean = true;

    // validate title

    return allDataValid;
 }

/**
 * Creates a new ToDoItem object and populates it with
 * data from the form
 * @returns The new ToDoItem object
 */
 function getToDoItem():ToDoItem {
    // get title
    let itemTitle:string = getInputByID("title").value;

    // get due date
    let dueDateTextBox = getInputByID("due-date");
    let itemDueDate:Date = new Date(dueDateTextBox.value);
    
    // create new instance of ToDoItem
    let currentItem:ToDoItem = new ToDoItem(itemTitle, itemDueDate, false);

    // returns new instance of ToDoItem
    return currentItem;
}

function displayToDoItem(currentItem:ToDoItem):void {

}

/**
 * Sets up an onclick event for a button
 * @param id The button's id
 * @param useFunction The function to be called when button is clicked
 */
 function setupButton(id:string, useFunction:() => void):void {
    let button:HTMLElement = getByID(id);
    button.onclick = useFunction;
}

/**
 * Gets an HTML Input Element by it's ID
 * @param id - The input's id
 * @returns The corresponding HTML Input Element
 */
 function getInputByID(id:string):HTMLInputElement {
    return <HTMLInputElement> getByID(id);
}

/**
 * Shortened form of the document.getElementById method
 * @param id - The element's id
 * @returns The corresponding HTML Element
 */
 function getByID(id:string):HTMLElement {
    return document.getElementById(id);
}