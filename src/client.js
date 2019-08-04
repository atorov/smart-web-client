import asyncDelay from './lib/async-delay'
import getURLParameter from './lib/get-url-parameter'

export default async function smartWebClient({
    debug,
    delay = 155,
} = {}) {
    console.log('\n::: ::: :::')
    console.log('::: process.env.NODE_ENV:', process.env.NODE_ENV)
    console.log('::: APP_NAME:', APP_NAME)
    console.log('::: APP_VERSION:', APP_VERSION)
    console.log('::: MODE:', MODE)
    console.log('::: cfg.debug:', debug)
    console.log('::: cfg.delay:', delay)
    console.log('::: ::: :::\n')
    await (debug && asyncDelay(delay))

    // ---------------------------------------------------------------------------
    // ID of the registered client that has been registered
    // with the SMART on FHIR authorization server
    const clientId = getURLParameter('clientId') || 'smart-demo-app'
    console.log('::: clientId:', clientId)
    await (debug && asyncDelay(delay))

    // ---------------------------------------------------------------------------
    // `iss` parameters will be received at launch time in the URL
    const fhirBaseURL = getURLParameter('iss')
    console.log('::: fhirBaseURL:', fhirBaseURL)
    if (!fhirBaseURL) {
        throw Error(':TODO:')
    }
    await (debug && asyncDelay(delay))

    // ...
    // document.querySelector('#fhir-base-url-icon').classList.remove('fa-spinner')
    // document.querySelector('#fhir-base-url-icon').classList.remove('fa-spin')
    // document.querySelector('#fhir-base-url-value').innerHTML = '' + fhirBaseURL
    // if (fhirBaseURL) {
    //     document.querySelector('#fhir-base-url').classList.remove('w3-light-grey')
    //     document.querySelector('#fhir-base-url').classList.add('w3-light-green')
    //     document.querySelector('#fhir-base-url-icon').classList.add('fa-check')
    // }
    // else {
    //     document.querySelector('#fhir-base-url').classList.remove('w3-light-grey')
    //     document.querySelector('#fhir-base-url').classList.add('w3-red')
    //     document.querySelector('#fhir-base-url-icon').classList.add('fa-times')
    //     document.querySelector('#fhir-base-url-message').style.display = 'block'
    //     document.querySelector('#fhir-base-url-message').innerHTML = '<em>Missing `iss` parameter!</em>'
    //     scrollTo(0, document.body.scrollHeight)

    //     return ':ERROR:'
    // }
    // scrollTo(0, document.body.scrollHeight)

    // // ---------------------------------------------------------------------------
    // // `launch` parameters may be received at launch time in the URL
    // document.querySelector('#launch-context-id').style.display = 'block'

    // await(window.cfg.DEBUG && window.lib.delay())
    // const launchContextId = window.lib.getURLParameter('launch')
    // console.log('::: launchContextId:', launchContextId)

    // document.querySelector('#launch-context-id-icon').classList.remove('fa-spinner')
    // document.querySelector('#launch-context-id-icon').classList.remove('fa-spin')
    // document.querySelector('#launch-context-id-value').innerHTML = '' + launchContextId
    // if (launchContextId) {
    //     document.querySelector('#launch-context-id').classList.remove('w3-light-grey')
    //     document.querySelector('#launch-context-id').classList.add('w3-light-green')
    //     document.querySelector('#launch-context-id-icon').classList.add('fa-check')
    // }
    // else {
    //     document.querySelector('#launch-context-id').classList.remove('w3-light-grey')
    //     document.querySelector('#launch-context-id').classList.add('w3-orange')
    //     document.querySelector('#launch-context-id-icon').classList.add('fa-exclamation-triangle')
    //     document.querySelector('#launch-context-id-message').style.display = 'block'
    //     document.querySelector('#launch-context-id-message').innerHTML = '<em>Missing `launch` parameter!</em>'
    // }
    // scrollTo(0, document.body.scrollHeight)

    // // ---------------------------------------------------------------------------
    // // The scopes that the app will request from the authorization server
    // // encoded in a space-separated string:
    // //  1. permission to read all of the patient's record
    // //  2. permission to launch the app in the specific context
    // document.querySelector('#scope').style.display = 'block'

    // await(window.cfg.DEBUG && window.lib.delay())
    // const scope = window.lib.getURLParameter('scope')
    //     ? decodeURIComponent(window.lib.getURLParameter('scope'))
    //     : 'launch launch/patient launch/encounter patient/*.* openid profile fhirUser'
    // console.log('::: scope:', scope, window.lib.getURLParameter('scope'))

    // document.querySelector('#scope').classList.remove('w3-light-grey')
    // document.querySelector('#scope').classList.add('w3-light-green')
    // document.querySelector('#scope-icon').classList.remove('fa-spinner')
    // document.querySelector('#scope-icon').classList.remove('fa-spin')
    // document.querySelector('#scope-icon').classList.add('fa-check')
    // document.querySelector('#scope-value').innerHTML = '' + scope
    // scrollTo(0, document.body.scrollHeight)

    // // ---------------------------------------------------------------------------
    // // Generate an unique session key string
    // document.querySelector('#session-key').style.display = 'block'

    // await(window.cfg.DEBUG && window.lib.delay())
    // const sessionKey = window.lib.generateUID(4)
    // console.log('::: sessionKey:', sessionKey)

    // document.querySelector('#session-key').classList.remove('w3-light-grey')
    // document.querySelector('#session-key').classList.add('w3-light-green')
    // document.querySelector('#session-key-icon').classList.remove('fa-spinner')
    // document.querySelector('#session-key-icon').classList.remove('fa-spin')
    // document.querySelector('#session-key-icon').classList.add('fa-check')
    // document.querySelector('#session-key-value').innerHTML = '' + sessionKey
    // scrollTo(0, document.body.scrollHeight)

    // // ---------------------------------------------------------------------------
    // // Construct the conformance statement URL,
    // // `/.well-known/smart-configuration.json` endpoint
    // document.querySelector('#conformance-well-known-url').style.display = 'block'

    // await(window.cfg.DEBUG && window.lib.delay())
    // const conformanceWellKnownRequestURL = `${fhirBaseURL}/.well-known/smart-configuration.json`
    // console.log('::: conformanceWellKnownURL:', conformanceWellKnownRequestURL)

    // document.querySelector('#conformance-well-known-url').classList.remove('w3-light-grey')
    // document.querySelector('#conformance-well-known-url').classList.add('w3-light-green')
    // document.querySelector('#conformance-well-known-url-icon').classList.remove('fa-spinner')
    // document.querySelector('#conformance-well-known-url-icon').classList.remove('fa-spin')
    // document.querySelector('#conformance-well-known-url-icon').classList.add('fa-check')
    // document.querySelector('#conformance-well-known-url-value').innerHTML = '' + conformanceWellKnownRequestURL
    // scrollTo(0, document.body.scrollHeight)

    // // ---------------------------------------------------------------------------
    // // Request the conformance statement from the SMART on FHIR API server
    // // `/.well-known/smart-configuration.json` endpoint
    // document.querySelector('#conformance-well-known').style.display = 'block'

    // await(window.cfg.DEBUG && window.lib.delay())
    // let conformanceStatementResponse = null
    // let conformanceStatement = null
    // try {
    //     conformanceStatementResponse = await fetch(conformanceWellKnownRequestURL)
    //     conformanceStatement = await conformanceStatementResponse.json()
    // }
    // catch (reason) {
    //     console.error('::: Reason:', reason)
    //     conformanceStatementResponse = null
    //     conformanceStatement = null
    // }
    // console.log('::: conformanceStatement:', conformanceStatement)

    // let hasConformanceStatement = conformanceStatementResponse && conformanceStatementResponse.status >= 200 && conformanceStatementResponse.status < 300 && conformanceStatement

    // document.querySelector('#conformance-well-known-icon').classList.remove('fa-spinner')
    // document.querySelector('#conformance-well-known-icon').classList.remove('fa-spin')
    // if (hasConformanceStatement) {
    //     document.querySelector('#conformance-well-known').classList.remove('w3-light-grey')
    //     document.querySelector('#conformance-well-known').classList.add('w3-light-green')
    //     document.querySelector('#conformance-well-known-icon').classList.add('fa-check')
    //     document.querySelector('#conformance-well-known-value').innerHTML = 'Done'
    // }
    // else {
    //     document.querySelector('#conformance-well-known').classList.remove('w3-light-grey')
    //     document.querySelector('#conformance-well-known').classList.add('w3-orange')
    //     document.querySelector('#conformance-well-known-icon').classList.add('fa-exclamation-triangle')
    //     document.querySelector('#conformance-well-known-value').innerHTML = 'Failed'
    //     document.querySelector('#conformance-well-known-message').style.display = 'block'
    //     document.querySelector('#conformance-well-known-message').innerHTML = '<em>Unable to retrieve a conformance statement from `/.well-known/smart-configuration.json` endpoint</em>'
    // }
    // scrollTo(0, document.body.scrollHeight)

    // // ---------------------------------------------------------------------------
    // // Construct the conformance statement URL,
    // // `/metadata` endpoint
    // document.querySelector('#conformance-metadata-url').style.display = 'block'

    // await(window.cfg.DEBUG && window.lib.delay())
    // const conformanceMetadataRequestURL = `${fhirBaseURL}/metadata`
    // console.log('::: conformanceMetadataURL:', conformanceMetadataRequestURL)

    // document.querySelector('#conformance-metadata-url').classList.remove('w3-light-grey')
    // document.querySelector('#conformance-metadata-url').classList.add('w3-light-green')
    // document.querySelector('#conformance-metadata-url-icon').classList.remove('fa-spinner')
    // document.querySelector('#conformance-metadata-url-icon').classList.remove('fa-spin')
    // document.querySelector('#conformance-metadata-url-icon').classList.add('fa-check')
    // document.querySelector('#conformance-metadata-url-value').innerHTML = '' + conformanceMetadataRequestURL
    // scrollTo(0, document.body.scrollHeight)

    // // ---------------------------------------------------------------------------
    // // Request the conformance statement from the SMART on FHIR API server
    // // `/metadata` endpoint
    // document.querySelector('#conformance-metadata').style.display = 'block'

    // await(window.cfg.DEBUG && window.lib.delay())
    // conformanceStatementResponse = null
    // conformanceStatement = null
    // try {
    //     conformanceStatementResponse = await fetch(conformanceMetadataRequestURL)
    //     conformanceStatement = await conformanceStatementResponse.json()
    // }
    // catch (reason) {
    //     console.error('::: Reason:', reason)
    //     conformanceStatementResponse = null
    //     conformanceStatement = null
    // }
    // console.log('::: conformanceStatement:', conformanceStatement)

    // hasConformanceStatement = conformanceStatementResponse && conformanceStatementResponse.status >= 200 && conformanceStatementResponse.status < 300 && conformanceStatement

    // document.querySelector('#conformance-metadata-icon').classList.remove('fa-spinner')
    // document.querySelector('#conformance-metadata-icon').classList.remove('fa-spin')
    // if (hasConformanceStatement) {
    //     document.querySelector('#conformance-metadata').classList.remove('w3-light-grey')
    //     document.querySelector('#conformance-metadata').classList.add('w3-light-green')
    //     document.querySelector('#conformance-metadata-icon').classList.add('fa-check')
    //     document.querySelector('#conformance-metadata-value').innerHTML = 'Done'
    // }
    // else {
    //     document.querySelector('#conformance-metadata').classList.remove('w3-light-grey')
    //     document.querySelector('#conformance-metadata').classList.add('w3-red')
    //     document.querySelector('#conformance-metadata-icon').classList.add('fa-times')
    //     document.querySelector('#conformance-metadata-value').innerHTML = 'Failed'
    //     document.querySelector('#conformance-metadata-message').style.display = 'block'
    //     document.querySelector('#conformance-metadata-message').innerHTML = '<em>Unable to retrieve a conformance statement from `/metadata` endpoint</em>'
    //     scrollTo(0, document.body.scrollHeight)

    //     return ':ERROR:'
    // }
    // scrollTo(0, document.body.scrollHeight)

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
}
