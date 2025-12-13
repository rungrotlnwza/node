document.body.classList.add('bg-dark', 'container-fluid', 'p-0')
// Load Bootstrap CSS and JS from CDN
loadCDN('css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css')
loadCDN('css', '/assets/css/style.css')
loadCDN('js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js')
loadCDN('css', 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css')

function updateAuthNavbar() {
    const token = getCookie('token');

    const els = {
        dashboard: document.getElementById('dashboard'),
        logout: document.getElementById('logout'),
        login: document.getElementById('login'),
        register: document.getElementById('register')
    };

    const show = el => el && el.classList.remove('d-none');
    const hide = el => el && el.classList.add('d-none');

    if (token) {
        show(els.dashboard);
        show(els.logout);
        hide(els.login);
        hide(els.register);
    } else {
        show(els.login);
        show(els.register);
        hide(els.dashboard);
        hide(els.logout);
    }
}



layout('layout-admin', 'admin.layout.html');
layout('layout-user', 'user.layout.html');
loadComponent('navbar', 'navbar.html');
loadComponent('footer', 'footer.html');
