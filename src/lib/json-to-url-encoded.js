// Convert JavaScript object to x-www-form-urlencoded format
export default function JSONToURLEncoded(element, key, list = []) {
    if (typeof (element) === 'object') {
        Object.keys(element).forEach((idx) => {
            JSONToURLEncoded(element[idx], key ? `${key}[${idx}]` : idx, list)
        })
    }
    else {
        list.push(`${key}=${window.encodeURIComponent(element)}`)
    }
    return list.join('&')
}
