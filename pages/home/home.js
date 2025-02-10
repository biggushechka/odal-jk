import siteNotActive from '/components/siteNotActive.js'
import Header from '/components/Header.js'
import MainSlider from './MainSlider.js'
import Advantages from './Advantages.js'
import AboutProject from './AboutProject.js'
import Infrastructure from './Infrastructure.js'
import PersonalTour from './PersonalTour.js'
import Gallery from './Gallery.js'
import commercialBanner from './commercialBanner.js'
import CapturePointPresent from './CapturePointPresent.js'
import Mortgage from './Mortgage.js'
import floatBtnCallback from './floatBtnCallback.js'
import Footer from '/components/Footer.js'
import Quiz from "./Quiz.js";

export default function HomePage() {
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

        if (generalInfoJK.activity == "on") {
            getMeta();
            initSite();
        } else {
            siteNotActive();
        }
    }

    function initSite() {
        Header(generalInfoJK);                      // Шапка / Навигация
        MainSlider(generalInfoJK);                  // Главный слайдер
        Advantages();                               // преимущества
        AboutProject();                             // о проекте
        PersonalTour();                             // запись на персональную экскурсию
        Infrastructure();                           // инфраструктура
        // Quiz();                                     // квиз
        commercialBanner();                         // рекламный баннер
        Gallery();                                  // галерея
        CapturePointPresent(generalInfoJK.title);   // Получи презентацию
        Mortgage();                                 // Варианты покупки через ипотеку
        Footer(generalInfoJK);                      // footer
        floatBtnCallback(generalInfoJK);
    }
}