class ToDoItem {
    id:number;
    title:string;
    dueDate:Date;
    isComplete:boolean;

    /**
     * Standard constructor of a to-do item object
     * @param itemID The item's id in relation to other items
     * @param itemTitle The task to be done
     * @param itemDueDate The date by which the task needs to be completed
     * @param isItemComplete Whether the item has been completed or not
     */
    constructor(itemID:number, itemTitle:string, itemDueDate:Date, isItemComplete:boolean) {
        this.id = itemID;
        this.title = itemTitle;
        this.dueDate = itemDueDate;
        this.isComplete = isItemComplete;
    }
}

window.onload = function():void {
    // setup onclick event for add item button
    setupButton("add-item", addItem);

    // load saved items, if any
    displayAllSavedItems();
}

/*******************
**** TO-DO ITEM ****
*******************/

/** 
 * This function is called when the add item button is clicked
 * 
 * If all form input is valid, creates the to-do item, displays it 
 * at the bottom of the page, and saves it to local storage
*/
function addItem():void {
    // clear out previous errors, if any
    clearAllErrors();

    // if all form data is valid
    if(allDataValid()) {
        // create new to-do item
        let newItem:ToDoItem = createItem();

        // display at bottom of page
        displayItem(newItem);

        // save item in local storage
        saveItem(newItem);
        
        // clear out all inputs
        clearAllTextBoxes();
    }
}

/**
 * Creates a new ToDoItem object and populates it with
 * the user's input
 * @returns The new ToDoItem object
 */
 function createItem():ToDoItem {
    // set an id for the item based on 
    // previously existing # of items
    let itemID:number = incrementIDCount();

    // get item title
    let itemTitle:string = getInputByID("title").value;

    // get item due date
    let dueDateTextBox:HTMLInputElement = getInputByID("due-date");
    let itemDueDate:Date = new Date(dueDateTextBox.value);
    
    // create new instance of ToDoItem
    let newItem:ToDoItem = new ToDoItem(itemID, itemTitle, itemDueDate, false);

    // return new instance of ToDoItem
    return newItem;
}

/**
 * Displays a given to-do item at the bottom of the page
 * @param currItem The ToDo Item being displayed
 */
function displayItem(currItem:ToDoItem):void {
    // create a new li to hold item info and the removal span
    let itemContainer:HTMLLIElement = document.createElement("li");
    
    // give it the item-container class
    itemContainer.classList.add("item-container");

    // create new div to hold item info
    let itemInfoContainer:HTMLDivElement = document.createElement("div");
    
    // get to-do item's title
    let itemTitle:string = currItem.title;

    // get to-do item's due date as a date
    let itemDueDate:Date = new Date(currItem.dueDate.toString());

    // format the date as mm/dd/yyyy
    let itemDueDateString:string = itemDueDate.toLocaleDateString();

    // place to-do item's info in container
    itemInfoContainer.innerText = itemTitle + " by " + itemDueDateString;

    // place the info container in the item container
    itemContainer.appendChild(itemInfoContainer);

    // setup onclick event for info container
    itemInfoContainer.onclick = function():void {
        // when clicked it will toggle as completed/uncompleted
        toggleCompletionStatus(itemContainer, currItem);
    };

    // if the current item is being added from local storage
    // and already marked as completed, display it as such
    if(currItem.isComplete) {
        markAsCompleted(itemContainer, currItem);
    }

    // grab the ul where to-do items are displayed
    let displayItemsList:HTMLElement = getByID("item-list");

    // place the new li within it
    displayItemsList.appendChild(itemContainer);

    // create a remove-item span that when clicked will remove
    // the to-do item, and set it at the end of the item container
    createRemoveItemSpan(itemContainer, currItem);
}

/**
 * When a to-do item's info container is clicked-
 * 
 * If it is uncompleted, marks it as completed
 * 
 * If it is completed, marks it as uncompleted
 * @param currContainer The container that was clicked
 * @param currItem The ToDo Item being marked as complete/incomplete
 */
 function toggleCompletionStatus(currContainer:HTMLLIElement, currItem:ToDoItem):void {
    // if the to-do item is already marked as completed
    if(currItem.isComplete) {
        // mark as uncompleted
        markAsUncompleted(currContainer, currItem);
    }
    
    // if marked as uncompleted
    else if(!currItem.isComplete) {
        // mark as completed
        markAsCompleted(currContainer, currItem);
    }

    // save the item in local storage
    saveItem(currItem);
}

/**
 * Marks a to-do item as completed
 * @param currContainer The container that was clicked
 * @param currItem The ToDo Item being marked as complete
 */
function markAsCompleted(currContainer:HTMLLIElement, currItem:ToDoItem):void {
    // set the to-do item as completed
    currItem.isComplete = true;

    // give the container the completed class
    currContainer.classList.add("completed");
}

/**
 * Marks a to-do item as uncompleted
 * @param currContainer The container that was clicked
 * @param currItem The ToDo Item being marked as uncompleted
 */
function markAsUncompleted(currContainer:HTMLLIElement, currItem:ToDoItem):void {
    // set the to-do item as 
    currItem.isComplete = false;

    // remove the completed class from the container
    currContainer.classList.remove("completed");
}

/**
 * Creates a span and adds it to the end of the current item's container
 * 
 * When the span is clicked, the current item will be removed from both
 * the page, and local storage
 * @param currContainer The container to which the span will be added
 * @param currItem The item being removed when the span is clicked
 */
function createRemoveItemSpan(currContainer:HTMLLIElement, currItem:ToDoItem):void {
    // create a span
    let span:HTMLSpanElement = document.createElement("span");

    // give it the remove-item class
    span.classList.add("remove-item");

    // create a unicode multiplication sign
    let removeIcon:Text = document.createTextNode("\u00D7");

    // place it in the span to represent a 'remove icon' 
    span.appendChild(removeIcon);

    // add the span to the end of the to-do item container
    currContainer.appendChild(span);

    // setup onclick event for span, so that when clicked
    // current item will be removed
    span.onclick = function removeItemFromPage():void {
        // remove the current item from local storage
        removeItemFromStorage(currItem);

        // grab the ul where to-do items are displayed
        let displayItemsList:HTMLElement = getByID("item-list");

        // remove the current item from the page
        displayItemsList.removeChild(currContainer);
    };
}

/**
 * When a 'remove-item' span is clicked, removes
 * the corresponding to-do item from local storages
 * @param currItem The item being removed from local storage
 */
function removeItemFromStorage(currItem:ToDoItem):void {
    // get all items currently stored in local storage
    let savedItems:ToDoItem[] = getAllSavedItems();

    // run through all saved items
    for(let currIndex:number = 0; currIndex < savedItems.length; currIndex++) {
        // find the index where the current item is held
        if(currItem.id == savedItems[currIndex].id) {
            // remove the item from the array
            savedItems.splice(currIndex, 1);
        }
    }

    // send all remaining items back into local storage
    pushToStorage(savedItems);
}

/****************
**** STORAGE ****
****************/

/**
 * The key that holds all to-do item's in local storage
 */
 const toDoKey:string = "todo-items";

/**
 * Stores the passed through to-do item in local storage
 * @param currItem The item being saved in local storage
 */
function saveItem(currItem:ToDoItem):void {
    // get all items currently stored in local storage
    let savedItems:ToDoItem[] = getAllSavedItems();

    // if no items are found in the array 
    if(savedItems == null) {
        // reset array to be empty
        savedItems = new Array();
    }

    // run through all saved items to check if the current item
    // is already saved in local storage
    let itemReplaced = false;
    for(let currIndex:number = 0; currIndex < savedItems.length; currIndex++) {
        // if the item is already saved in local storage
        if(currItem.id == savedItems[currIndex].id) {
            // replace the version in local storage with the 
            // current item (newest version)
            savedItems.splice(currIndex, 1, currItem);

            // indicate that an item was replaced
            itemReplaced = true;
        }
    }

    // as long as an item was not replaced by it's copy
    if(!itemReplaced) {
        // add current item to end of the array
        savedItems.push(currItem);
    }

    // send all items back into local storage
    pushToStorage(savedItems);
}

/**
 * Gets all items currently stored in local storage,
 * and returns them in an array
 * 
 * If no items are found, returns null
 * @returns An array of stored ToDo Items if present, null if not
 */
function getAllSavedItems():ToDoItem[] {
    // get item string from local storage
    let itemsString:string = localStorage.getItem(toDoKey);

    // convert it into a ToDoItem and place in array
    let savedItems:ToDoItem[] = JSON.parse(itemsString);

    // return the array
    return savedItems;
}

/**
 * When called gets all to-do items stored in local storage,
 * and displays them at the bottom of the page
 */
 function displayAllSavedItems():void {
    // reset the id's of all items currently 
    // stored in local storage
    resetAllItemID();

    // get all items currently stored in local storage
    let savedItems:ToDoItem[] = getAllSavedItems();

    // run through all saved items
    for(let currIndex:number = 0; currIndex < savedItems.length; currIndex++) {
        // display the current item at the bottom of the page
        displayItem(savedItems[currIndex]);
    }
}

/*******************
**** VALIDATION ****
*******************/

/**
 * Checks if all the submitted form data is valid input.
 * 
 * If all data is valid, returns true, if not returns false and displays
 * the appropriate error message(s)
 * @returns True if all data is valid; otherwise False
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
 * Checks if input is empty, and returns true or false correspondingly
 * @param id The id of the input being checked
 * @returns True if input is empty; otherwise False
 */
 function isInputEmpty(id:string):boolean {
    // get value from textbox
    let userInput:string = getInputByID(id).value;
    
    // check if input is empty
    if(userInput.trim() == "") {
        return true;
    }
    
    // if textbox contains text
    return false;
}

/**
 * Checks if the date entered is formatted correctly
 * 
 * If date is not valid, displays the appropriate error message(s)
 * @param id The id of the input being checked
 * @returns True if date is valid; otherwise false
 */
 function isValidDate(id:string):boolean {
    // get value from textbox
    let userInput:string = getInputByID(id).value;

    // check if input is empty
    if(isInputEmpty(id)) {
        displayError("You must select a due date!");
        return false;
    } 
    
    // setup regular expression for date validation
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

/*************************
**** ERRORS & CLEANUP ****
*************************/

/**
 * Displays the given error message above the form
 * @param errorMessage The error message being displayed
 */
 function displayError(errorMessage:string):void {
    // create an li to hold the error message
    let errorContainer:HTMLElement = document.createElement("li");

    // give it the error class
    errorContainer.classList.add("error");

    // place error message within it
    errorContainer.innerText = errorMessage;

    // grab the ul where errors are displayed
    let displayErrorsList:HTMLElement = getByID("error-list");

    // place new li within it
    displayErrorsList.appendChild(errorContainer);
}

/**
 * Clears out all errors displayed on the form when called
 */
 function clearAllErrors():void {
    let errorSummary = getByID("error-list");
    errorSummary.innerText = "";
}

/**
 * Clears out all textboxes on the form when called
 */
function clearAllTextBoxes():void {
    // grab all textboxes on form
    let allTextBoxes = document.querySelectorAll(".textbox");

    // run through all textboxes
    for(let currIndex = 0; currIndex < allTextBoxes.length; currIndex++) {
        // grab current textbox
        let currTextBox = <HTMLInputElement> allTextBoxes[currIndex];

        // set it's value to empty string
        currTextBox.value = "";
    }
}

/***********
**** ID ****
***********/

/**
 * The number of to-do item's currently
 * on the page/in local storage
 */
let totalIDCount = 1;  

/**
 * When called, increments the total id count, and returns
 * the resulting number
 * @returns The number of currently existing to-do items + 1
 */
function incrementIDCount():number {
    return totalIDCount++;
}

/**
 * When called, reset's the total id count back to 1,
 * and then runs through all item's in local storage and
 * set's their id's based on the total id count
 */
function resetAllItemID():void {
    // reset the total id count
    totalIDCount = 1;

    // get all items currently stored in local storage
    let savedItems:ToDoItem[] = getAllSavedItems();

    // run through all saved items
    for(let currIndex:number = 0; currIndex < savedItems.length; currIndex++) {
        // get current item in array
        let currItem = savedItems[currIndex];

        // set that item's id based on the number
        // of already existing to-do items
        currItem.id = incrementIDCount();
    }

    // send all items back into local storage
    pushToStorage(savedItems);
}

/****************
**** HELPERS ****
****************/

/**
 * Takes an array of to-do item's and places it in local storage
 * @param savedItems An array containing all the to-do items being saved
 */
 function pushToStorage(savedItems: ToDoItem[]):void {
    // convert array to JSON string
    let itemsString:string = JSON.stringify(savedItems);

    // place in local storage
    localStorage.setItem(toDoKey, itemsString);
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