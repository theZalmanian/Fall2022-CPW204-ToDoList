// setup datepicker
// @ts-ignore datepicker to avoid TS error
const picker = datepicker("#due-date", {
    // display the date as mm/dd/yyyy
    formatter: (input, date, instance) => {
        const value = date.toLocaleDateString()
        input.value = value;
    },
    
    // change the formatting of the days in the calender
    customDays: ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']
});

// set minimum date to today's date
picker.setMin(new Date()); 