export default function success() {
    var html = `
    <section class="page-thank">
        <div class="container">
            <div class="page-thank__tit">
                <h2>Всё прошло успешно!</h2>
                <p>В ближайшее время мы вам перезвоним на указанный номер телефона.</p>
                <img src="/assets/img/phone1.png" alt="icon">
                <a href="/" class="btn">На главную страницу</a>
            </div>
        </div>
    </section>`;
    html = $(html);
    $('#app').append(html);
}