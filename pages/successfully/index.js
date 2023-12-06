import Header from '/components/Header.js?v=1.03.28'
import success from './success.js?v=1.03.28'
import Footer from '/components/Footer.js?v=1.03.28'

const jk = ajaxRequest({url: "/ajax/"+domain+"/jk.json"});

Header(jk);
success();
Footer(jk);