import smart from './client'

console.log('::: window.SMART_WEB_CLIENT:', window.SMART_WEB_CLIENT)
console.log('::: smart-web-client:', smart)

const appContentElement = document.querySelector('#app-content')

function displayItem(icon, title, value, status = ':OK:') {
    const element = document.createElement('div')
    element.classList = `w3-container w3-${status === ':OK:' ? 'light-green' : 'red'}`
    element.innerHTML = `
        <p>
            <i class="fas fa-${icon}"></i>
            <strong>${title}</strong>
            <code>${value}</code>
        </p>
    `
    appContentElement.appendChild(element)
    window.scrollTo(0, document.body.scrollHeight)
}

function updateUI(clientState) {
    console.log('√ Client state has been changed:', clientState)
    console.log('---------------------')

    if (clientState.stage === ':LAUNCH:') {
        const appSubHeaderElement = document.querySelector('#app-sub-header')
        if (!appSubHeaderElement.innerHTML) {
            appSubHeaderElement.classList = 'w3-container w3-light-grey w3-left-align'
            appSubHeaderElement.innerHTML = `
                <h1 class="w3-large">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Launching the app</span>
                </h1>
            `
        }

        appContentElement.innerHTML = ''

        ; [
            ['fhirBaseURL', 'FHIR Base URL(iss)'],
            ['clientId', 'Client ID'],
            ['launchContextId', 'Launch Context ID'],
            ['scope', 'Scope'],
            ['sessionKey', 'Session Key'],
            ['authURL', 'Authorization URL'],
        ].forEach(([key, title]) => {
            if (clientState[key]) {
                displayItem('check', `${title}:`, clientState.fhirBaseURL)
            }
        })
    }
}

(async () => {
    let client
    try {
        client = await smart({
            debug: true,
            delay: 550,
            onChange(clientState) {
                updateUI(clientState)
            },
        })
    }
    catch (reason) {
        console.error('::: Reason:', reason)
        client = null
        displayItem('exclamation-triangle', '', reason, ':ERROR:')
        return null
    }

    console.log('::: client TODO:', client)
    return null

    // if (client && client.stage === ':AUTH_READY:') {
    //     console.log('::: clientState:', client)

    //     // ---------------------------------------------------------------------
    //     // Construct standard FHIR REST calls to obtain patient resource
    //     // with the SMART on FHIR-specific authorization header
    //     // ---------------------------------------------------------------------
    //     const patientId = client.auth.patient
    //     console.log('::: patientId:', patientId)

    //     // TODO: if (!patientId) return ':ERROR'

    //     const patientRequestURL = `${client.fhirBaseURL}/Patient/${patientId}`
    //     console.log('::: patientRequestURL:', patientRequestURL)

    //     let patientResourceResponse
    //     let patientResource
    //     try {
    //         patientResourceResponse = await fetch(patientRequestURL, { headers: { Authorization: `Bearer ${client.auth.access_token}` } })
    //         patientResource = await patientResourceResponse.json()
    //     }
    //     catch (reason) {
    //         console.error('::: Reason:', reason)
    //         patientResourceResponse = null
    //         patientResource = null
    //     }
    //     console.log('::: patientResource:', patientResource)

    //     // TODO: if (!patientResource) return ':ERROR'
    // }
})()
