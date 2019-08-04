// Parsing parameters
export default function getURLParameter(sParam) {
    const sPageURL = window.location.search.substring(1)
    const sURLVariables = sPageURL.split('&')
    for (let i = 0; i < sURLVariables.length; i++) {
        const sParameterName = sURLVariables[i].split('=')
        if (sParameterName[0] === sParam) {
            const res = sParameterName[1].replace(/\+/g, '%20')
            return decodeURIComponent(res)
        }
    }

    return ''
}
