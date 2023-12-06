export default function floatBtnCallback() {
    var html = `
    <div class="P-float-btn-callback">
        <div class="wrapper-container">
            <i class="icon phone"></i>
        </div>
    </div>`;
    html = $(html);
    $('#app').append(html);

    html.on('click', function () {
        ModalThrough();
    });
}