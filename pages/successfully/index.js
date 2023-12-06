import Header from '/components/Header.js'
import success from './success.js'
import Footer from '/components/Footer.js'

const jk = ajaxRequest({url: "/ajax/"+domain+"/jk.json"});

Header(jk);
success();
Footer(jk);