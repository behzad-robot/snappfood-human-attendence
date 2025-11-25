let last_popup_show = 0;
const NOTIF_INTERVAL = 1_000 * 60 * 60 * 2;
console.log(`loaded background.js`);
const checkShowNotif = async () => {
    console.log(`check show notif`);
    let storage = await chrome.storage.local.get();
    let lastShowNotif = storage.lastShowNotif;
    console.log(`lastShowNotif`, lastShowNotif);
    if (lastShowNotif == undefined)
        lastShowNotif = 0;
    if (Date.now() - lastShowNotif <= NOTIF_INTERVAL)
        return;
    lastShowNotif = Date.now();
    chrome.storage.local.set({ ...storage, lastShowNotif: lastShowNotif });
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon-128.png",
        title: "به attendence سر زدی؟",
        message: "اگر کارای امروزت رو ثبت نکردی ثبت کن!"
    });
};
setInterval(checkShowNotif, 60 * 1_000);
checkShowNotif();
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
                if (Date.now() - last_popup_show <= 60_000)
                    return;
                last_popup_show = Date.now();
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