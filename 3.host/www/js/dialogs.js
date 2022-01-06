$(function() {
    $('.js-sweetalert button').on('click', function() {
        var type = $(this).data('type');
        if (type === 'basic') {
            showBasicMessage();
        } else if (type === 'with-title') {
            showWithTitleMessage();
        } else if (type === 'success') {
            showSuccessMessage();
        } else if (type === 'confirm') {
            showConfirmMessage();
        } else if (type === 'cancel') {
            showCancelMessage();
        } else if (type === 'with-custom-icon') {
            showWithCustomIconMessage();
        } else if (type === 'html-message') {
            showHtmlMessage();
        } else if (type === 'autoclose-timer') {
            showAutoCloseTimerMessage();
        } else if (type === 'prompt') {
            showPromptMessage();
        } else if (type === 'ajax-loader') {
            showAjaxLoaderMessage();
        }
    });
});

//These codes takes from http://t4t5.github.io/sweetalert/
function showBasicMessage() {
    swal("Here's a message!");
}

function showWithTitleMessage() {
    swal("Here's a message!", "It's pretty, isn't it?");
}

function showMessage(title, text, type) {
    var span = document.createElement("span");
    span.innerHTML = text;
    swal({
        title: title,
        content: span,
        icon: type,
    });
}

function showMessageNoButton(title, text, type) {
    var span = document.createElement("span");
    span.innerHTML = text;
    swal({
        title: title,
        content: span,
        buttons: false,
        closeModal: false,
        icon: type,
    });
}

function showConfirmMessage() {
    swal({
        title: "Are you sure?",
        text: "Do you want du upload this Icon? After uploading, you can no longer edit it!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, upload it!",
        closeOnConfirm: false
    }, function(isConfirm) {
        if (isConfirm) {
            awtrix_raiseEvent("upload_icon", { "value": "value" });
        }
    });
}


function showCancelMessage() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function(isConfirm) {
        if (isConfirm) {
            swal("Deleted!", "Your imaginary file has been deleted.", "success");
        } else {
            awtrix_raiseEvent(event, { "value": value });
        }
    });
}

function showDeleteMessage(item) {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover " + item,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel pls!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function(isConfirm) {
        if (isConfirm) {
            awtrix_raiseEvent("delete_app", { 'app': item });
        }
    });
}

function showWithCustomIconMessage(title, text, icon) {
    var text1 = document.createElement("span");
    text1.innerHTML = text;
    swal({
        title: title,
        text: text,
        icon: "../assets/" + icon
    });
}

function showHtmlMessage(title, text, icon) {
    var text1 = document.createElement("span");
    text1.innerHTML = text;
    swal({
        title: title,
        content: text1,
        icon: "../assets/" + icon,
    });
}




function showAutoCloseTimerMessage() {
    swal({
        title: "Auto close alert!",
        text: "I will close in 2 seconds.",
        timer: 2000,
        button: false
    });
}




function showPromptMessage(title, text1, event) {
    swal({
            title: title,
            text: text1,
            content: "input",
            buttons: true,
            closeModal: false,
        })
        .then((value) => {
            awtrix_raiseEvent(event, { "value": value, "oldvalue": text1 });
        });
}

function showAjaxLoaderMessage() {
    swal("Write something here:", {
            content: "input",
        })
        .then((value) => {
            return value;
        });
}

function showAppOptions(app, enable) {
    swal({
        buttons: {
            one: {
                text: enable,
                value: enable
            },
            two: {
                text: "Setup",
                value: "Setup",
                className: 'bg-blue'
            },
            three: {
                text: "Sort Apps",
                value: "Sort Apps",
                className: 'bg-blue-grey'
            },
            four: {
                text: "Delete",
                value: "Delete",
                className: 'bg-red'

            }
        },
        title: app
    }).then(value => {
        switch (value) {
            case "Enable":
                awtrix_raiseEvent("enable_app", { 'app': app });
                break;
            case "Disable":
                awtrix_raiseEvent("disable_app", { 'app': app });
                break;
            case "Delete":
                awtrix_raiseEvent("delete_app", { 'app': app });
                break;
            case "Setup":
                awtrix_raiseEvent("setup_app", { 'app': app });
                break;
            case "Sort Apps":
                window.location.href = "/pages/sortApps.html";
        }
    });
}


function genDownloadMessage(text, app, no, download) {
    swal(text, {
            icon: "info",
            buttons: {
                cancel: no,
                catch: {
                    text: download,
                    value: "Download",
                },
                defeat: false,
            },
        })
        .then((value) => {
            switch (value) {
                case "Download":
                    awtrix_raiseEvent("download_app", { 'app': app });
                    break;
            }
        });
};

function genDeleteMessage(text, app, no, del) {
    swal(text, {
            icon: "warning",
            buttons: {
                cancel: no,
                catch: {
                    text: del,
                    value: "Delete",
                },
                defeat: false,
            },
        })
        .then((value) => {
            switch (value) {
                case "Delete":
                    awtrix_raiseEvent("delete_app", { 'app': app });
                    break;
            }
        });
};

function genDownloadSuccessMessage(text, app, myapp, ok, myApps, whoop) {
    swal(text, {
            icon: "success",
            title: whoop,
            buttons: {
                cancel: ok,
                catch: {
                    text: myapp,
                    value: "myApps",
                },
                defeat: false,
            },
        })
        .then((value) => {
            switch (value) {
                case "myApps":
                    window.location.href = "/pages/myApps.html#" + app.toLowerCase();
            }
        });
};

function genUpdateMessage(text, app, no, up) {
    swal(text, {
            icon: "info",
            buttons: {
                cancel: no,
                catch: {
                    text: up,
                    value: "Update",
                },
                defeat: false,
            },
        })
        .then((value) => {
            switch (value) {
                case "Update":
                    awtrix_raiseEvent("update_app", { 'app': app });
                    break;
            }
        });
};

function ShowLinkMessage(titel, body, btn, link) {
    $('#alertModalLabel').html(titel);
    $('#alertModalBody').html(body);
    if (typeof btn !== "undefined") {
        $('#goToButton').html(btn);
        document.getElementById('goToButton').href = link;
    } else {
        $('#goToButton').hide();
    }
    $('#mdModal').modal('show')
};

function genUploadMessage(text, yes, no) {
    swal(text, {
            icon: "warning",
            buttons: {
                cancel: no,
                catch: {
                    text: yes,
                    value: "Upload",
                },
                defeat: false,
            },
        })
        .then((value) => {
            switch (value) {
                case "Upload":
                    awtrix_raiseEvent("upload_icon", { 'icon': "" });
                    break;
            }
        });
};

function genAnimationMessage(animation, text, yes, no) {
    swal(text, {
            icon: "warning",
            buttons: {
                cancel: no,
                catch: {
                    text: yes,
                    value: "Oh yes!",
                },
                defeat: false,
            },
        })
        .then((value) => {
            switch (value) {
                case "Oh yes!":
                    awtrix_raiseEvent("upload_animation", { 'animation': animation });
                    break;
            }
        });
};