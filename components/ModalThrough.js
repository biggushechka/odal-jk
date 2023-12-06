export default function ModalThrough() {

    const jk = ajaxRequest({url: "/ajax/jk.json"});
    const sliderGallery = ajaxRequest({url: "/ajax/MainSlider.json"});

    var html = `
    <button type="button" class="btn btn-close-modal"><i class="icon close"></i></button>
    <div class="wrapper-container">
        <div class="form-wrapper">
            <h3 class="title-modal">Узнайте цену квартир прямо сейчас!</h3>
            <p class="desc-modal">Оставьте заявку и получите каталог со свободными квартирами, актуальными ценами и инвестиционными вариантами</p>
            <div class="social-network">`;
                if (jk.socialNetwork.whatsapp != undefined && jk.socialNetwork.whatsapp != '') {
                    var phoneWhatsApp = jk.socialNetwork.whatsapp.replace(/[\s()+-]/g, "");

                    html += `<a href=" https://wa.me/${phoneWhatsApp}" target="_blank" class="header__soc"><i class="whatsapp-icon"></i>WhatsApp</a>`;
                }
                if (jk.socialNetwork.telegram != undefined && jk.socialNetwork.telegram != '') {
                    var phoneTelegram = jk.socialNetwork.telegram.replace(/[\s()]/g, "");

                    html += `<a href="https://t.me/${phoneTelegram}" target="_blank" class="header__soc"><i class="telegram-icon"></i>Telegram</a>`;
                }
                html += `
            </div>
            <form>
                <div class="present__detailed2">
                    <div class="form-input">
                        <i class="icon-call"></i>
                        <label>
                            <input type="text" placeholder="Телефон" class="phone valid-phone">
                        </label>
                    </div>
                    <button type="button" class="btn js-send-order" data-target="callback">Жду звонка</button>
                </div>
            </form>
        </div>
        <div class="photo-wrapper">
            <img src="${sliderGallery[0].path}" alt="photo" class="photo">
        </div>
    </div>`;

    var modal = new Modal({
        classModal: 'modal-through', // класс для модального окна
        mode: 'center', // center | top | right
        title: "",
        desc: 'Наш менеджер свяжется с вами в ближайшее время',
        content: html, // HTML-контент
        width: '820px', // задаем ширину окна "560" / " " (авто)
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