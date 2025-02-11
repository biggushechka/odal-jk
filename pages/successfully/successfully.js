import Header from "/components/Header.js";
import siteNotActive from "/components/siteNotActive.js";
import success from "./success.js";
import Footer from "/components/Footer.js";

export default function Successfully() {
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

        if (generalInfoJK.activity === "on") {
            initPage();
        } else {
            siteNotActive();
        }
    }

    function initPage() {
        success();
    }
}