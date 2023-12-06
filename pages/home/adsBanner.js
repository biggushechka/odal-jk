export default function adsBanner() {

    const adsBanner = ajaxRequest({url: "/ajax/"+domain+"/adsBanner.json"});

    var title = (adsBanner.title != undefined && adsBanner.title != '') ? adsBanner.title : `<span style="color: red;">????????</span>`,
        desc = (adsBanner.desc != undefined && adsBanner.desc != '') ? adsBanner.desc : `<span style="color: red;">????????</span>`,
        hint = (adsBanner.hint != undefined && adsBanner.hint != '') ? adsBanner.hint : `<span style="color: red;">????????</span>`,
        photo = (checkImageExists(adsBanner.photo) != false && adsBanner.photo != '') ? adsBanner.photo : '/assets/img/photo-nan.jpg';
    
    var html = `
    <section class="become__resort">
        <div class="container">
            <div class="become__flex">
                <div class="become__block">
                    <h2>${title}</h2>
                    <p>${desc}</p>
                    <button type="button" class="btn-black modal-callback" data-target="callback">оставить заявку</button>
                    <small>${hint}</small>
                </div>
                <div class="become__photo">
                    <img src="${photo}" alt="image">
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