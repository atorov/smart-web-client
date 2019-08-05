import smart from './client'

console.log('::: Starting the demo...')
console.log('::: window.SMART_WEB_CLIENT:', window.SMART_WEB_CLIENT)
console.log('::: smart-web-client:', smart)

; (async () => {
    try {
        await smart({
            debug: true,
            delay: 1550,
            onChange(clientState) {
                console.log('√ Changed', Object.keys(clientState).length)
            },
        })
    }
    catch (reason) {
        console.error('::: Reason:', reason)
    }
})()
