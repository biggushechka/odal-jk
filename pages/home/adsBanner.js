export default function adsBanner() {

    var html = `
    <section class="become__resort">
        <div class="container">
            <div class="become__flex">
                <div class="become__block">
                    <h2>Станьте владельцем апартаментов на лучшем курорте россии</h2>
                    <p>Заработайте от 48%  годовых на перепродаже апартамента или получайте гарантрованный доход от сдачи в аренду</p>
                    <button type="button" class="btn-black modal-callback" data-target="callback">оставить заявку</button>
                    <small>Нажимая на кнопку “Оставить заявку”, я принимаю условия Политика обработки и защиты персональных данных,  даю согласие на обработку персоональных данных</small>
                </div>
                <div class="become__photo">
                    <img src="/assets/img/key.webp" alt="image">
                </div>
            </div>
        </div>
    </section>`;
    html = $(html);
    $('#app').append(html);

    html.find('.modal-callback').on('click', function () {
        var target = $(this).data('target');
        ModalCallBack(target);
    });
}