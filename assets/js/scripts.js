// ---------- var global ----------
var version = document.querySelector("#configmeta").getAttribute("version"),
    $domain = document.querySelector("#configmeta").getAttribute("domain");


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

$.ajax({ // quiz
    async: false,
    url: "/plugins/quiz-amos/quiz.js?v="+version,
    dataType: "script"
});

// *** Сразу, после загрузки сайта ***
// $(document).ready(function () {
// initQuiz();
// })

// *** По клику ***
// $(document).on('click', '.btn-init-quiz', function () {
//     initQuiz();
// })

// *** По таймеру ***
$(function () {
    setTimeout(function () {
        if ( $('.am-modal-quiz').length) {
            initQuiz();
        }
    }, 2000)
})

$(document).ready(function () {
    $(".phone").mask('+7 (999)-999-99-99');
});

function mergeJson(json1, json2) {
    for(var i in json1){
        if(getType(json1[i]) == 'object'){
            for(var k in json1[i]){
                if(getType(json1[i][k]) == 'object'){
                    for(var p in json1[i][k]){
                        if(json2[i]!=undefined && json2[i][k]!=undefined && json2[i][k][p] != undefined) json1[i][k][p] = json2[i][k][p];
                    }
                }else{
                    if(json2[i] != undefined && json2[i][k] != undefined) json1[i][k] = json2[i][k];
                }
            }
        }else{
            if(json2[i] != undefined) json1[i] = json2[i];
        }
    }
    return json1;
}

function getType(p) {
    if (Array.isArray(p)) return 'array';
    else if (typeof p == 'string') return 'string';
    else if (p != null && typeof p == 'object') return 'object';
    else return 'other';
}