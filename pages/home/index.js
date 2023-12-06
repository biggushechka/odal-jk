import Header from '/components/Header.js?v=1.0015323234'
import MainSlider from './MainSlider.js?v=1.0015323234'
import Advantages from './Advantages.js?v=1.0015323234'
import AboutProject from './AboutProject.js?v=1.0015323234'
import Infrastructure from './Infrastructure.js?v=1.0015323234'
import PersonalTour from './PersonalTour.js?v=1.0015323234'
import Quiz from './Quiz.js?v=1.0015323234'
import Gallery from './Gallery.js?v=1.0015323234'
import adsBanner from './adsBanner.js?v=1.0015323234'
import CapturePointPresent from './CapturePointPresent.js?v=1.0015323234'
import Mortgage from './Mortgage.js?v=1.0015323234'
import floatBtnCallback from './floatBtnCallback.js?v=1.0015323234'
import Footer from '/components/Footer.js?v=1.0015323234'

const jk = ajaxRequest({url: "/ajax/"+domain+"/jk.json"});
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