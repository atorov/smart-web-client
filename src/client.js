function printInitInfo() {
    console.log('\n::: ::: :::')
    console.log('::: process.env.NODE_ENV:', process.env.NODE_ENV)
    console.log('::: MODE:', MODE)
    console.log('::: ::: :::\n')
}

function myFunc() {
    const res = 40 + 2
    return `This is the result of my function: ${res}`
}

export default () => {
    printInitInfo()

    ; (async () => {
        console.log('HERE!!!')
        const p = await null
        return p
    })()
    const res = myFunc()

    return {
        description: `This is my default module export: ${res}`,
    }
}
