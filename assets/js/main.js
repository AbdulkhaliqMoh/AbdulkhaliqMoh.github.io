function formatTime(date) {
    return date.toTimeString().split(' ')[0];
}
  
async function fetchClientIP() {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    if (!ipResponse.ok) {
    throw new Error(`HTTP error! status: ${ipResponse.status}`);
    }
    return await ipResponse.json();
}

async function setLastLogin() {
    try {
    const ipData = await fetchClientIP();

    const now = new Date();
    const loginDate = now.toDateString();
    const loginTime = formatTime(now);

    const lastLogin = `Last login: ${loginDate} ${loginTime} from ${ipData.ip}`;
    document.getElementById('last-login').textContent = lastLogin;
    } catch (error) {
    console.error('Failed to set last login:', error);
    }
}

function setDeveloperInfoDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const dateFormatted = `${year}.${month}.${day}`;

    const developerInfo = `Developer information as of ${dateFormatted}`;
    document.getElementById('dev-info-date').textContent = developerInfo;
}

document.addEventListener('DOMContentLoaded', (event) => {
    setDeveloperInfoDate();
    setLastLogin();
});
