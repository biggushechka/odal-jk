import Header from '/components/Header.js?v='
import success from './success.js?v='
import Footer from '/components/Footer.js?v='

const jk = ajaxRequest({url: "/ajax/"+domain+"/jk.json"});

Header(jk);
success();
Footer(jk);