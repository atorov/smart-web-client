function myFunc() {
    const res = 40 + 2
    return `This is the result of my function: ${res}`
}

(async () => {
    'HERE!!!'

    await myFunc()
})()

export default {
    description: 'This is my default module export',
}
