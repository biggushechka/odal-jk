export default function Mortgage(jk_title) {

    let getBanks = XMLHttpRequestAJAX({
        url: "https://otal-estate.ru/api/site/content/get",
        method: "GET",
        body: {
            content: "banks"
        }
    });
    // console.log('getBanks', getBanks)

    if (getBanks.code === 200) {
        getBanks = getBanks.data;
    } else {
        return false;
    }

    var html = `
    <section id="stock" data-section="mortgage">
        <div class="container">
            <div class="affordable__cnt">
                <div class="affordable__flex">
                    <div class="number-count">
                        <strong>03</strong>
                    </div>
                    <div class="residents__info">
                        <span>Варианты покупки</span>
                        <h2>Доступная ипотека</h2>
                        <p>Получите расчёт ипотеки на максимально выгодных условиях</p>
                        <button type="button" class="btn modal-callback" data-target="mortgage">Рассчитать ипотеку</button>
                    </div>
                </div>
                <div class="affordable__table">
                    <table>
                        <thead>
                            <tr>
                                <th>Банк</th>
                                <th>Ставка</th>
                                <th>Первый взнос</th>
                            </tr>
                        </thead>
                        <tbody>`;
                            for (var i in getBanks) {
                                var bank = getBanks[i],
                                    title = (bank.title) ? bank.title : `<span style="color: red;">????????</span>`,
                                    rate = (bank.rate) ? bank.rate : `<span style="color: red;">???</span>`,
                                    initialPayment = (bank.initial_payment) ? bank.initial_payment : `<span style="color: red;">???</span>`,
                                    logo = bank.logo || '/assets/img/photo-nan.jpg';

                                html += `
                                <tr>
                                    <td>
                                        <div class="affordable__sber">
                                            <img src="${logo}" alt="icon">
                                            <span>${title}</span>
                                        </div>
                                    </td>
                                    <td><span>от ${rate}%</span></td>
                                    <td><span>от ${initialPayment}%</span></td>
                                </tr>`;
                            }
                            html += `
                        </tbody>
                    </table>
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