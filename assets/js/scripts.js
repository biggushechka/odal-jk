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

$.ajax({ // telegram
    async: false,
    url: "/assets/js/sendTelegram.js?v="+version,
    dataType: "script"
});

// $.ajax({ // quiz
//     async: false,
//     url: "/plugins/quiz-amos/quiz.js?v="+version,
//     dataType: "script"
// });

// *** Сразу, после загрузки сайта ***
// $(document).ready(function () {
// initQuiz();
// })

// *** По клику ***
// $(document).on('click', '.btn-init-quiz', function () {
//     initQuiz();
// })

// *** По таймеру ***
// $(function () {
//     setTimeout(function () {
//         if ( $('.am-modal-quiz').length) {
//             initQuiz();
//         }
//     }, 2000)
// })

$(document).ready(function () {
    $(".phone").mask('+7 (999)-999-99-99');
});

