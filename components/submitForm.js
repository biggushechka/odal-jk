function submitForm(targetClick) {
    targetClick.closest('form').find('.error-notification').remove();
    var thisClick = targetClick.attr('data-target'),
        form = targetClick.closest('form'),
        countLabel = targetClick.closest('form').find('label').length,
        pathLabel = targetClick.closest('form').find('label'),
        validation = false,
        completion = 0;

    $(pathLabel).each(function () {

        var pathInput = $(this).find('input, textarea, select'),
            pattern = /^([a-z0-9_\.-])+[@][a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

        // Проверка полей
        if ( pathInput.hasClass('valid-check') && pathInput.val().length < 1 ) { // проверка на любое слово где > 1 символа
            $(this).find('input, textarea, select').addClass('error-valid')
                .after(`<p class="error-notification">Поле не должно быть пустым</p>`);

            if ($(this).find('input, textarea, select').attr('name') == 'name') {
                // $(this).find('.error-notification').text('Введите свое имя');
            }

            if ($(this).find('input, textarea, select').attr('name') == 'surname') {
                // $(this).find('.error-notification').text('Введите свою фамилию');
            }

            if ($(this).find('input, textarea, select').attr('name') == 'series-cert') {
                // $(this).find('.error-notification').text('Введите серию');
            }

            if ($(this).find('input, textarea, select').attr('name') == 'number-cert') {
                // $(this).find('.error-notification').text('Введите номер');
            }
        } else if ( pathInput.hasClass('valid-phone') && pathInput.val().length < 18 ) { // проверка тел формата +7 (999) 999-99-99
            $(this).find('input, textarea, select').addClass('error-valid');
        } else if ( pathInput.hasClass('valid-email') && !(pattern.test(pathInput.val())) ) { // проверка email типа name@mail.ru
            $(this).find('input, textarea, select').addClass('error-valid');
        } else {
            validation = true;
            completion++;
            $(this).find('input, textarea, select').removeClass('error-valid')
            form.find('.error-notification').remove();
        }
        form.find('.error-notification').slideDown(200);

    });

    // Валидация пройдена и готова отправка формы
    if ( completion === countLabel && validation === true ) {

        var arrayForm = {
            "Сайт": window.location.origin
        };

        // сбор данных из формы
        form.find('label').each(function () {
            var input = $(this).find('input'),
                label = input.attr('placeholder'),
                value = input.val();

            arrayForm[label] = value;

            console.log('arrayForm', arrayForm)
        });

        // Шаблон данных для отправки
        var dataMail = {
            subject: "Тема письма",
            desc: "описание, что именно пришло от польз.",
            dataForm: arrayForm
        };

        console.log('dataMail', dataMail)

        // Требуется консультация
        if (thisClick == 'callback') {
            dataMail.subject = '📩 Получена новая заявка!';
            dataMail.desc = 'Требуется консультация менеджера';
        }
        // Отправить перезентацию ЖК
        if (thisClick == 'presentation') {
            dataMail.subject = '📩 Получена новая заявка!';
            dataMail.desc = 'Отправить перезентацию ЖК';
        }
        // Записаться на просмотр
        if (thisClick == 'viewing') {
            dataMail.subject = '📩 Получена новая заявка!';
            dataMail.desc = 'Запись на просмотр';
        }
        // Ипотка
        if (thisClick == 'mortgage') {
            dataMail.subject = '📩 Получена новая заявка!';
            dataMail.desc = 'Интресует ипотека';
        }

        // отправка заявки в Телеграм
        // sendTelegram(dataMail);

        // отправка заявки на почту
        $.ajax({
            type: 'POST',
            url: '/backend/mail/send.php',
            data: dataMail
        }).done(function() {
            window.location.href = "/pages/successfully/";
        }).fail(function() {
            alert('Заявка не отправлена!');
            console.error('Заявка не отправлена!');
        });

    }
}

// При клике на элементы формы, убираем выделения об ошибке
$(document).on('focus', 'input, textarea, select', function () {
    $(this).removeClass('error-valid');
    $(this).closest('label').find('.error-notification').slideUp(200);
});