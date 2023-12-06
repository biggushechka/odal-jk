const ver = Math.random();

if ($('#css_quiz').length == 0) {
    $('head').append(`<link rel="stylesheet" href="/plugins/quiz-amos/style.css?v=${ver}" id="css_quiz">`)
}

let quizAnswers = [];

function initQuiz(data) {

    var typeContainer = (data.append != undefined && data.append != '') ? 'block' : 'modal';

    const quiz = ajaxRequest({url: "/quiz-amos/questions/questions.json?v="+ver});

    var html= `
    <div class="am-modal-quiz ${typeContainer}" am-quiz>
        <div class="am-modal-body">
        
            <!-- Вступление -->
            <div class="am-step-start am-hide">
                <div class="am-left-col">
                    <img class="am-index-photo" src="/quiz-amos/questions/background.png" alt="img">
                </div>
                <div class="am-right-col">
                    <p class="am-slogan-title">`+quiz.start[0].slogan+`</p>
                    <div class="am-center-content">
                        <p class="am-heading-start">`+quiz.start[0].title+`</p>
                        <p class="am-desc-start">`+quiz.start[0].desc+`</p>
                        <p class="am-footnote-start">`+quiz.start[0].footnote+`</p>
                        <button class="am-btn am-btn-primary am-start-quiz">Пройти опрос <img src="https://sochi.estate/quiz-amos/icons/arrow-right.png"></button>
                    </div>
                </div>
            </div>
            
            <!-- Окно вопросов и сайдбар -->
            <div class="am-dialog-question">
                <!-- Окно с вопросами и навигацией -->
                <div class="am-list-question">
                    <!-- Слайдер -->
                    <div class="am-slider-quiz">
                        <!-- Вопрос -->
                        `+questions(quiz)+`
                    </div>
                    
                    <!-- Навигационный бар -->
                    `+navBar(quiz)+`
                <div>
            </div>
        </div>
        <!-- Правый сайдбар -->
        `+sidebar(quiz)+`
    </div>`;
    html = $(html);

    if (typeContainer == 'block') {
        $(data.append).append(html);
    } else {
        $('body').append(html);
    }


    setTimeout(function() {
        html.find('.am-step-start').removeClass('am-hide');
    }, 0);

    initSlider();


    // Закрыть модальное окно по фону
    html.click(function (e) {
        if($(e.target).closest('.am-modal-quiz').length && $(e.target).is('.am-modal-quiz') && typeContainer == 'modal') {
            html.remove();
        }
    });


    html.find('.am-start-quiz').click(function () {
        html.find('.am-dialog-question').addClass('am-show');
        html.find('.am-step-start').addClass('am-hide').fadeOut('fast');
    })

    $(document).on('click', '.am-question-slide.am-active .am-answer-list:not(.am-your-answer) .am-answer-item', function () {
        if ( !$(this).hasClass('am-select') ) {
            $('.am-question-slide.am-active .am-answer-item').removeClass('am-select');
            $(this).addClass('am-select');
            $('.am-btn-next').click()
        } else {
            $(this).removeClass('am-select');
        }
    });
}


function questions(quiz) {
    var slide = 1;
    var orderSlide = 1;
    var html = ``;

    for(var i=0; i < quiz.questions.length; i++){

        var typeAnswer = '';

        if ( quiz.questions[i].type === 'card' ) {
            typeAnswer = 'am-card-grid'
        } else if ( quiz.questions[i].type === 'list' ) {
            typeAnswer = 'am-list-grid'
        } else if ( quiz.questions[i].type === 'yourText' ) {
            typeAnswer = 'am-your-answer'
        }

        html += `
        <div class="am-question-slide" am-order="`+ orderSlide++ +`">
        
            <div class="am-question-title">
                <span class="am-count-question">`+ slide++ +`</span>
                <p class="am-title-question">`+quiz.questions[i].question+`</p>
            </div>

            <!-- Контейнер ответов - КАРТОЧКАМИ -->
            <div class="am-answer-list `+typeAnswer+`">`;
                for ( var a=0; a < quiz.questions[i].answer.length; a++ ) {
                    html += `
                    <div class="am-answer-item">`;

                    if ( quiz.questions[i].answer[a].photo != undefined ) {
                        html += `
                            <div class="am-photo-card am-box-ratio ratio3_4">
                                <div class="content">
                                    <img src="`+quiz.questions[i].answer[a].photo+`" alt="img">
                                </div>
                                <div class="am-checkbox"><img src="https://sochi.estate/quiz-amos/icons/checkbox.png"></div>
                            </div>`;
                    }

                    if ( quiz.questions[i].type != 'yourText' && quiz.questions[i].type != 'card' ) {
                        html += `
                        <div class="am-checkbox"><img src="https://sochi.estate/quiz-amos/icons/checkbox.png"></div>`;
                    }

                    if ( quiz.questions[i].type != 'yourText' ) {
                        html += `
                        <p class="am-title-answer">`+quiz.questions[i].answer[a].text+`</p>`;
                    }

                    if ( quiz.questions[i].type == 'yourText' ) {
                        html += `
                        <textarea placeholder="Напишите свой ответ..."></textarea>`;
                    }

            html += `</div>`;
                }
    html += `</div>
        </div>
        `
    }
    return html;
}

function navBar(quiz) {
    var html = `
    <div class="am-navbar-bottom">
        <div class="am-steps">
            <p class="am-step-text">Вопрос <span><span class="am-order">1</span> из `+quiz.questions.length+`</span></p>
        </div>
        <div class="am-buttons-nav">
            <button class="am-btn am-btn-secondary am-btn-prev">Назад</button>
            <button class="am-btn am-btn-primary am-btn-next"><span class="am-large-title">Следующий вопрос</span><span class="am-small-title">Далее</span> <img src="https://sochi.estate/quiz-amos/icons/arrow-right.png"></button>
        </div>
    </div>
    `;
    return html;
}

function sidebar(quiz) {
    var html = `
    <div class="am-right-col-sidebar">

        <!-- Скидка -->
        <div class="am-your-discount">
            <p class="am-amount">Ваша скидка: <span>`+quiz.start[0].discount+` руб.</span></p>
        </div>

        <!-- Менеджер -->
        <div class="am-manager-hint">
            <div class="am-manager">
                <img src="`+quiz.manager[0].photo+`" alt="avatar" class="am-avatar-manager">
                <p class="am-name">`+quiz.manager[0].name+`</p>
                <p class="am-position">`+quiz.manager[0].post+`</p>
            </div>
            <p class="am-hint-manager">`+quiz.manager[0].hint+`</p>
        </div>

        <!-- После ответов на вопросы, Вы получите -->
        <div class="am-after-answers">
            <p class="am-heading">После ответов на вопросы, Вы получите:</p>
            <div class="am-gifts">
                <div class="am-gift-item">
                    <img src="/quiz-amos/questions/gift-1.png" alt="img" class="am-gift-photo">
                    <p class="am-gift-title">`+quiz.gift[0].text+`</p>
                </div>
            </div>
            <div class="am-gifts">
                <div class="am-gift-item">
                    <img src="/quiz-amos/questions/gift-2.png" alt="img" class="am-gift-photo">
                    <p class="am-gift-title">`+quiz.gift[1].text+`</p>
                </div>
            </div>
        </div>
    </div>
    `;
    return html;
}



function finishQuiz() {
    var html = `
    <div class="am-finish-quiz am-hide">
        <div class="am-finish-text">
            <p class="am-heading">Отлично, остался последний шаг</p>
            <p class="am-desc">Оставьте свои контактные данные, и обработав Ваши ответы - мы вышлем Вам индидивуальное предложение</p>
        </div>
        <div class="am-finish-form">
            <form>
                <label>
                    <span>Ваше имя</span>
                    <input type="text" name="name" class="valid-check" placeholder="Имя" data-error="Введите имя">
                </label>
                <label>
                    <span>Номер телефона</span>
                    <input type="text" name="phone" class="valid-check mask-phone" placeholder="Телефон" data-error="Введите номер телефона">
                </label>
                <label class="container-approval">
                    <input type="checkbox" name="approval" checked class="valid-approval" data-error="Требуется согласие на обработку и передачу персональных данных">
                    <a href="https://sochi.estate/policy.html" target="_blank" class="link-approval">Согласие на обработку и передачу персональных данных</a>
                </label> 
                <button class="am-btn am-btn-primary am-send-form" type="button">Получить подборку <img src="https://sochi.estate/quiz-amos/icons/check.png"></button>
            </form>
        </div>
    </div>`;


    $('.am-dialog-question').fadeOut('slow', function(){
        $('.am-dialog-question').remove();
    });

    $('.am-modal-quiz .am-modal-body').append(html)

    setTimeout(function(){
        $('.am-finish-quiz').removeClass('am-hide');
    }, 500);

    $(".mask-phone").mask("+7 (999) 999-99-99");

    $('.am-send-form').on('click', function () {
        // валидация формы
        var countLabel = $(this).parents('form').find('label').length;
        var pathLabel = $(this).parents('form').find('label');
        var validation = false;
        var completion = 0;

        $(pathLabel).each(function () {
            var pathInput = $(this).find('input, textarea, select');
            var errorText = $(this).find('input, textarea, select').attr('data-error');
            var pattern = /^([a-z0-9_\.-])+[@][a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

            // Проверка полей
            if ( pathInput.hasClass('valid-check') && pathInput.val().length < 1 ) { // проверка на любое слово где > 1 символа
                $(this).find('input, textarea, select').addClass('error-valid');
                alert(errorText)
            } else if ( pathInput.hasClass('phone') && pathInput.val().length < 18 ) { // проверка тел формата +7 (999) 999-99-99
                $(this).find('input').addClass('error-valid');
                alert(errorText)
            } else if ( pathInput.hasClass('email') && !(pattern.test(pathInput.val())) ) { // проверка email типа name@mail.ru
                $(this).find('input').addClass('error-valid');
                alert(errorText)
            } else if ( pathInput.hasClass('valid-approval') && !$('.valid-approval').is(':checked') ) { // проверка email типа name@mail.ru
                $(this).find('.link-approval').addClass('error-valid');
                alert(errorText)
            } else {
                validation = true;
                completion++;
                $(this).find('input, textarea, select').removeClass('error-valid')
            }
        });
        // Валидация пройдена и готова отправка формы
        if ( completion === countLabel && validation === true ) {

            let username = $(this).parents('form').find('[name="name"]').val()
            let phone = $(this).parents('form').find('[name="phone"]').val()


            let results = {
                username,
                phone,
                quiz: quizAnswers
            }

            $.ajax({
                url: '/quiz-amos/send.php',
                method: 'post',
                dataType: 'json',
                data: results,
            }).done(function() {
                window.location.href = "/pages/successfully/";
            }).fail(function(error) {
                console.log('error', error)
            });
        }
    })

    return html;
}



// Слайдер
function initSlider() {
    var slider = $('.am-slider-quiz');
    var slide = slider.find('.am-question-slide');
    var slideCount = slide.length;

    slider.find('>:first-child').addClass('am-active');


    slider.wrapInner('<div class="slider-inner" />');

    var container = $('.slider-inner');
    container.css('width', 100 * slideCount + '%');
    slide.css('width', 100 / slideCount +'%');

    var next = $('.am-btn-next');
    var prev = $('.am-btn-prev');
    var i = 0;

    function mover(){
        if(i === 0){
            container.css('left',0);
        } else if(i > 0){
            container.css('left','-'+100*i+'%');
        }
    }

    next.on('click',function(){
        if( i < slideCount -1){
            i++;
            mover();
            $('.am-question-slide.am-active').next('.am-question-slide').addClass('am-active');
            $('.am-question-slide.am-active').prev('.am-question-slide.am-active').removeClass('am-active');
        } else {
            finishQuiz()
            quizAnswers = sendAnswers()
        }
    });
    prev.on('click',function(){
        if( i > 0){
            i--;
            mover();
            $('.am-question-slide.am-active').prev('.am-question-slide').addClass('am-active');
            $('.am-question-slide.am-active').next('.am-question-slide').removeClass('am-active');
        }
    });

    $('.am-btn-next, .am-btn-prev').on('click', function () {
        var orderSlide = $('.am-question-slide.am-active').attr('am-order');
        $('.am-modal-quiz .am-navbar-bottom .am-order').text(orderSlide)
    })
}




function sendAnswers() {

    var dataAnswer = [];

    $('.am-slider-quiz .am-question-slide').each(function () {
        var question = $(this).find('.am-title-question').text();
        var answer = $(this).find('.am-answer-item.am-select .am-title-answer').text();
        dataAnswer.push({question: question, answer: answer});
    });

    return dataAnswer;
}

// Закрыть модальное окно по ESC
$(document).on('keyup', function(e) {
    if (e.key == "Escape" && $('.am-modal-quiz').length != 0) {
        $('.am-modal-quiz').remove();
    }
});