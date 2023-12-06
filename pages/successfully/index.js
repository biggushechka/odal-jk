import Header from '/components/Header.js?v=1.03.22'
import success from './success.js?v=1.03.22'
import Footer from '/components/Footer.js?v=1.03.22'

const jk = ajaxRequest({url: "/ajax/jk.json"});

Header(jk);
success();
Footer(jk);