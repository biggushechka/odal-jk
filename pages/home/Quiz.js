export default function Quiz() {
    var html = `
    <section class="personal__main">
        <div class="container">
            <div class="append-quiz-amos"></div>
        </div>
    </section>`;
    html = $(html);
    $('#app').append(html);

    initQuiz({
        place: ".append-quiz-amos"
    });
}