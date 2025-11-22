const popup = async () => {
    let storage = await chrome.storage.local.get();
    let authToken = storage.authToken;
    let cookie = storage.cookie;
    try {
        console.log(`storage`, await chrome.storage.local.get())
        document.getElementById("token").textContent =
            authToken || "No token captured yet.";
        const linkElement = document.getElementById("open-link");
        console.log(`search open-link!`);
        if (linkElement) {
            console.log(`found open-link!`);
            linkElement.style.display = "block";
            linkElement.href = chrome.runtime.getURL("react.html") + "?token=" + authToken + "&cookie=" + cookie;
            // console.log(`DONE!`);
            // link.addEventListener("click", (e) => {
            //     e.preventDefault();
            //     console.log(`clickedddd!`);
            //     chrome.tabs.create({ url: chrome.runtime.getURL("hello.html") });
            //     // chrome.runtime.sendMessage({ action: "openHelloPage" });
            //     // window.alert(`Open APP!`);
            // });
        }
    }
    catch (err) {
        console.log(`error in popup.js`, err);
    }
};
popup();
// chrome.storage.local.get("authToken", async ({ authToken }) => {
//     try {
//         console.log(`storage`, await chrome.storage.local.get())
//         document.getElementById("token").textContent =
//             authToken || "No token captured yet.";
//         const linkElement = document.getElementById("open-link");
//         console.log(`search open-link!`);
//         if (linkElement) {
//             console.log(`found open-link!`);
//             linkElement.style.display = "block";
//             linkElement.href = chrome.runtime.getURL("react.html") + "?token=" + authToken;
//             // console.log(`DONE!`);
//             // link.addEventListener("click", (e) => {
//             //     e.preventDefault();
//             //     console.log(`clickedddd!`);
//             //     chrome.tabs.create({ url: chrome.runtime.getURL("hello.html") });
//             //     // chrome.runtime.sendMessage({ action: "openHelloPage" });
//             //     // window.alert(`Open APP!`);
//             // });
//         }
//     }
//     catch (err) {
//         console.log(`error in popup.js`, err);
//     }
// });
