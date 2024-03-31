export default function CapturePointPresent(jk_title) {
    var html = `
    <section class="presentation__main">
        <div class="container">
            <div class="presentation__cnt">
                <div class="presentation__info">
                    <h2>Получи презентацию<br>«${jk_title}» <br> в 1 клик</h2>
                    <p>Заполните форму и мы отправим вам подробный каталог по объекту</p>
                    <form>
                        <div class="present__detailed">
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
                            <button type="button" class="btn js-send-order" data-target="presentation">Скачать презентацию</button>
                        </div>
                        <div class="personal-data">Нажимая на кнопку “Связаться с нами”, вы соглашаетесь <a href="/privacy-policy" target="_blank">с условиями обработки личных данных</a></div>
                    </form>
                </div>
                <div class="presentation__photo">
                    <img src="/assets/img/book1.png" alt="image">
                </div>
            </div>
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