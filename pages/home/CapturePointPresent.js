export default function CapturePointPresent(jk_title) {
    var html = `
    <section class="presentation__main">
        <div class="container">
            <div class="presentation__cnt">
                <div class="presentation__info">
                    <h2>Получи презентацию “${jk_title}” в 1 клик</h2>
                    <p>Заполните форму и мы отправим вам подробный каталог по объекту</p>
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
                            <button type="button" class="btn js-send-order" data-target="presentation">Скачать презентацию</button>
                        </div>
                        <label class="checkform">Соглашаюсь с <a href="#">условиями передачи данных</a>
                            <input type="checkbox" checked="checked">
                            <span class="checkmark"></span>
                        </label>
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