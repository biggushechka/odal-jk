export default function ModalThrough(jk) {

    console.log("ModalThrough", jk)

    // const sliderGallery = ajaxRequest({url: "/ajax/"+domain+"/MainSlider.json"});

    var html = `
    <button type="button" class="btn btn-close-modal"><i class="icon close"></i></button>
    <div class="wrapper-container">
        <div class="form-wrapper">
            <h3 class="title-modal">Узнайте цену квартир прямо сейчас!</h3>
            <p class="desc-modal">Оставьте заявку и получите каталог со свободными квартирами, актуальными ценами и инвестиционными вариантами</p>
            <div class="social-network">`;
                if (jk.contacts.whatsapp_phone != undefined && jk.contacts.whatsapp_phone != '') {
                    var phoneWhatsApp = jk.contacts.whatsapp_phone.replace(/[\s()+-]/g, "");
                    html += `<a href=" https://wa.me/${phoneWhatsApp}" target="_blank" class="header__soc"><i class="whatsapp-icon"></i>WhatsApp</a>`;
                }

                var openTelegram;
                if (jk.contacts.telegram_link !== undefined && jk.contacts.telegram_link !== "") {
                    openTelegram = jk.contacts.telegram_link;
                } else if (jk.contacts.telegram_phone !== undefined && jk.contacts.telegram_phone !== "") {
                    openTelegram = "https://t.me/" + jk.contacts.telegram_phone.replace(/[^0-9+]/g, "");
                }

                if (openTelegram !== undefined && openTelegram !== "") {
                    html += `<a href="${openTelegram}" target="_blank" class="header__soc"><i class="telegram-icon"></i>Телеграм</a>`;
                }
                html += `
            </div>
            <form>
                <div class="present__detailed2">
                    <div class="form-input">
                        <i class="icon phone"></i>
                        <label>
                            <input type="text" name="phone" placeholder="Телефон" class="phone valid-phone">
                        </label>
                    </div>
                    <button type="button" class="btn js-send-order" data-target="callback">Жду звонка</button>
                </div>
            </form>
        </div>
        <div class="photo-wrapper">
            <img src="/assets/img/callback-bg.webp" alt="photo" class="photo">
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