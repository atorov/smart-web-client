import client from './client'

console.log('::: window.SMART_WEB_CLIENT:', window.SMART_WEB_CLIENT)
console.log('::: smart-web-client:', client)

const appContentElement = document.querySelector('#app-content')

function displayItem(icon, title, value, status = ':OK:') {
    let bgndClass
    switch (status) {
        case ':OK:':
            bgndClass = 'light-green'; break
        case ':WARNING:':
            bgndClass = 'orange'; break
        case ':ERROR:':
            bgndClass = 'red'; break
        default:
            bgndClass = 'light-grey'; break
    }
    const element = document.createElement('div')
    element.classList = `w3-container w3-${bgndClass}`
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

    const appSubHeaderElement = document.querySelector('#app-sub-header')

    if (clientState.stage === ':LAUNCH:') {
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
            ['fhirBaseURL', 'FHIR Base URL (iss)'],
            ['clientId', 'Client ID (clientId)'],
            ['launchContextId', 'Launch Context ID (launch)'],
            ['scope', 'Scope (scope)'],
            ['sessionKey', 'Session Key'],
            ['authURL', 'Authorization URL'],
            ['tokenURL', 'Token URL'],
            ['launchURL', 'Launch URL'],
            ['redirectURL', 'Redirect URL'],
        ].forEach(([key, title]) => {
            if (clientState[key]) {
                displayItem('check', `${title}:`, clientState[key])
            }
        })
    }
    else if (clientState.stage === ':AUTH:') {
        if (!appSubHeaderElement.innerHTML) {
            appSubHeaderElement.classList = 'w3-container w3-light-grey w3-left-align'
            appSubHeaderElement.innerHTML = `
                <h1 class="w3-large">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Authorizing the app</span>
                </h1>
            `
        }

        appContentElement.innerHTML = ''
        ;[
            ['sessionKey', 'Session Key (state)'],
            ['authCode', 'Auth Code (code)'],
        ].forEach(([key, title]) => {
            if (clientState[key]) {
                displayItem('check', `${title}:`, clientState[key])
            }
        })
    }
    else if (clientState.stage === ':AUTH_READY:') {
        appSubHeaderElement.innerHTML = ''
        appContentElement.innerHTML = ''
    }
}

// -----------------------------------------------------------------------------
(async () => {
    let smart
    try {
        smart = await client({
            debug: true,
            delay: 0,
            onChange(clientState) {
                updateUI(clientState)
            },
        })
    }
    catch (reason) {
        console.error('::: Reason:', reason)
        smart = null
        displayItem('exclamation-triangle', '', reason, ':ERROR:')
        return null
    }

    if (smart && smart.stage === ':AUTH_READY:') {
        console.log('::: SMART:', smart)

        // ---------------------------------------------------------------------
        // Construct standard FHIR REST calls to obtain patient resource
        // with the SMART on FHIR-specific authorization header
        // ---------------------------------------------------------------------
        const patientId = smart.auth && smart.auth.patient
        console.log('::: patientId:', patientId)

        if (!patientId) {
            displayItem('exclamation-triangle', '', ':ERROR:APP:PATIENT_ID:', ':ERROR:')
            return null
        }

        const patientRequestURL = `${smart.fhirBaseURL}/Patient/${patientId}`
        console.log('::: patientRequestURL:', patientRequestURL)

        let patientResourceResponse
        let patientResource
        try {
            patientResourceResponse = await fetch(patientRequestURL, { headers: { Authorization: `Bearer ${smart.auth.access_token}` } })
            patientResource = await patientResourceResponse.json()
        }
        catch (reason) {
            console.error('::: Reason:', reason)
            patientResourceResponse = null
            patientResource = null
            displayItem('exclamation-triangle', '', ':ERROR:APP:PATIENT_RESOURCE_REQUEST:', ':ERROR:')
            return null
        }

        if (!patientResource) {
            displayItem('exclamation-triangle', '', ':ERROR:APP:PATIENT_RESOURCE:', ':ERROR:')
            return null
        }

        let patientResourceString
        try {
            patientResourceString = JSON.stringify(patientResource)
        }
        catch (reason) {
            console.error('::: Reason:', reason)
            patientResourceString = ''
            displayItem('exclamation-triangle', '', ':ERROR:APP:PATIENT_RESOURCE_STRINGIFY', ':ERROR:')
            return null
        }

        if (!patientResourceString) {
            displayItem('exclamation-triangle', '', ':ERROR:APP:PATIENT_RESOURCE_NOT_AVAILABLE:', ':ERROR:')
            return null
        }

        console.log('::: patientResource:', patientResource)
        console.log('::: patientResourceString:', patientResourceString)
        displayItem('check', 'Patient', patientResourceString)
    }

    return 'TODO:'
})()
