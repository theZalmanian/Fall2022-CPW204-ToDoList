var picker = datepicker("#due-date", {
    formatter: function (input, date, instance) {
        var value = date.toLocaleDateString();
        input.value = value;
    },
    customDays: ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']
});
picker.setMin(new Date());
