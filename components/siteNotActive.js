export default function siteNotActive() {
    var html = `
    <div class="site-not-active">
        <h3>Сайт не работает :(</h3>
    </div>`;
    html = $(html);
    $("body").html(html);
}