import shortid from 'shortid'

import asyncDelay from './lib/async-delay'
import getURLParameter from './lib/get-url-parameter'

export default async function smartWebClient({ debug, delay = 1, onChange } = {}) {
    const clientState = {
        // authURL        : string * Required
        // clientId       : string * Required (for web apps)
        // fhirBaseURL    : string * Required
        // launchContextId: string - Optional
        // launchURL      : string * Required
        // scope          : string * Required
        // sessionKey     : string * Required
        // redirectURL    : string * Required
        // tokenURL       : string * Required
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

            // -----------------------------------------------------------------
            // Request the conformance statement from the SMART on FHIR API server
            // `/metadata` endpoint
            // -----------------------------------------------------------------
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
                throw new Error(':ERROR:LAUNCH:CONFORMANCE_STATEMENT:')
            }
        }

        debug && await asyncDelay(delay)
        debug && console.log('::: conformanceStatement:', conformanceStatement)

        // ---------------------------------------------------------------------
        // Authorization URL
        // ---------------------------------------------------------------------
        let authURL = ''
        if (conformanceStatement && Array.isArray(conformanceStatement.rest) && conformanceStatement.rest[0] && conformanceStatement.rest[0].security && Array.isArray(conformanceStatement.rest[0].security.extension)) {
            const smartExtension = conformanceStatement.rest[0].security.extension.filter(extension => extension.url === 'http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris')
            if (Array.isArray(smartExtension) && smartExtension[0] && Array.isArray(smartExtension[0].extension)) {
                smartExtension[0].extension.forEach((extension) => {
                    if (extension.url === 'authorize') {
                        authURL = extension.valueUri
                    }
                })
            }
        }

        if (!authURL) {
            throw new Error(':ERROR:LAUNCH:AUTH_URL:')
        }
        clientState.authURL = authURL
        debug && await asyncDelay(delay)
        debug && console.log('::: authURL:', clientState.authURL)
        onChange && onChange(clientState)

        // ---------------------------------------------------------------------
        // Token URL
        // ---------------------------------------------------------------------
        let tokenURL = ''
        if (conformanceStatement && Array.isArray(conformanceStatement.rest) && conformanceStatement.rest[0] && conformanceStatement.rest[0].security && Array.isArray(conformanceStatement.rest[0].security.extension)) {
            const smartExtension = conformanceStatement.rest[0].security.extension.filter(extension => extension.url === 'http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris')
            if (Array.isArray(smartExtension) && smartExtension[0] && Array.isArray(smartExtension[0].extension)) {
                smartExtension[0].extension.forEach((extension) => {
                    if (extension.url === 'token') {
                        tokenURL = extension.valueUri
                    }
                })
            }
        }

        if (!tokenURL) {
            throw new Error(':ERROR:LAUNCH:TOKEN_URL:')
        }
        clientState.tokenURL = tokenURL
        debug && await asyncDelay(delay)
        debug && console.log('::: tokenURL:', clientState.tokenURL)
        onChange && onChange(clientState)

        // ---------------------------------------------------------------------
        // Construct the launch URL by taking the base of the current URL
        // ---------------------------------------------------------------------
        clientState.launchURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
        debug && await asyncDelay(delay)
        debug && console.log('::: launchURL:', clientState.launchURL)
        onChange && onChange(clientState)

        // ---------------------------------------------------------------------
        // Construct the redirect URL by taking the base of the current URL
        // and replace `launch.html` with `index.html`
        // ---------------------------------------------------------------------
        clientState.redirectURL = clientState.launchURL.replace('launch.html', 'index.html')
        debug && await asyncDelay(delay)
        debug && console.log('::: redirectURL:', clientState.redirectURL)
        onChange && onChange(clientState)

        // ---------------------------------------------------------------------
        // Persist client state in the session storage for later use
        // ---------------------------------------------------------------------
        try {
            sessionStorage.setItem(clientState.sessionKey, JSON.stringify(clientState))
        }
        catch (reason) {
            console.error('::: Reason:', reason)
            throw new Error(':ERROR:LAUNCH:PERSIST_CLIENT_STATE:')
        }
        debug && await asyncDelay(delay)
        console.log('::: Persist client state: DONE!')

        // ---------------------------------------------------------------------
        // Redirect to the authorization server
        // and pass needed parameters for the authorization request in the URL
        // ---------------------------------------------------------------------
        const _clientId = clientState.clientId
        const _scope = clientState.scope
        const _redirectURI = clientState.redirectURL
        const _aud = clientState.fhirBaseURL
        let href = `${clientState.authURL}?response_type=code&client_id=${_clientId}&scope=${_scope}&redirect_uri=${_redirectURI}&aud=${_aud}&state=${clientState.sessionKey}`
        clientState.launchContextId && (href += `&launch=${clientState.launchContextId}`)
        debug && await asyncDelay(delay)
        console.log('::: Redirecting to the auth server ...')
        window.location.href = href
    }

    else {
        // TODO:
    }


    return {
        clientState,
    }
}
