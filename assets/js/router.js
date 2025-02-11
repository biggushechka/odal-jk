var pathname = document.location.pathname,
    paths = pathname.split('/'),
    page = "";

getPage();
initCarcass();

function initCarcass() {
    // Header
    // importComponent(`/components/Header.js`);

    // page
    createCSSLink(`/pages/${page}/css/${page}.css`);
    importComponent(`/pages/${page}/${page}.js`);

    // Footer
    // importComponent(`/components/Footer.js`);
}

// ---------- определяем страницу ----------
function getPage() {
    if (pathname === "/") {
        page = "home";
    } else if (paths.length === 2 && paths[1] === "successfully") {
        page = "successfully";
    } else {
        page = "404";
    }
}