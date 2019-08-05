import shortid from 'shortid'

import asyncDelay from './lib/async-delay'
import getURLParameter from './lib/get-url-parameter'

export default async function smartWebClient({ debug, delay = 1, onChange } = {}) {
    const clientState = {
        // clientId: '', // * Required for web apps
        // fhirBaseURL: '', // * Required
        // launchContextId: '', // Optional
        // scope: '', // * Required
        // sessionKey: '', // * Required
    }

    // -------------------------------------------------------------------------
    // Get started
    // -------------------------------------------------------------------------
    debug && console.log('\n::: ::: :::')
    debug && console.log('::: process.env.NODE_ENV:', process.env.NODE_ENV)
    debug && console.log('::: APP_NAME:', APP_NAME)
    debug && console.log('::: APP_VERSION:', APP_VERSION)
    debug && console.log('::: MODE:', MODE)
    debug && console.log('::: cfg.debug:', debug)
    debug && console.log('::: cfg.delay:', delay)
    debug && console.log('::: ::: :::')
    debug && console.log('---------------------\n')
    debug && await asyncDelay(delay)

    // -------------------------------------------------------------------------
    // `iss` parameters has been received at launch time in the URL
    // -------------------------------------------------------------------------
    clientState.fhirBaseURL = getURLParameter('iss')
    if (clientState.fhirBaseURL) {
        debug && await asyncDelay(delay)
        debug && console.log('::: fhirBaseURL (iss):', clientState.fhirBaseURL)
        onChange && onChange(clientState)
        // ---------------------------------------------------------------------
        // ID of the client that has been registered
        // with the SMART on FHIR authorization server
        // ---------------------------------------------------------------------
        clientState.clientId = getURLParameter('clientId') || 'smart-demo-app'
        debug && await asyncDelay(delay)
        debug && console.log('::: clientId:', clientState.clientId)
        onChange && onChange(clientState)

        // ---------------------------------------------------------------------
        // `launch` parameters may be received at launch time in the URL
        // ---------------------------------------------------------------------
        clientState.launchContextId = getURLParameter('launch')
        debug && await asyncDelay(delay)
        debug && console.log('::: launchContextId:', clientState.launchContextId)
        onChange && onChange(clientState)

        // ---------------------------------------------------------------------
        // Scopes that the app will request from the authorization server
        // ---------------------------------------------------------------------
        clientState.scope = getURLParameter('scope')
            ? decodeURIComponent(getURLParameter('scope'))
            : 'launch launch/patient launch/encounter patient/*.* openid profile fhirUser'
        debug && await asyncDelay(delay)
        debug && console.log('::: scope:', clientState.scope)
        onChange && onChange(clientState)

        // ---------------------------------------------------------------------
        // Generate an unique session key string
        // ---------------------------------------------------------------------
        clientState.sessionKey = shortid.generate()
        debug && await asyncDelay(delay)
        debug && console.log('::: sessionKey:', clientState.sessionKey)
        onChange && onChange(clientState)

        // ---------------------------------------------------------------------
        // Construct the conformance statement URL,
        // `/.well-known/smart-configuration.json` endpoint
        // ---------------------------------------------------------------------
        let conformanceRequestURL = `${clientState.fhirBaseURL}/.well-known/smart-configuration.json`
        debug && console.log('::: conformanceRequestURL:', conformanceRequestURL)

        // ---------------------------------------------------------------------
        // Request the conformance statement from the SMART on FHIR API server
        // `/.well-known/smart-configuration.json` endpoint
        // ---------------------------------------------------------------------
        let conformanceStatementResponse
        let conformanceStatement
        let hasConformanceStatement
        try {
            conformanceStatementResponse = await fetch(conformanceRequestURL)
            conformanceStatement = await conformanceStatementResponse.json()
        }
        catch (reason) {
            console.warn('::: Reason:', reason)
            conformanceStatementResponse = null
            conformanceStatement = null
        }
        hasConformanceStatement = conformanceStatementResponse && conformanceStatementResponse.status >= 200 && conformanceStatementResponse.status < 300 && conformanceStatement
        if (!hasConformanceStatement) {
            // -----------------------------------------------------------------
            // Construct the conformance statement URL,
            // `/metadata` endpoint
            // -----------------------------------------------------------------
            conformanceRequestURL = `${clientState.fhirBaseURL}/metadata`
            debug && console.log('::: conformanceRequestURL:', conformanceRequestURL)

            // ---------------------------------------------------------------------
            // Request the conformance statement from the SMART on FHIR API server
            // `/.well-known/smart-configuration.json` endpoint
            // ---------------------------------------------------------------------
            try {
                conformanceStatementResponse = await fetch(conformanceRequestURL)
                conformanceStatement = await conformanceStatementResponse.json()
            }
            catch (reason) {
                console.warn('::: Reason:', reason)
                conformanceStatementResponse = null
                conformanceStatement = null
            }
            hasConformanceStatement = conformanceStatementResponse && conformanceStatementResponse.status >= 200 && conformanceStatementResponse.status < 300 && conformanceStatement
            if (!hasConformanceStatement) {
                throw new Error(':ERROR:CONFORMANCE_STATEMENT_REQUEST:')
            }
        }

        debug && await asyncDelay(delay)
        debug && console.log('::: conformanceStatement:', conformanceStatement)
    }


    // // ---------------------------------------------------------------------------
    // // Find out the endpoint URLs for the authorization server
    // document.querySelector('#auth-endpoints').style.display = 'block'

    // await(window.cfg.DEBUG && window.lib.delay())
    // let authURL = ''
    // let tokenURL = ''
    // if (conformanceStatement && Array.isArray(conformanceStatement.rest) && conformanceStatement.rest[0] && conformanceStatement.rest[0].security && Array.isArray(conformanceStatement.rest[0].security.extension)) {
    //     const smartExtension = conformanceStatement.rest[0].security.extension.filter(extension => extension.url === 'http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris')
    //     if (Array.isArray(smartExtension) && smartExtension[0] && Array.isArray(smartExtension[0].extension)) {
    //         smartExtension[0].extension.forEach((extension) => {
    //             if (extension.url === 'authorize') {
    //                 authURL = extension.valueUri
    //             }
    //             else if (extension.url === 'token') {
    //                 tokenURL = extension.valueUri
    //             }
    //         })
    //     }
    // }
    // console.log('::: authURL:', authURL)
    // console.log('::: tokenURL:', tokenURL)

    // document.querySelector('#auth-endpoints-icon').classList.remove('fa-spinner')
    // document.querySelector('#auth-endpoints-icon').classList.remove('fa-spin')
    // if (authURL && tokenURL) {
    //     document.querySelector('#auth-endpoints').classList.remove('w3-light-grey')
    //     document.querySelector('#auth-endpoints').classList.add('w3-light-green')
    //     document.querySelector('#auth-endpoints-icon').classList.add('fa-check')
    //     document.querySelector('#auth-endpoints-value').innerHTML = `
    //   <br />
    //   <span>${authURL}</span>
    //   <br />
    //   <span>${tokenURL}</span>
    // `
    // }
    // else {
    //     document.querySelector('#auth-endpoints').classList.remove('w3-light-grey')
    //     document.querySelector('#auth-endpoints').classList.add('w3-red')
    //     document.querySelector('#auth-endpoints-icon').classList.add('fa-times')
    //     document.querySelector('#auth-endpoints-message').style.display = 'block'
    //     document.querySelector('#auth-endpoints-message').innerHTML = '<em>Can not find out the endpoint URLs for the authorization server!</em>'
    //     scrollTo(0, document.body.scrollHeight)

    //     return ':ERROR:'
    // }
    // scrollTo(0, document.body.scrollHeight)

    // // ---------------------------------------------------------------------------
    // // Construct the launch URL by taking the base of the current URL
    // document.querySelector('#launch-url').style.display = 'block'

    // await(window.cfg.DEBUG && window.lib.delay())
    // const launchURL = `${location.protocol}//${location.host}${location.pathname}`
    // console.log('::: launchURL:', launchURL)

    // document.querySelector('#launch-url').classList.remove('w3-light-grey')
    // document.querySelector('#launch-url').classList.add('w3-light-green')
    // document.querySelector('#launch-url-icon').classList.remove('fa-spinner')
    // document.querySelector('#launch-url-icon').classList.remove('fa-spin')
    // document.querySelector('#launch-url-icon').classList.add('fa-check')
    // document.querySelector('#launch-url-value').innerHTML = '' + launchURL
    // scrollTo(0, document.body.scrollHeight)

    // // ---------------------------------------------------------------------------
    // // Construct the redirect URL by taking the base of the current URL
    // // and replace `launch.html` with `index.html`
    // document.querySelector('#redirect-url').style.display = 'block'

    // await(window.cfg.DEBUG && window.lib.delay())
    // const redirectURL = launchURL.replace('launch.html', 'index.html')
    // console.log('::: redirectURL:', redirectURL)

    // document.querySelector('#redirect-url').classList.remove('w3-light-grey')
    // document.querySelector('#redirect-url').classList.add('w3-light-green')
    // document.querySelector('#redirect-url-icon').classList.remove('fa-spinner')
    // document.querySelector('#redirect-url-icon').classList.remove('fa-spin')
    // document.querySelector('#redirect-url-icon').classList.add('fa-check')
    // document.querySelector('#redirect-url-value').innerHTML = '' + redirectURL
    // scrollTo(0, document.body.scrollHeight)

    // // ---------------------------------------------------------------------------
    // // Retain a couple parameters in the session for later use
    // document.querySelector('#retain-params').style.display = 'block'

    // let isRetainParamsSuccessful
    // await(window.cfg.DEBUG && window.lib.delay())
    // try {
    //     const params = {
    //         clientId,
    //         serviceUri: fhirBaseURL,
    //         redirectUri: redirectURL,
    //         tokenUri: tokenURL
    //     }
    //     secret && (params.secret = secret)
    //     window.sessionStorage.setItem(sessionKey, window.JSON.stringify(params))
    //     isRetainParamsSuccessful = true
    // }
    // catch (reason) {
    //     console.error('::: Reason:', reason)
    //     isRetainParamsSuccessful = false
    // }
    // console.log('::: isRetainParamsSuccessful:', isRetainParamsSuccessful)

    // document.querySelector('#retain-params-icon').classList.remove('fa-spinner')
    // document.querySelector('#retain-params-icon').classList.remove('fa-spin')
    // if (isRetainParamsSuccessful) {
    //     document.querySelector('#retain-params').classList.remove('w3-light-grey')
    //     document.querySelector('#retain-params').classList.add('w3-light-green')
    //     document.querySelector('#retain-params-icon').classList.add('fa-check')
    //     document.querySelector('#retain-params-value').innerHTML = 'Done'
    // }
    // else {
    //     document.querySelector('#retain-params').classList.remove('w3-light-grey')
    //     document.querySelector('#retain-params').classList.add('w3-red')
    //     document.querySelector('#retain-params-icon').classList.add('fa-times')
    //     document.querySelector('#retain-params-message').style.display = 'block'
    //     document.querySelector('#retain-params-message').innerHTML = '<em>Can not retain parameters in the session storage!</em>'
    //     scrollTo(0, document.body.scrollHeight)

    //     return ':ERROR:'
    // }
    // scrollTo(0, document.body.scrollHeight)

    // // ---------------------------------------------------------------------------
    // // Redirect the browser to the authorization server
    // // and pass the needed parameters for the authorization request in the URL
    // document.querySelector('#redirect-to-auth').style.display = 'block'

    // await(window.cfg.DEBUG && window.lib.delay())
    // const _clientId = window.encodeURIComponent(clientId)
    // const _scope = window.encodeURIComponent(scope)
    // const _redirectURI = window.encodeURIComponent(redirectURL)
    // const _aud = window.encodeURIComponent(fhirBaseURL)
    // let href = `${authURL}?response_type=code&client_id=${_clientId}&scope=${_scope}&redirect_uri=${_redirectURI}&aud=${_aud}&state=${sessionKey}`
    // launchContextId && (href += `&launch=${launchContextId}`)
    // console.log('::: href:', href)

    // document.querySelector('#redirect-to-auth').classList.remove('w3-light-grey')
    // document.querySelector('#redirect-to-auth').classList.add('w3-light-green')
    // document.querySelector('#redirect-to-auth-icon').classList.remove('fa-spinner')
    // document.querySelector('#redirect-to-auth-icon').classList.remove('fa-spin')
    // document.querySelector('#redirect-to-auth-icon').classList.add('fa-check')
    // document.querySelector('#redirect-to-auth-value').innerHTML = `<br /><span>${href}</span>`
    // scrollTo(0, document.body.scrollHeight)

    // await(window.cfg.DEBUG && window.lib.delay())
    // window.location.href = href

    return {
        clientState,
    }
}
