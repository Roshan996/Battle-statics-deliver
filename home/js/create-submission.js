$(document).ready(function () {
    $("form").submit(function (e) {
        e.preventDefault(); // Prevent default form submission
        let formData = new FormData(this); // Get all form data, including files
        let bnt = document.getElementById('submit-bnt');
        bnt.disabled = !btn.disabled;
    
        $.ajax({
            url: "/create-card/",  // Your Django view URL
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.success) {
                    alert(data.message)
                    window.location.href = data.redirect
                } else {
                    alert(data.message)
                    window.location.href = data.redirect
                }
                        
            },
            error: function (xhr, error) {
                alert(xhr)
                        
            }
        });
    });
});
