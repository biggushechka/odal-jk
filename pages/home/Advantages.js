export default function Advantages() {
    let getAdvantages = XMLHttpRequestAJAX({
        url: "https://otal-estate.ru/api/site/content/get",
        method: "GET",
        body: {
            content: "advantages"
        }
    });

    if (getAdvantages.code === 200) {
        getAdvantages = getAdvantages.data;
    } else {
        return false;
    }

    var html = `
    <section class="advantages__main">
        <div class="container">
            <div class="business__scr">
                <div class="business__flex">`;
                    for (var adv in getAdvantages) {
                        var item = getAdvantages[adv];
                        console.log(item.title, item.photo)

                        html += `
                        <div class="business__box modal-callback" style="background-image: url(${encodeURI(item.photo)})">
                            <strong>${item.title}</strong>
                            <span>${item.description}</span>
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