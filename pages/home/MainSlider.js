export default function MainSlider(jk) {

    var sliderGallery = [];
    const getSliderGallery = XMLHttpRequestAJAX({
        url: "https://otal-estate.ru/api/site/content/get",
        method: "GET",
        body: {
            content: "mainSlider"
        }
    });

    if (getSliderGallery.code === 200) {
        sliderGallery = getSliderGallery.data;
    } else {
        return false;
    }

    var html = `
    <section class="apartment__main">
        <div class="apartment__abs">
            <div class="swiper apartment__swiper">
                <div class="swiper-wrapper">`;

                    for (var item in sliderGallery) {
                        var image = sliderGallery[item];

                        html += `
                        <div class="swiper-slide">
                            <img src="${encodeURI(image.image)}" class="image-slider">
                        </div>`;
                    }

                    html += `
                </div>
                <div class="apartment__arrows">
                    <div class="apartment-button swiper-button-prev"></div>
                    <div class="pagination-container">
                        <span class="number-current">01</span> 
                        <span class="countdown-separator"></span> 
                        <span class="count-all">${sliderGallery.length}</span> 
                    </div>
                    <div class="apartment-button swiper-button-next"></div>
                </div>
            </div>
        </div>
        
        <div class="apartment__fon">
            <div class="container">
                <div class="apartment__cnt">
                    
                    <div class="params-container">
                        <div class="item">
                            <p>Класс: </p>
                            <span>${jk.parameters.class}</span>
                        </div>
                        <div class="item">
                            <p>Площадь: </p>
                            <span>от ${jk.parameters.area_apartments_from} до ${jk.parameters.area_apartments_to} м2</span>
                        </div>
                        <div class="item">
                            <p>Отделка: </p>
                            <span>${jk.parameters.finishing}</span>
                        </div>
                        <div class="item">
                            <p>Этажность: </p>
                            <span>от ${jk.parameters.floors_from} до ${jk.parameters.floors_to}</span>
                        </div>
                    </div>
    
                    <div class="apartment__info">
                        <span>${jk.slogan}</span>
                        <h1>
                            <span>Апартаментные комплексы</span>
                            <br>
                            «${jk.title}»
                        </h1>
                        <div class="apartment__btn">
                            <button type="button" class="btn modal-callback" data-target="callback">УЗНАТЬ ВСЕ О ПРОЕКТЕ</button>
                            <button type="button" class="btn-ic modal-callback" data-target="callback">получить консультацию</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        if (jk.video != undefined && jk.video != '') {
            html += `
            <div class="popup-for__main">
                <div class="popup-for__circ">
                    <div class="video-about-jk">
                        <i class="icon play"></i>
                    </div>
                </div>
                <span>видео-обзор</span>
            </div>`;
        }
        html += `
    </section>`;
    html = $(html);
    $('#app').append(html);

    let apartmentSwiper = new Swiper(".apartment__swiper", {
        slidesPerView: 1,
        direction: "vertical",
        loop: false,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction"
        },
    });

    formatCurrentNumberSlide(apartmentSwiper.activeIndex);

    apartmentSwiper.on('slideChange', function (event) {
        formatCurrentNumberSlide(event.activeIndex)
    });

    function formatCurrentNumberSlide(number) {
        var activeSlide = number + 1;

        if (activeSlide < 10) {
            activeSlide = "0" + activeSlide;
        }

        html.find(".pagination-container .number-current").html(activeSlide);
    }

    html.find('.video-about-jk').click(function () {
        var htmlModal = `<iframe width="100%" height="450" src="${jk.video}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

        var modal = new Modal({
            classModal: 'modal-main-video', // класс для модального окна
            mode: 'center', // center | top | right
            title: 'Видео-презентация',
            content: htmlModal, // HTML-контент
            width: '900px', // задаем ширину окна "560" / " " (авто)
            footerEvents:{
                cancel: {
                    active: false,
                },
                submit: {
                    active: false,
                }
            }
        });
    });

    html.find('.modal-callback').on('click', function () {
        var target = $(this).data('target');
        ModalCallBack(target);
    });
}