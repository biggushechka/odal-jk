export default function Infrastructure() {

    let infrastructure = XMLHttpRequestAJAX({
        url: "https://otal-estate.ru/api/site/content/get",
        method: "GET",
        body: {
            content: "infrastructure"
        }
    });

    if (infrastructure.code === 200) {
        infrastructure = infrastructure.data;
    } else {
        return false;
    }

    var html = `
    <section id="resid" class="residents__main" data-section="infrastructure">
        <div class="container">
            <div class="residents__cnt">
                <div class="number-count">
                    <strong>02</strong>
                </div>
                <div class="residents__info">
                    <span>инфраструктура</span>
                    <h2>Специальные условия для будущих жителей</h2>
                    <div class="residents__fl">
                        <p>Уникальный формат жилья, который объединяет в себе преимущества комфортных городских студий и просторных загородных домов.</p>
                        <button type="button" class="button modal-callback" data-target="presentation">Скачать презентацию</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="residents__src container">
            <div class="swiper residents__slider" id="infrastructure-slider">
                <div class="swiper-wrapper">`;
                if (infrastructure.length != 0) {
                    for (var item in infrastructure) {
                        var slide = infrastructure[item];

                        html += `
                        <div class="swiper-slide">
                            <div class="residents__block" style="background-image: url(${encodeURI(slide.photo)})">
                                <span></span>
                                <strong>${slide.title}</strong>
                                <p>${slide.description}</p>
                            </div>
                        </div>`;
                    }
                } else {
                    html += `
                    <div class="swiper-slide">
                        <div class="residents__block" style="background-image: url('/assets/img/photo-nan.jpg')">
                            <span></span>
                            <strong>Error</strong>
                            <p></p>
                        </div>
                    </div>`;
                }

                html += `
                </div>
                <div class="residents__arrow">
                    <div class="residents-button-prev swiper-button-prev" id="infstr-btn-prev"></div>
                    <div class="residents-button-next swiper-button-next" id="infstr-btn-next"></div>
                    <div class="swiper-pagination" id="infstr-swiper-pagination"></div>
                </div>
            </div>
        </div>
    </section>`;
    html = $(html);
    $('#app').append(html);


    new Swiper("#infrastructure-slider", {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
            '1500': {
                slidesPerView: 3,
                slidesPerGroup: 1,
            },
            '991': {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 15,
            },
            '768': {
                slidesPerView: 4,
                slidesPerGroup: 1,
            },
            '570': {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
            '480': {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
            '320': {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 10,
            },
        },
        navigation: {
            nextEl: "#infstr-btn-next",
            prevEl: "#infstr-btn-prev",
        },
        pagination: {
            el: "#infstr-swiper-pagination",
        },
    });

    html.find('.modal-callback').on('click', function () {
        var target = $(this).data('target');
        ModalCallBack(target);
    });
}