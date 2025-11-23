let lastShow = 0;
chrome.webRequest.onBeforeSendHeaders.addListener(
    async (details) => {
        try {
            if (details.url.indexOf('https://attendance.snappfood.ir/SnappPortal/api') == -1)
                return;
            const origin = details.initiator || details.originUrl || '';
            if (origin.indexOf('chrome-extension://') != -1)
                return;
            console.log(`origin=`, origin);
            console.log("➡️ Request URL:", details.url);
            console.log("🧾 Headers:", details.requestHeaders);
            // if (details.requestHeaders[`x-xsrf-token`] != undefined)
            //     console.log(`✅ Token:`, details.requestHeaders[`x-xsrf-token`]);

            const auth = details.requestHeaders?.find(h =>
                h.name.toLowerCase() === "x-xsrf-token"
            );
            const cookie = details.requestHeaders?.find(h =>
                h.name.toLowerCase() === "cookie"
            );
            if (auth) {
                console.log("🔑 Token:", auth.value);
                console.log("🍪 Cookie:", cookie.value);
                await chrome.storage.local.set({
                    'authToken': auth.value,
                    'cookie': cookie.value,
                    'updatedAt': Date.now(),
                });
                console.log(await chrome.storage.local.get());
                if (Date.now() - lastShow <= 60_000)
                    return;
                lastShow = Date.now();
                chrome.action.openPopup();
            }
        }
        catch (err) {
            console.log(`error in background js:`, err);
        }
    },

    // FILTER
    { urls: ["<all_urls>"] },

    // EXTRA INFO SPECIFIER (allowed in MV3)
    ["requestHeaders", "extraHeaders"]
);

// chrome.runtime.onMessage.addListener((msg, sender) => {
//     if (msg.action === "openHelloPage") {
//         chrome.windows.getLastFocused({}, (win) => {
//             if (win) {
//                 chrome.tabs.create({ url: chrome.runtime.getURL("hello.html") });
//             }
//         });
//     }
// });