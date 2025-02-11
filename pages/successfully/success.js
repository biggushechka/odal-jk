export default function success() {
    var html = `
    <section class="page-thank">
        <div class="wrapper-container">
            <h2 class="heading">Заявка успешно отправлена!</h2>
            <p class="desc">В ближайшее время мы Вам перезвоним на указанный номер телефона.</p>
            <a href="/" class="btn link-home">На главную страницу</a>
        </div>
    </section>`;
    html = $(html);
    $('#app').append(html);
}