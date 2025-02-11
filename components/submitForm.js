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
        // ------- test -------
        // const botToken = "6992664105:AAGlVd1qXIqcUpZEXCcfF1qFI-Z3i32vWz0";
        // const chatId = "-1002160719822";

        // ------- deploy -------
        const botToken = "6394127824:AAEiTmzJQjuTwtU4oeEROoZeeiVn_Nj8TYQ";
        const chatId = "-956597558";

        var arrayForm = {};
        arrayForm.type = thisClick;

        // сбор данных из формы
        form.find('label').each(function () {
            var input = $(this).find('input'),
                label = input.attr('name'),
                value = input.val();

            arrayForm[label] = value;
        });

        console.log('arrayForm', arrayForm)

        const dataFeedback = {
            heading: "🔔 Заявка на консультацию:",
            name: arrayForm.name,
            phone: arrayForm.phone
        };

        const message = `${dataFeedback.heading}\n\n👤 <b>Имя:</b> ${dataFeedback.name} \n📞 <b>Тел:</b> ${dataFeedback.phone}`;

        const response = XMLHttpRequestAJAX({
            url: `https://api.telegram.org/bot${botToken}/sendMessage`,
            method: "POST",
            body: {
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            }
        });
        console.log('response', response.data)

        if (response.data) {
            if (response.data.ok) {
                // ym(89180965, 'reachGoal', 'order_done');
                window.location.href = "/successfully";
            } else {
                alert(`Ошибка при отправке`)
            }
        }

    }
}

// При клике на элементы формы, убираем выделения об ошибке
$(document).on('focus', 'input, textarea, select', function () {
    $(this).removeClass('error-valid');
    $(this).closest('label').find('.error-notification').slideUp(200);
});