import smart from './client'

console.log('::: Starting the demo...')
console.log('::: window.SMART_WEB_CLIENT:', window.SMART_WEB_CLIENT)
console.log('::: smart-web-client:', smart)

; (async () => {
    let clientState
    try {
        clientState = await smart({
            debug: true,
            delay: 550,
            onChange(_clientState) {
                console.log('√ Changed', Object.keys(_clientState).length)
                console.log('\n')
            },
        })
    }
    catch (reason) {
        console.error('::: Reason:', reason)
        clientState = null
    }

    if (clientState) {
        console.log('::: clientState:', clientState)

        // // ---------------------------------------------------------------------------
        // // Get the patient ID
        // const patientId = authorization.patient

        // console.log('::: patientId:', patientId)

        // if (!patientId) {
        //     return ':ERROR'
        // }

        // // ---------------------------------------------------------------------------
        // // Construct standard FHIR REST calls to obtain patient resource
        // // with the SMART on FHIR-specific authorization header
        // const patientRequestURL = `${fhirBaseURL}/Patient/${patientId}`

        // let patientResourceResponse = null
        // let patientResource = null
        // try {
        //     patientResourceResponse = await fetch(patientRequestURL, { headers: { Authorization: `Bearer ${accessToken}` } })
        //     patientResource = await patientResourceResponse.json()
        // }
        // catch (reason) {
        //     console.error('::: Reason:', reason)
        //     patientResourceResponse = null
        //     patientResource = null
        // }
        // console.log('::: patientResource:', patientResource)

        // if (!patientResource) {
        //     return ':ERROR'
        // }

        // ... ... ... ... ...
        // conformanceRequestURL = `${clientState.fhirBaseURL}/metadata`
        // debug && console.log('::: conformanceRequestURL:', conformanceRequestURL)

        // // -----------------------------------------------------------------
        // // Request the conformance statement from the SMART on FHIR API server
        // // `/metadata` endpoint
        // // -----------------------------------------------------------------
        // try {
        //     conformanceStatementResponse = await fetch(conformanceRequestURL)
        //     conformanceStatement = await conformanceStatementResponse.json()
        // }
        // catch (reason) {
        //     console.warn('::: Reason:', reason)
        //     conformanceStatementResponse = null
        //     conformanceStatement = null
        // }
        // hasConformanceStatement = conformanceStatementResponse && conformanceStatementResponse.status >= 200 && conformanceStatementResponse.status < 300 && conformanceStatement
        // if (!hasConformanceStatement) {
        //     throw new Error(':ERROR:LAUNCH:CONFORMANCE_STATEMENT:')
        // }
    }
})()
