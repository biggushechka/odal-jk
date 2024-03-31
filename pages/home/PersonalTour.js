export default function PersonalTour() {
    var html = `
    <section class="private-village" style="background-image: url(/assets/img/personalTour.webp)">
        <div class="private-village__cnt">
            <h2>Запишитесь на персональную экскурсию</h2>
            <p>Проведём видеопрезентацию комплекса в режиме реального времени. Покажем планировки, панорамные виды</p>
            <form>
                <div class="private-village__form">
                    <div class="form-input">
                        <i class="icon user"></i>
                        <label>
                            <input type="text" name="name" placeholder="Имя" class="">
                        </label>
                    </div>
                    <div class="form-input">
                        <i class="icon phone"></i>
                        <label>
                            <input type="text" name="phone" placeholder="Телефон" class="phone valid-phone">
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