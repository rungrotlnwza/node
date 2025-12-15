const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function closeSidebar() {
    if (sidebar) sidebar.classList.remove('show');
    if (overlay) overlay.classList.remove('show');
}

if (getCookie('token')) {
    document.getElementById('logout').classList.remove('d-none');
    document.getElementById('logout').classList.add('d-block');

    document.getElementById('login').classList.remove('d-block');
    document.getElementById('login').classList.add('d-none');

    document.getElementById('register').classList.remove('d-block');
    document.getElementById('register').classList.add('d-none');
} else {
    document.getElementById('logout').classList.remove('d-block');
    document.getElementById('logout').classList.add('d-none');

    document.getElementById('login').classList.remove('d-none');
    document.getElementById('login').classList.add('d-block');

    document.getElementById('register').classList.remove('d-none');
    document.getElementById('register').classList.add('d-block');

    document.getElementById('dropdown').classList.remove('d-block');
    document.getElementById('dropdown').classList.add('d-none');
}
function logout() {
    deleteCookie('token');
    deleteCookie('user');
    location.reload();
}

// Close sidebar/overlay helper
document.addEventListener('click', (e) => {
    const dismiss = e.target.closest(
        '[data-bs-dismiss="offcanvas"],[data-dismiss="offcanvas"],.offcanvas .btn-close'
    );
    if (dismiss) return closeSidebar();
});


const toggleBtn = document.getElementById('menu-toggle');
if (toggleBtn) {
    const newToggle = toggleBtn.cloneNode(true);
    toggleBtn.parentNode.replaceChild(newToggle, toggleBtn);

    newToggle.addEventListener('click', () => {
        if (sidebar) sidebar.classList.toggle('show');
        if (overlay) overlay.classList.toggle('show');
    });
}
async function updateCookieUser() {
    if (getCookie('token')) {
        if (!getCookie('user')) {

            await fetch('/api/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('token')}`
                }
            })
                .then(res => {
                    if (!res.ok) throw new Error('Unauthorized');
                    return res.json();
                })
                .then(data => {
                    // cookie ต้องเป็น string + encode
                    setCookie(
                        'user',
                        JSON.stringify(data),
                        1
                    );
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
}
updateCookieUser();