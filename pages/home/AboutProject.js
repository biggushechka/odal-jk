export default function AboutProject() {

    const aboutJK = ajaxRequest({url: "/ajax/AboutJK.json"});

    var indexTitle = (aboutJK.index.title != undefined && aboutJK.index.title != '') ? aboutJK.index.title : `<span style="color: red;">????????</span>`,
        indexDesc = (aboutJK.index.desc != undefined && aboutJK.index.desc != '') ? aboutJK.index.desc : `<span style="color: red;">????????</span>`,
        secondaryTitle = (aboutJK.secondary.title != undefined && aboutJK.secondary.title != '') ? aboutJK.secondary.title : `<span style="color: red;">????????</span>`,
        secondaryDesc = (aboutJK.secondary.desc != undefined && aboutJK.secondary.desc != '') ? aboutJK.secondary.desc : `<span style="color: red;">????????</span>`,
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
                    <h2>${indexTitle}</h2>
                    <p>${indexDesc}</p>
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
            if (aboutJK.accessibility.length != 0) {
                html += `
                <div class="busin-terr__flex">`;
                    for (var i in aboutJK.accessibility) {
                        var item = aboutJK.accessibility[i],
                            count = (item.count != undefined && item.count != '') ? item.count : `<span style="color: red;">??</span>`,
                            title = (item.title != undefined && item.title != '') ? item.title : `<span style="color: red;">????????</span>`,
                            desc = (item.desc != undefined && item.desc != '') ? item.desc : `<span style="color: red;">????????</span>`;

                        html += `
                        <div class="busin-terr__data">
                            <strong>${count}</strong>
                            <small>${title}</small>
                            <span>${desc}</span>
                        </div>`;
                    }
                    html += `    
                </div>`;
            }
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