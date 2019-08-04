import smart from './client'

console.log('::: Starting the demo...')
console.log('::: window.SMART_WEB_CLIENT:', window.SMART_WEB_CLIENT)
console.log('::: smart-web-client:', smart)

smart({
    debug: true,
    delay: 1550,
})
