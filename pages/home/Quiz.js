export default function Quiz() {
    var html = `
    <section class="personal__main" style="background-color: #162B32 !important;">
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