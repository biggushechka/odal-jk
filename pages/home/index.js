import siteNotActive from '/components/siteNotActive.js'
import Header from '/components/Header.js'
import MainSlider from './MainSlider.js'
import Advantages from './Advantages.js'
import AboutProject from './AboutProject.js'
import Infrastructure from './Infrastructure.js'
import PersonalTour from './PersonalTour.js'
// import Quiz from './Quiz.js'
import Gallery from './Gallery.js'
import adsBanner from './adsBanner.js'
import CapturePointPresent from './CapturePointPresent.js'
import Mortgage from './Mortgage.js'
import floatBtnCallback from './floatBtnCallback.js'
import Footer from '/components/Footer.js'

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
        getMeta();
        initSite();
    } else {
        siteNotActive();
    }
}

function initSite() {
    Header(generalInfoJK);
    MainSlider(generalInfoJK);
    Advantages();
    AboutProject();
    PersonalTour();
    Infrastructure();
    // Quiz();
    adsBanner();
    Gallery();
    CapturePointPresent(generalInfoJK.title);
    Mortgage();
    Footer(generalInfoJK);
    floatBtnCallback(generalInfoJK);
}

function getMeta() {
    const getMeta = XMLHttpRequestAJAX({
        url: "https://otal-estate.ru/api/site/content/get",
        method: "GET",
        body: {
            content: "meta"
        }
    });

    if (getMeta.code == 200) {
        var meta = getMeta.data;

        const sendMeta = XMLHttpRequestAJAX({
            url: "/backend/getMeta.php",
            method: "POST",
            body: meta
        });
    }
}