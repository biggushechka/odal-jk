function ajaxRequest(data) {
    var json;
    $.ajax({
        url: data.url,
        method: (data.method == undefined && data.method == '') ? 'GET' : data.method,
        async: false,
        data: (data.data != undefined && data.data != '') ? data.data : '',
    }).done(function(data) {
        if (isJsonString(data)) {
            data = $.parseJSON(data);
        }
        json = data;
    }).fail(function(error) {
        console.log('%c Error JSON ', 'background: red; color: #fff; border-radius: 50px;');
    });

    return json;
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function checkImageExists(imageUrl) {
    var http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    http.send();
    return http.status != 404;
}

function ModalCallBack(target) {
    import("/components/ModalCallback.js?v="+version).then(function(obj) {
        obj.default(target);
    }).catch(function(err) {
        console.log('catch', err);
    });
}

function ModalThrough() {
    import("/components/ModalThrough.js?v="+version).then(function(obj) {
        obj.default();
    }).catch(function(err) {
        console.log('catch', err);
    });
}