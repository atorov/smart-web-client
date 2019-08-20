import jwtDecode from 'jwt-decode'

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
            delay: 155,
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
        // Construct a standard FHIR REST call to obtain patient resource
        // with the SMART on FHIR-specific authorization header
        // ---------------------------------------------------------------------
        const patientId = smart.auth && smart.auth.patient
        console.log('::: patientId:', patientId)

        if (!patientId) {
            displayItem('exclamation-triangle', '', ':ERROR:APP:PATIENT_ID:', ':ERROR:')
            return null
        }

        const patientRequestURL = `${smart.fhirBaseURL}//Patient/${patientId}`
        console.log('::: patientRequestURL:', patientRequestURL)

        let patientResourceResponse
        let patientResource
        try {
            patientResourceResponse = await fetch(patientRequestURL, { headers: { Authorization: `Bearer ${smart.auth.access_token}` } })
            if (patientResourceResponse.status >= 200 && patientResourceResponse.status < 300) {
                patientResource = await patientResourceResponse.json()
            }
        }
        catch (reason) {
            console.error('::: Reason:', reason)
            patientResourceResponse = null
            patientResource = null
            displayItem('exclamation-triangle', '', ':ERROR:APP:PATIENT_RESOURCE_REQUEST:', ':ERROR:')
            return null
        }

        console.log('::: patientResource:', patientResource)
        if (!patientResource) {
            displayItem('exclamation-triangle', '', ':ERROR:APP:PATIENT_RESOURCE:', ':ERROR:')
            return null
        }

        displayItem('check', 'Patient:', patientResource.id)

        // ---------------------------------------------------------------------
        // Construct a standard FHIR REST call to obtain provider resource
        // with the SMART on FHIR-specific authorization header
        // ---------------------------------------------------------------------
        let idToken
        try {
            idToken = jwtDecode(smart.auth.id_token)
        }
        catch (reason) {
            console.error('::: Reason:', reason)
            idToken = null
            displayItem('exclamation-triangle', '', ':ERROR:APP:ID_TOKEN:', ':ERROR:')
            return null
        }
        console.log('::: idToken:', idToken)

        const fhirUser = idToken && idToken.fhirUser
        console.log('::: fhirUser:', fhirUser)

        if (!fhirUser) {
            displayItem('exclamation-triangle', '', 'Provider not found', ':WARNING:')
        }
        else {
            // TODO:
            // const patientRequestURL = `${smart.fhirBaseURL}//Patient/${patientId}`
            // console.log('::: patientRequestURL:', patientRequestURL)

            // let patientResourceResponse
            // let patientResource
            // try {
            //     patientResourceResponse = await fetch(patientRequestURL, { headers: { Authorization: `Bearer ${smart.auth.access_token}` } })
            //     if (patientResourceResponse.status >= 200 && patientResourceResponse.status < 300) {
            //         patientResource = await patientResourceResponse.json()
            //     }
            // }
            // catch (reason) {
            //     console.error('::: Reason:', reason)
            //     patientResourceResponse = null
            //     patientResource = null
            //     displayItem('exclamation-triangle', '', ':ERROR:APP:PATIENT_RESOURCE_REQUEST:', ':ERROR:')
            //     return null
            // }

            // console.log('::: patientResource:', patientResource)
            // if (!patientResource) {
            //     displayItem('exclamation-triangle', '', ':ERROR:APP:PATIENT_RESOURCE:', ':ERROR:')
            //     return null
            // }

            // displayItem('check', 'Patient:', patientResource.id)
        }
    }

    return null
})()
