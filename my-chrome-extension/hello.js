let searchParams = new URLSearchParams(window.location.search);
console.log(`searchParams=`, searchParams);
let token = searchParams.get('token');
console.log(`token=`, searchParams);
document.getElementById('token').textContent = token;
const getDoorKari = async () => {
    const url = 'https://attendance.snappfood.ir/SnappPortal/api/Framework/EntityView/Query';
    const options = {
        method: 'POST',
        headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            cookie: 'rahkaran-culture=c=fa-IR|uic=fa-IR; rahkaran-xsrf=CfDJ8OXOtpZ5WotGuQAshYdU0Xugedk0U2y7JRMaCc6pGqeYsHYBuX95r1WccSc3VPWnAQyas-OYmISaYm6sN6f2UoBRiy0lW9EB23SXGY3XIrkz7AEBmlWDT-zq985Zm5a1rT0z69o5TBcCBd-zOQzRclE; XSRF-TOKEN=CfDJ8OXOtpZ5WotGuQAshYdU0XtMK_Utq9BFPyE4zmgY-3pxaATt7hkcAA7XDeLpteBR6WMsgrlVyownLpFpKn-sH9HOr_o0oBTZUW2vhcyBd5rBRKSlf0a-_vy7CGvjVsvuaxPtOC9YQWEKMq9mM6hZx2rCiq88YkrZjAOJBhZ8S2OWqkLAYmYHwv6rAkLJ8zm_kw; rahkaran-auth=CfDJ8OXOtpZ5WotGuQAshYdU0XuNIqYckZOaskJJachwgjJ-JfKAzX4Rc24ODaP3NUkuHQ0z-lqcdkn_E1h56u6NAlrXQ33ngWSATGQZMEfOK-DzAOWYRFHNL0SDURArmgSHQq7n5xFHN9il5kXROm3yNK2LOoZB4P6Z-61vY6GfUipm01eQnNcRE_8pvtOh9lqJk-fPDFgJjkElwvvlYashUbW3A9r0zNtH68bU4l33PPWUCjZ_XqtZ3_1jlgjdm6M9LclybCGhVF6EBTEDZa_R1sRoP4g9VKe54DS9VZc09JpooXA3Z0m-G9gYMIf05RI5h1PsIuZu3P-BiknTvdmRcpAFfXh0ztDXvgCCHa5D4fZhO9sjKlv627z-nBDNvUYTVYRNkODkZeXqO_HdFQEek-aBEUCWGKnNewyGpRFifo8JbIImMRmCRHbAthOVUMpJRps4lVU0lMMO4NpfoC9HJ7R6Nc3jbswX5t7HcC61UT7-KuZZgz7aOKYJ_BJgmhHOBKid9QRy0GBZUeJ2BjLCSJccRjYJGwC4ipa6AsH3bJK1BdQL09yIl4ss1CwkjRz4WM1YlSGKIo0bEz4gdjvF0QiKEFugZyIneTwdyPvdgRrjIl1Zl6sv7AVO-Xa6NaNriWPYdgpRoRY-Wb-9wfUlYMg',
            origin: 'https://attendance.snappfood.ir',
            priority: 'u=1, i',
            referer: 'https://attendance.snappfood.ir/SnappPortal/apps/hcm-mission-portal/list-mission-documents?componentName=SystemGroup.HCM.Mission&entity=MissionDocument&view=PortalSelfServiceMissionDocuments',
            'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            'x-xsrf-token': token,
        },
        body: '{"entityViewName":"SystemGroup.HCM.Mission/MissionDocument/PortalSelfServiceMissionDocuments","pageSize":50,"pageIndex":0,"searchText":null,"parameters":null,"sorts":null,"filters":null,"source":"list"}'
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
};
const showDoorKariItems = (items = []) => {
    let listElement = document.getElementById('door-kari-list');
    listElement.innerHTML = '';
    for (var i = 0; i < items.length; i++) {
        let item = items[i];
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';
        rowDiv.style.gap = '2px';
        rowDiv.style.marginBottom = '4px'; // optional spacing between rows
        rowDiv.style.alignItems = 'center';

        // Create individual cells
        const issueDateDiv = document.createElement('div');
        issueDateDiv.textContent = item.fromDateTime_Display;
        issueDateDiv.style.flex = '1'; // adjust width as needed

        const nameDiv = document.createElement('div');
        nameDiv.textContent = item.fullName;
        nameDiv.style.flex = '1.5';

        const descriptionDiv = document.createElement('div');
        descriptionDiv.textContent = item.description;
        descriptionDiv.style.flex = '2';

        const statusDiv = document.createElement('div');
        statusDiv.textContent = item.status_Display;
        statusDiv.style.flex = '1';

        // Append cells to row
        rowDiv.appendChild(issueDateDiv);
        rowDiv.appendChild(nameDiv);
        rowDiv.appendChild(descriptionDiv);
        rowDiv.appendChild(statusDiv);

        // Append row to list
        listElement.appendChild(rowDiv);
    }

};
const popup = async () => {
    let doorKariItems = await getDoorKari();
    showDoorKariItems(doorKariItems);
};
popup();