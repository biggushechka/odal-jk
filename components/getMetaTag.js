export default function getMetaTag(generalInfoJK) {
    var meta = {
        title: generalInfoJK.title,
        id_site: generalInfoJK.id_site,
        domain: generalInfoJK.domain
    }

    const sendMeta = XMLHttpRequestAJAX({
        url: "/backend/meta_tags.php",
        method: "POST",
        body: meta
    });
}