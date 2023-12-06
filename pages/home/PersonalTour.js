export default function PersonalTour() {

    const PersonalTour = ajaxRequest({url: "/ajax/PersonalTour.json"});
    
    var title = (PersonalTour.title != undefined && PersonalTour.title != '') ? PersonalTour.title : `<span style="color: red;">????????</span>`,
        desc = (PersonalTour.desc != undefined && PersonalTour.desc != '') ? PersonalTour.desc : `<span style="color: red;">????????</span>`,
        photo = (checkImageExists(PersonalTour.photo) != false && PersonalTour.photo != '') ? PersonalTour.photo : '/assets/img/photo-nan.jpg';
    
    var html = `
    <section class="private-village" style="background-image: url(${photo})">
        <div class="private-village__cnt">
            <h2>${title}</h2>
            <p>${desc}</p>
            <form>
                <div class="private-village__form">
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
                    <button type="button" class="btn js-send-order" data-target="viewing">отправить заявку</button>
                </div>
                <p class="personal-data">Нажимая на кнопку “Связаться с нами”, вы соглашаетесь <a href="/privacy-policy" target="_blank">с условиями обработки личных данных</a></p>
            </form>
        </div>
    </section>`;
    html = $(html);
    $('#app').append(html);

    html.find('.js-send-order').on('click', function () {
        var targetClick = $(this);
        setTimeout(function () {
            targetClick.blur();
        }, 10);
        submitForm(targetClick);
    });
}