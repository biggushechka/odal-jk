export default function AboutProject() {

    let aboutJK = XMLHttpRequestAJAX({
        url: "https://otal-estate.ru/api/site/content/get",
        method: "GET",
        body: {
            content: "about"
        }
    });

    console.log("О проекте", aboutJK)

    if (aboutJK.code === 200) {
        aboutJK = aboutJK.data;
    } else {
        return false;
    }

    var aboutTitle = (aboutJK.about.title != undefined && aboutJK.about.title != '') ? aboutJK.about.title : `<span style="color: red;">????????</span>`,
        aboutDesc = (aboutJK.about.desc != undefined && aboutJK.about.desc != '') ? aboutJK.about.desc : `<span style="color: red;">????????</span>`,
        secondaryTitle = (aboutJK.territory.title != undefined && aboutJK.territory.title != '') ? aboutJK.territory.title : `<span style="color: red;">????????</span>`,
        secondaryDesc = (aboutJK.territory.desc != undefined && aboutJK.territory.desc != '') ? aboutJK.territory.desc : `<span style="color: red;">????????</span>`,
        photo = (checkImageExists(aboutJK.photo) != false && aboutJK.photo != '') ? aboutJK.photo : '/assets/img/photo-nan.jpg';

    var html = `
    <section class="business__main" data-section="aboutjk">
        <div class="container">
            <div class="business__des">
                <div class="number-count">
                    <strong>01</strong>
                </div>
                <div class="business__descript">
                    <span>описание</span>
                    <h2>${aboutTitle}</h2>
                    <p>${aboutDesc}</p>
                    <button type="button" class="button modal-callback" data-target="presentation">скачать презентацию</button>
                </div>
            </div>
            <div class="territory__har">
                <div class="territory__photo" style="background-image: url(${photo})"></div>
                <div class="territory__info">
                    <h3>${secondaryTitle}</h3>
                    <p>${secondaryDesc}</p>
                    <button type="button" class="btn modal-callback" data-target="viewing">записаться на просмотр</button>
                </div>
            </div>`;


            html += `
        </div>
    </section>`;
    html = $(html);
    $('#app').append(html);

    html.find('.modal-callback').on('click', function () {
        var target = $(this).data('target');
        ModalCallBack(target);
    });
}