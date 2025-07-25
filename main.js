// ==UserScript==
// @name         Add Country to Cursor SheerID
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Adds the VN (Vietnam) country code to the response of the SheerID verification service for Cursor.
// @author       zhrmghwsa (English translation and refactor by an AI assistant)
// @match        https://my.sheerid.com/*
// @match        https://*.sheerid.com/*
// @match        https://www.cursor.com/cn/student*
// @match        https://www.cursor.com/cn/student-verified*
// @match        https://cursor.com/cn/student*
// @match        https://services.sheerid.com/verify/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Checks if the given URL is a target for modification.
     * @param {string} url - The URL of the network request.
     * @returns {boolean} - True if the URL should be intercepted.
     */
    const isTargetUrl = (url) => {
        if (!url) return false;
        return url.includes('/rest/v2/program/681044b7729fba7beccd3565/theme') ||
               url.includes('theme?locale=') ||
               (url.includes('/rest/v2/program/') && url.includes('/theme'));
    };

    /**
     * The core logic to modify the SheerID configuration data.
     * It adds Vietnam (VN) to the country list and sets verification validity.
     * @param {object} responseBody - The parsed JSON response object.
     * @returns {object} - The modified response object.
     */
    const modifySheerIdConfig = (responseBody) => {
        if (responseBody && responseBody.config && Array.isArray(responseBody.config.countries)) {
            // 1. Add Vietnam (VN) to the country list if it's not already present.
            if (!responseBody.config.countries.includes('VN')) {
                console.log('Adding "VN" to the country list...');
                // Attempt to insert it alphabetically after Venezuela (VE) for consistency.
                const veIndex = responseBody.config.countries.indexOf('VE');
                if (veIndex !== -1) {
                    responseBody.config.countries.splice(veIndex + 1, 0, 'VN');
                } else {
                    // Fallback: just add it to the end of the list.
                    responseBody.config.countries.push('VN');
                }

                // Also add the necessary organization search tags for Vietnam.
                if (responseBody.config.orgSearchCountryTags) {
                    responseBody.config.orgSearchCountryTags['VN'] = ["HEI", "qualifying_hs", "qualifying_ps"];
                }
                console.log('"VN" successfully added to the country list.');
            }

            // 2. Force the verification validity period to 365 days.
            if (responseBody.config.verificationValidityDays !== 365) {
                console.log('Setting verification validity period to 365 days.');
                responseBody.config.verificationValidityDays = 365;
            }
        }
        return responseBody;
    };

    // --- Intercept Fetch API requests ---
    const originalFetch = window.fetch;
    window.fetch = async function(url, options) {
        const response = await originalFetch(url, options);

        if (isTargetUrl(url)) {
            try {
                const clonedResponse = response.clone();
                let responseBody = await clonedResponse.json();

                // Apply the modifications
                responseBody = modifySheerIdConfig(responseBody);

                // Return a new response with the modified body
                return new Response(JSON.stringify(responseBody), {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                });
            } catch (e) {
                console.error('Error processing fetch response:', e);
                return response; // Return original response on error
            }
        }
        return response;
    };

    // --- Intercept XMLHttpRequest (for older parts of the site that might use it) ---
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        this._url = url; // Store the URL for later checking in send()
        return originalXHROpen.apply(this, [method, url, ...rest]);
    };

    XMLHttpRequest.prototype.send = function(body) {
        const xhr = this;

        if (isTargetUrl(xhr._url)) {
            const originalOnReadyStateChange = xhr.onreadystatechange;
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        let responseBody = JSON.parse(xhr.responseText);

                        // Apply the same modifications
                        responseBody = modifySheerIdConfig(responseBody);

                        // Redefine the responseText property to return our modified JSON string
                        Object.defineProperty(xhr, 'responseText', {
                            get: function() {
                                return JSON.stringify(responseBody);
                            },
                            configurable: true
                        });
                    } catch (e) {
                        console.error('Error processing XHR response:', e);
                    }
                }

                // Call the original handler if it exists
                if (originalOnReadyStateChange) {
                    originalOnReadyStateChange.apply(xhr, arguments);
                }
            };
        }

        return originalXHRSend.apply(this, [body]);
    };

    console.log('UserScript "Add Vietnam to Cursor SheerID" has been loaded.');
})();
