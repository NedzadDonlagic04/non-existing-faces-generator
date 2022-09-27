$("#generateForm").submit(function(e) {
    e.preventDefault();
    var form = $(this);

    $.ajax({
        type:'POST',
        url:'/',
        data:form.serialize(),
        success: function(data) {
            console.log(data);
        }
    });
});