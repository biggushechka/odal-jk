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