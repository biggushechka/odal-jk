function XMLHttpRequestAJAX(data) {
    var sendData = {
        url: (data.url != undefined && data.url != "") ? data.url : "",
        method: (data.method != undefined && data.method != "") ? data.method : "GET",
        body: (data.body != undefined && data.body != "") ? data.body : ""
    }

    var xhr = new XMLHttpRequest();

    if (sendData.method === "GET" && window.location.hostname === "odal-jk") {
        sendData.body['domain'] = "ayu-dag.ru";
    }

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
    path = (path) ? path : "/nan";
    data = (data) ? data : "";

    console.log("path", path);
    console.log("data", data);

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

function ModalThrough(data) {
    import("/components/ModalThrough.js?v="+version).then(function(obj) {
        obj.default(data);
    }).catch(function(err) {
        console.log('catch', err);
    });
}

function mergeJson(json1, json2) {
    for(var i in json1){
        if(getType(json1[i]) == 'object'){
            for(var k in json1[i]){
                if(getType(json1[i][k]) == 'object'){
                    for(var p in json1[i][k]){
                        if(json2[i]!=undefined && json2[i][k]!=undefined && json2[i][k][p] != undefined) json1[i][k][p] = json2[i][k][p];
                    }
                }else{
                    if(json2[i] != undefined && json2[i][k] != undefined) json1[i][k] = json2[i][k];
                }
            }
        }else{
            if(json2[i] != undefined) json1[i] = json2[i];
        }
    }
    return json1;
}

function getType(p) {
    if (Array.isArray(p)) return 'array';
    else if (typeof p == 'string') return 'string';
    else if (p != null && typeof p == 'object') return 'object';
    else return 'other';
}

// создание <link> тега
function createCSSLink(path) {
    let nameFile = path.match(/\/([^\/]+)\.css$/)[1];

    let cssNavigation = document.createElement('link');
    cssNavigation.setAttribute("rel", "stylesheet");
    cssNavigation.setAttribute("href", path+"?v="+version);
    cssNavigation.id = "css_"+nameFile;

    if (!document.getElementById(cssNavigation.id)) document.head.append(cssNavigation);
}