export default function ModalCallback(target) {

    var titleModal;

    if (target == undefined) {
        target = 'callback';
    } else if (target == 'callback') {
        titleModal = 'Получить консультацию';
    } else if (target == 'presentation') {
        titleModal = 'Скачать презентацию';
    } else if (target == 'viewing') {
        titleModal = 'Записаться на просмотр';
    } else if (target == 'mortgage') {
        titleModal = 'Расчитать ипотеку';
    } else {
        titleModal = 'NaN';
    }

    console.log('target', target)

    var html = `
    <form>
        <div class="present__detailed">
            <div class="form-input">
                <i class="icon-call"></i>
                <label>
                    <input type="text" placeholder="Телефон" class="phone valid-phone">
                </label>
            </div>
            <div class="form-input">
                <i class="icon-mail"></i>
                <label>
                    <input type="text" placeholder="Почта" class="">
                </label>
            </div>
            <button type="button" class="btn js-send-order" data-target="${target}">отправить заявку</button>
        </div>
        <p class="personal-data">Нажимая на кнопку “Связаться с нами”, вы соглашаетесь <a href="/privacy-policy" target="_blank">с условиями обработки личных данных</a></p>
    </form>`;

    var modal = new Modal({
        classModal: 'modal-callback', // класс для модального окна
        mode: 'center', // center | top | right
        title: titleModal,
        desc: 'Наш менеджер свяжется с вами в ближайшее время',
        content: html, // HTML-контент
        width: '580px', // задаем ширину окна "560" / " " (авто)
        esc: true, // закрыть по клавише ESC
        closeBackground: true, // закрыть по фону
        eventCloseModal:'',
        footerEvents:{
            cancel: {
                active: false,
            },
            submit: {
                active: false,
            }
        }
    });

    modal.modal.find(".phone").mask('+7 (999)-999-99-99');

    modal.modal.find('.js-send-order').click(function () {
        var targetClick = $(this);
        setTimeout(function () {
            targetClick.blur();
        }, 10);
        submitForm(targetClick);
    });
}