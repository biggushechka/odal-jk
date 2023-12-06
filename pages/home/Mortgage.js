export default function Mortgage(jk_title) {

    const banks = ajaxRequest({url: "/ajax/"+domain+"/Mortgage.json"});

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
                        <p>Получите расчёт ипотеки на максимально выгодных условиях в ЖК “${jk_title}”</p>
                        <button type="button" class="btn modal-callback" data-target="mortgage">Рассчитать ипотеку</button>
                        <strong>%</strong>
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
                            for (var i in banks) {
                                var bank = banks[i],
                                    title = (bank.title != undefined && bank.title != '') ? bank.title : `<span style="color: red;">????????</span>`,
                                    rate = (bank.rate != undefined && bank.rate != '') ? bank.rate : `<span style="color: red;">???</span>`,
                                    initialPayment = (bank.initialPayment != undefined && bank.initialPayment != '') ? bank.initialPayment : `<span style="color: red;">???</span>`,
                                    logo = (checkImageExists(bank.logo) != false && bank.logo != '') ? bank.logo : '/assets/img/photo-nan.jpg';

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