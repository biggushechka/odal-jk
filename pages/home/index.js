import getMetaTag from '/components/getMetaTag.js'
import siteNotActive from '/components/siteNotActive.js'
import Header from '/components/Header.js'
import MainSlider from './MainSlider.js'
import Advantages from './Advantages.js'
import AboutProject from './AboutProject.js'
import Infrastructure from './Infrastructure.js'
import PersonalTour from './PersonalTour.js'
import Quiz from './Quiz.js'
import Gallery from './Gallery.js'
import adsBanner from './adsBanner.js'
import CapturePointPresent from './CapturePointPresent.js'
import Mortgage from './Mortgage.js'
import floatBtnCallback from './floatBtnCallback.js'
import Footer from '/components/Footer.js'

var generalInfoJK;
const getGeneralInfo = XMLHttpRequestAJAX({
    url: "https://otal-estate.ru/api/site/content/general",
    method: "POST",
    body: {domain: $domain}
});

if (getGeneralInfo.code === 200) {
    generalInfoJK = getGeneralInfo.data;
    console.log(generalInfoJK.title, generalInfoJK);

    getMetaTag(generalInfoJK);

    if (generalInfoJK.activity == "on") {
        initSite();
    } else if (generalInfoJK.activity == "off") {
        siteNotActive();
    }

} else {
    $('body').html("Такого сайта не существует");
}

function initSite() {
    Header(generalInfoJK);
    MainSlider(generalInfoJK);
    // Advantages();
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