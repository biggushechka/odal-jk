import siteNotActive from '/components/siteNotActive.js?v='
import Header from '/components/Header.js?v='
import MainSlider from './MainSlider.js?v='
import Advantages from './Advantages.js?v='
import AboutProject from './AboutProject.js?v='
import Infrastructure from './Infrastructure.js?v='
import PersonalTour from './PersonalTour.js?v='
import Quiz from './Quiz.js?v='
import Gallery from './Gallery.js?v='
import adsBanner from './adsBanner.js?v='
import CapturePointPresent from './CapturePointPresent.js?v='
import Mortgage from './Mortgage.js?v='
import floatBtnCallback from './floatBtnCallback.js?v='
import Footer from '/components/Footer.js?v='

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
        initSite();
    } else {
        siteNotActive();
    }
}

function initSite() {
    Header(generalInfoJK);
    MainSlider(generalInfoJK);
    Advantages();
    // AboutProject();
    // Infrastructure();
    // PersonalTour();
    // Quiz();
    // Gallery();
    // adsBanner();
    // CapturePointPresent();
    // Mortgage();
    // Footer();
    // floatBtnCallback();
}