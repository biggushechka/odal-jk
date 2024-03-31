export default function Footer(jk) {
    var html = `
    <footer class="G-footer" data-section="contacts">
        <div class="container">
            <div class="footer__main">
                <div class="footer__info">
                    <div class="footer__cnt">
                        <div class="footer__menu">
                            <strong>Навигация</strong>
                            <ul>
                                <li><a href="#">О проекте</a></li>
                                <li><a href="#">Ипотека</a></li>
                                <li><a href="#">Рассрочка</a></li>
                                <li><a href="#">Акции</a></li>
                                <li><a href="#">Контакты</a></li>
                            </ul>
                        </div>
                        <div class="footer__menu">
                            <strong>Контакты</strong>
                            <div class="footer__call">
                                <a href="#" class="tel:${jk.contacts.phone}">${jk.contacts.phone}</a>
                                <p>пн-пт с 09 до 21</p>
                            </div>
                            <div class="footer__mail">
                                <span>Электронная почта:</span>
                                <a href="mailto:${jk.contacts.email}" class="">${jk.contacts.email}</a>
                            </div>
                            <div class="footer__adres">
                                <span>Адрес:</span>
                                <p>${jk.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <div class="footer__form">
                    <h4>Приглашаем в <br> демо-квартиру</h4>
                    <p>Укажите ваш адрес и номер телефона <br> для заказа бесплатного такси.</p>
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
                            <button type="button" class="btn js-send-order" data-target="viewing">отправить заявку</button>
                        </div>                        
                        <p class="checkform">Нажимая на кнопку “Связаться с нами”, вы соглашаетесь <a href="/privacy-policy" target="_blank">с условиями обработки личных данных</a></p>
                    </form>
                </div>
            </div>
<!--            <div class="footer__down">-->
<!--                <p>© Название компании, 2034</p>-->
<!--                <p>Согласие на обработку данных</p>-->
<!--                <a href="#">Политика конфиденциальности</a>-->
<!--            </div>-->
        </div>
    </footer>`;
    html = $(html);
    $('#app').after(html);

    html.find('.js-send-order').on('click', function () {
        var targetClick = $(this);
        setTimeout(function () {
            targetClick.blur();
        }, 10);
        submitForm(targetClick);
    });
}