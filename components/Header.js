export default function Header(jk) {
    var html = `
    <header class="G-header">
        <div class="header__main">
            <a href="/" class="header__logo">${jk.title}</a>
            <div class="menu-cnt">
                <ul class="nav-list">
                    <li class="item" data-anchor="aboutjk">О проекте</li>
                    <li class="item" data-anchor="infrastructure">Инфраструктура</li>
                    <li class="item" data-anchor="gallery">Галерея</li>
                    <li class="item" data-anchor="mortgage">Ипотека</li>
                    <li class="item" data-anchor="contacts">Контакты</li>
                </ul>
                <div class="header__contact">
                    <div class="social-network">`;
                        if (jk.socialNetwork.whatsapp != undefined && jk.socialNetwork.whatsapp != '') {
                            var phoneWhatsApp = jk.socialNetwork.whatsapp.replace(/[\s()+-]/g, "");

                            html += `<a href=" https://wa.me/${phoneWhatsApp}" target="_blank" class="header__soc"><i class="whatsapp-icon"></i></a>`;
                        }
                        if (jk.socialNetwork.telegram != undefined && jk.socialNetwork.telegram != '') {
                            var phoneTelegram = jk.socialNetwork.telegram.replace(/[\s()]/g, "");

                            html += `<a href="https://t.me/${phoneTelegram}" target="_blank" class="header__soc"><i class="telegram-icon"></i></a>`;
                        }
                        html += `
                    </div>
                    <div>                    
                        <a href="tel:${jk.phone}" class="header__phone">${jk.phone}</a>
                        <button type="button" class="header__request modal-callback" data-target="callback">Заказать звонок</button>
                    </div>
                </div>
            </div>
            <div class="menu-fon">
                <div class="open-menu">
                    <div class="icon burger"></div>
                </div>
            </div>
        </div>
    </header>`;
    html = $(html);
    $('#app').before(html);

    // callback
    html.find('.modal-callback').on('click', function () {
        var target = $(this).data('target');
        ModalCallBack(target);
    });

    // якорь к блоку
    html.find('.nav-list .item').click(function (e) {
        var anchor = $(this).data('anchor');
        var targetOffset = $('[data-section="'+anchor+'"]').offset().top; // Получаем позицию блока относительно верха страницы

        $('html, body').animate({
            scrollTop: targetOffset // Плавно прокручиваем страницу до позиции блока
        }, 1000); // Время анимации (в миллисекундах)
    });

    // пр скролле вниз
    $(window).scroll(function() {
        var scrollPosition = $(this).scrollTop(); // Получаем текущую позицию прокрутки страницы

        if (scrollPosition >= 200) { // Проверяем, достигла ли прокрутка 200 пикселей
            $('.G-header').addClass('fixed');
        } else { // Удаляем класс элемента, если прокрутка меньше 200 пикселей
            $('.G-header').removeClass('fixed');
        }
    });

    html.find('.menu-fon').click(function () {
        if ($('.G-mob-navigation').length == 0 && !$('.G-mob-navigation').hasClass('open')) {
            mobNavigation();
        } else {
            close_mobNavigation();
        }
    });


    function mobNavigation() {
        var nav = $('header').find('.nav-list').html();
        var html = `
        <div class="G-mob-navigation">
            <div class="wrapper-container">
               <ul class="nav-list">${nav}</ul>
                <div class="footer-nav">
                    <a href="tel:${jk.phone}" class="phone">${jk.phone}</a>
                    <div class="social-network">`;
                        if (jk.socialNetwork.whatsapp != undefined && jk.socialNetwork.whatsapp != '') {
                            var phoneWhatsApp = jk.socialNetwork.whatsapp.replace(/[\s()+-]/g, "");

                            html += `<a href=" https://wa.me/${phoneWhatsApp}" target="_blank" class="header__soc"><i class="whatsapp-icon"></i></a>`;
                        }
                        if (jk.socialNetwork.telegram != undefined && jk.socialNetwork.telegram != '') {
                            var phoneTelegram = jk.socialNetwork.telegram.replace(/[\s()]/g, "");

                            html += `<a href="https://t.me/${phoneTelegram}" target="_blank" class="header__soc"><i class="telegram-icon"></i></a>`;
                        }
                        html += `
                    </div>
                </div> 
            </div>
        </div>`;
        html = $(html);

        // якорь к блоку
        html.find('.nav-list .item').click(function (e) {
            var anchor = $(this).data('anchor');
            var targetOffset = $('[data-section="'+anchor+'"]').offset().top; // Получаем позицию блока относительно верха страницы

            close_mobNavigation();
            $('html, body').animate({
                scrollTop: targetOffset-80 // Плавно прокручиваем страницу до позиции блока
            }, 1000); // Время анимации (в миллисекундах)
        });

        // Закрыть модальное окно по фону
        html.click(function (e) {
            if($(e.target).closest('.G-mob-navigation').length && $(e.target).is('.G-mob-navigation')) {
                close_mobNavigation()
            }
        });

        open_mobNavigation(html);
    }

    function open_mobNavigation(nav) {
        if ($('.G-mob-navigation').length == 0) {
            $('body').append(nav);
        }

        if ($('.G-mob-navigation').length != 0 && !$('.G-mob-navigation').hasClass('open')) {
            $('body').addClass('no-scroll');
            setTimeout( () => {nav.addClass('open')}, 50);
            $('header .menu-fon .icon').removeClass('burger').addClass('close');
        }
    }

    function close_mobNavigation() {
        $('header .menu-fon .icon').removeClass('close').addClass('burger');
        $('.G-mob-navigation').removeClass('open').find('.wrapper-container').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
            $('.G-mob-navigation').remove();
            $('body').removeClass('no-scroll');
        });

    }

}