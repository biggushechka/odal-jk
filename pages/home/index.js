import Header from '/components/Header.js?v=1.03.22'
import MainSlider from './MainSlider.js?v=1.03.22'
import Advantages from './Advantages.js?v=1.03.22'
import AboutProject from './AboutProject.js?v=1.03.22'
import Infrastructure from './Infrastructure.js?v=1.03.22'
import PersonalTour from './PersonalTour.js?v=1.03.22'
import Quiz from './Quiz.js?v=1.03.22'
import Gallery from './Gallery.js?v=1.03.22'
import adsBanner from './adsBanner.js?v=1.03.22'
import CapturePointPresent from './CapturePointPresent.js?v=1.03.22'
import Mortgage from './Mortgage.js?v=1.03.22'
import floatBtnCallback from './floatBtnCallback.js?v=1.03.22'
import Footer from '/components/Footer.js?v=1.03.22'

const jk = ajaxRequest({url: "/ajax/jk.json"});
console.log('jk', jk);

Header(jk);
MainSlider(jk);
Advantages(jk.advantages);
AboutProject();
Infrastructure();
PersonalTour();
Quiz();
Gallery();
adsBanner();
CapturePointPresent(jk.title);
Mortgage(jk.title);
Footer(jk);
floatBtnCallback();