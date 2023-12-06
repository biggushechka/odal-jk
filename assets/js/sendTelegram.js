function sendTelegram(dataForm) {
    var token = '5998811874:AAE1DNkIf1NLgVoVRXuUGPgEQQzkTeJe4fo',
        chat_id = '-1001797841333',
        html = ``;

html =
`
<b>${dataForm.subject}</b>
<i>${dataForm.desc}</i>\n\n`;
    for (var i in dataForm.dataForm) {
        var item = dataForm.dataForm[i];
        html += `${i}: ${item}\n`;
    }
html += ``;

    $.ajax({
        type: 'POST',
        url: `https://api.telegram.org/bot${token}/sendMessage`,
        data: {
            chat_id: chat_id,
            text: html.replace(/^\t+/gm, ''),
            parse_mode: 'html'
        },
        success: function(res) {
            console.log('✅ В Telegram успешно отправлено');
        },
        error: function(error) {
            console.error(error);
        }
    });
}

