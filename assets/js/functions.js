function XMLHttpRequestAJAX(data) {
    var sendData = {
        url: (data.url != undefined && data.url != "") ? data.url : "",
        method: (data.method != undefined && data.method != "") ? data.method : "GET",
        body: (data.body != undefined && data.body != "") ? data.body : ""
    }

    var xhr = new XMLHttpRequest();

    if (sendData.method === "GET" || sendData.method === "DELETE" || sendData.method === "UPDATE") {
        xhr.open(sendData.method, sendData.url + "?" + new URLSearchParams(sendData.body).toString(), false);
    }

    if (sendData.method === "POST") {
        sendData.body = JSON.stringify(sendData.body);
        xhr.open("POST", sendData.url, false);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.setRequestHeader('Content-Type', 'text/plain');
    }

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(sendData.body);

    var getData = {};
    getData.code = xhr.status;

    try {
        getData.data = JSON.parse(xhr.responseText);
    } catch (error) {
        getData.data = xhr.responseText;
    }

    return getData;
}

function checkImageExists(imageUrl) {
    var http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    http.send();
    return http.status != 404;
}

// импорт компонента js
function importComponent(path, data) {
    path = (path != "" && path != undefined) ? path : "/nan";
    data = (data != "" && data != undefined) ? data : "";

    import(`${path}?v=${version}`).then(function (obj) {
        obj.default(data);
    }).catch(function (error) {
        console.error('%c ERROR: import JS ', 'background: red; color: #fff; border-radius: 50px;', error);
    });
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