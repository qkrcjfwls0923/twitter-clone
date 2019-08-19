function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$(document).ready(function() {
    $('.remove-post').each(function() {
        $(this).click(function() {
            var id = $(this).data("id");
            $.ajax({
                url: "/post",
                type: "delete",
                contentType:"application/json; charset=UTF-8",
                data: JSON.stringify({"post-id": id}),
                dataType: "json",
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                    }
                },
                success: function(data) {
                    console.log(data);
                    if (!data.success) {
                        alert(data.message);
                    } else {
                        location.reload();
                    }
                },
                error: function(request, status, error) {

                }
            })
        });
    });

    $('.like-post').each(function() {
        $(this).click(function() {
            var id = $(this).data("id");
            $.ajax({
                url: "/like",
                type: "post",
                contentType:"application/json; charset=UTF-8",
                data: JSON.stringify({"post-id": id}),
                dataType: "json",
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                    }
                },
                success: function(data) {
                    console.log(data);
                    if (!data.success) {
                        alert(data.message);
                    } else {
                        location.reload();
                    }
                },
                error: function(request, status, error) {

                }
            })
        })
    })
})