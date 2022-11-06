class ToDoItem {
    title:string;
    dueDate:Date;

    constructor(itemTitle:string, itemDueDate:Date) {
        this.title = itemTitle;
        this.dueDate = itemDueDate;
    }
}

window.onload = function():void {
    // setup onclick event for add item button
    setupButton("add-item", addItem);

    // load saved items, if any
    loadSavedItems();
}

/** 
 * This function is called when the add item button is clicked.
 * Creates and displays the to-do item at the bottom of the form,
 * if all form input is valid
*/
function addItem():void {
    // clear out previous errors, if any
    clearErrors();

    // check if all data is valid
    if(allDataValid()) {
        // create new to-do item
        let currentItem:ToDoItem = createItem();

        // display to-do item
        displayItem(currentItem);

        // save item in local storage
        saveItem(currentItem);
        
        // clear out inputs
        clearTextBoxes();
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
    if(isInputEmpty("title")) {
        displayError("You must enter an item title!");
        allDataValid = false;
    }

    // validate due date
    if(!isValidDate("due-date")) {
        allDataValid = false;
    }

    return allDataValid;
 }

/**
 * Creates a new ToDoItem object and populates it with
 * data from the form
 * @returns The new ToDoItem object
 */
 function createItem():ToDoItem {
    // get title
    let itemTitle:string = getInputByID("title").value;

    // get due date
    let dueDateTextBox:HTMLInputElement = getInputByID("due-date");
    let itemDueDate:Date = new Date(dueDateTextBox.value);
    
    // create new instance of ToDoItem
    let currentItem:ToDoItem = new ToDoItem(itemTitle, itemDueDate);

    // returns new instance of ToDoItem
    return currentItem;
}

/**
 * Displays a given item at the bottom of the page
 * @param currentItem The current ToDo Item
 */
function displayItem(currentItem:ToDoItem):void {
    // create new li to hold item info
    let itemContainer:HTMLLIElement = document.createElement("li");
    
    // get to-do item's title
    let itemTitle:string = currentItem.title;

    // get to-do item's due date as a date
    let itemDueDate:Date = new Date(currentItem.dueDate.toString());

    // format the date as mm/dd/yyyy
    let itemDueDateString:string = itemDueDate.toLocaleDateString();

    // place to-do item's info in container
    itemContainer.innerText = itemTitle + " by " + itemDueDateString;

    // setup onclick event for li 
    itemContainer.onclick = toggleCompletionStatus;

    // grab the ul where to-do items are displayed
    let displayItemsList:HTMLElement = getByID("item-list");

    // place the new li within it
    displayItemsList.appendChild(itemContainer);

    // create remove-item span and attach to end of new li
    createRemoveItemSpan(itemContainer);
}

/**
 * Creates a span to act as a 'remove item' button,
 * and adds it to the end of the current item's container
 * @param currentContainer The container for the current ToDo Item
 */
function createRemoveItemSpan(currentContainer:HTMLLIElement):void {
    // create a span
    let span:HTMLSpanElement = document.createElement("span");

    // give it the remove-item class
    span.classList.add("remove-item");

    // create a unicode multiplication sign
    let removeIcon:Text = document.createTextNode("\u00D7");

    // place it in the span to represent 'remove button' 
    span.appendChild(removeIcon);

    // add the span to the end of the to-do item container
    currentContainer.appendChild(span);

    // setup onclick event for span
    span.onclick = removeItem;
}

/**
 * When a 'remove-item' span is clicked, removes
 * the corresponding to-do item from the items list
 */
function removeItem():void {
    // get span that was clicked
    let currentSpan:HTMLElement = <HTMLElement> this;

    // get the li that the span belongs to
    let itemContainer:HTMLElement = currentSpan.parentElement;

    // grab the ul where to-do items are displayed
    let displayItemsList:HTMLElement = getByID("item-list");

    // remove the to-do item from the list
    displayItemsList.removeChild(itemContainer);
}

/**
 * When a to-do item is clicked, marks it as completed.
 * If it was already completed, marks as uncompleted
 */
function toggleCompletionStatus():void {
    // get item that was clicked
    let currentItem:HTMLElement = <HTMLElement> this;

    // if already marked as completed, mark as uncompleted
    if(currentItem.className == "completed") {
        currentItem.classList.remove("completed");
    }

    // if marked as uncompleted, mark it as completed
    else {
        // give it the completed class
        currentItem.classList.add("completed");
    }
}

/**
 * Displays the given error message above the form
 */
 function displayError(errorMessage:string):void {
    // create an li to hold the error message
    let newError:HTMLElement = document.createElement("li");

    // give it the error class
    newError.classList.add("error");

    // place error message within it
    newError.innerText = errorMessage;

    // grab the ul where errors are displayed
    let displayErrorsList:HTMLElement = getByID("error-list");

    // place new li within it
    displayErrorsList.appendChild(newError);
}

/**
 * Clears out all errors displayed on the form when called
 */
 function clearErrors():void {
    let errorSummary = getByID("error-list");
    errorSummary.innerText = "";
}

/**
 * Clears out all textboxes on the form when called
 */
function clearTextBoxes():void {
    // grab all textboxes on form
    let allTextBoxes = document.querySelectorAll(".textbox");

    // run through all textboxes
    for(let i = 0; i < allTextBoxes.length; i++) {
        // grab current textbox
        let currentTextBox = <HTMLInputElement> allTextBoxes[i];

        // set it's value to empty string
        currentTextBox.value = "";
    }
}

/**
 * Checks if input is empty, or made up of whitespace
 * @param id The input's id.
 * @returns True if input is empty, False if not
 */
 function isInputEmpty(id:string):boolean {
    // get value from textbox
    let userInput:string = getInputByID(id).value;
    
    // check if user input is empty
    if(userInput.trim() == "") {
        return true;
    }
    
    // if textbox contains text
    return false;
}

/**
 * Checks if the date entered is formatted correctly. 
 * If date is not valid, displays the appropriate error message(s)
 * @param id The input's id
 * @returns True if date is valid, False if not.
 */
 function isValidDate(id:string):boolean {
    // get value from textbox
    let userInput:string = getInputByID(id).value;

    // check if empty string
    if(isInputEmpty(id)) {
        displayError("You must select a due date!");
        return false;
    } 
    
    // setup regular expression for validation
    // mm/dd/yyyy or m/d/yyyy
    let dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;

    // check if user input matches proper formatting
    let isDate = dateFormat.test(userInput);

    // if formatting is incorrect, show corresponding error
    if(!isDate) {
        displayError("Please enter due date as mm/dd/yyyy");
        return false;
    }
    
    // if date is formatted correctly
    return true;
}

const toDoKey:string = "todo";

/**
 * Stores a to-do item in local storage
 * @param item The item to be saved
 */
function saveItem(item:ToDoItem) {
    // get array of all currently stored items
    let currentItems:ToDoItem[] = getItems();

    // if no items are found in the array 
    if(currentItems == null) {
        // reset array to be empty
        currentItems = new Array();
    }

    // add current item to the array
    currentItems.push(item);

    // convert all ToDoItems to JSON string
    let currentItemsString:string = JSON.stringify(currentItems);

    // save them in local storage
    localStorage.setItem(toDoKey, currentItemsString);
}

/**
 * Gets all stored ToDo items from local storage 
 * and returns an array of them.
 * 
 * If no items are found, returns null
 * @returns An array of stored ToDo Items if present, null if not
 */
function getItems():ToDoItem[] {
    // get item string from local storage
    let itemString:string = localStorage.getItem(toDoKey);

    // convert it into a ToDoItem and place in array
    let items:ToDoItem[] = JSON.parse(itemString);

    // return the items 
    return items;
}

/**
 * Loads all items saved in local storage when called
 */
 function loadSavedItems():void {
    // get all items from local storage
    let savedItems:ToDoItem[] = getItems();

    // run through array
    for(let currentItem:number = 0; currentItem < savedItems.length; currentItem++) {
        // display each item at the bottom of the page
        displayItem(savedItems[currentItem]);
    }
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