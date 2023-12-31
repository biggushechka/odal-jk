export default function Advantages(advantages) {
    var html = `
    <section class="advantages__main">
        <div class="container">
            <div class="business__scr">
                <div class="business__flex">`;
                    for (var adv in advantages) {
                        var item = advantages[adv],
                            photo = (checkImageExists(item.photo) != false && item.photo != '') ? item.photo : '/assets/img/photo-nan.jpg',
                            title = (item.title !== undefined && item.title != '') ? item.title : `<span style="color:red">??????</span>`;

                        html += `
                        <div class="business__box modal-callback" style="background-image: url(${photo})">
                            <strong>${title}</strong>
                            <span>узнать подробнее</span>
                        </div>`;
                    }
                    html += `
                </div>
            </div>
        </div>
    </section>`;
    html = $(html);
    $('#app').append(html);
}