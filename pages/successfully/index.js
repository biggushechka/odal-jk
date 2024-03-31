import Header from '/components/Header.js'
import success from './success.js?'
import Footer from '/components/Footer.js'
import siteNotActive from "../../components/siteNotActive";

var generalInfoJK;
const getGeneralInfo = XMLHttpRequestAJAX({
    url: "https://otal-estate.ru/api/site/content/get",
    method: "GET",
    body: {
        content: "global"
    }
});

if (getGeneralInfo.code === 200) {
    generalInfoJK = getGeneralInfo.data;
    console.log(generalInfoJK.title, generalInfoJK);

    if (generalInfoJK.activity == "on") {
        initPage();
    } else {
        siteNotActive();
    }
}

function initPage() {
    Header(generalInfoJK);
    success();
    Footer(generalInfoJK);
}