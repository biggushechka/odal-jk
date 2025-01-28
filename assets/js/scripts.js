// ---------- var global ----------
var version = document.querySelector("#versionFiles").getAttribute("version");


// ---------- import ----------
$.ajax({ // modal
    async: false,
    url: "/components/modal.js?v="+version,
    dataType: "script"
});

$.ajax({ // submitForm
    async: false,
    url: "/components/submitForm.js?v="+version,
    dataType: "script"
});

$(document).ready(function () {
    $(".phone").mask('+7 (999)-999-99-99');
});