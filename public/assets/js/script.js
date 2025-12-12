document.body.classList.add('bg-dark', 'container-fluid', 'p-0')
// Cookie utility functions
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function decodeCookie(name) {
    try {
        if (!name) return null;
        // If caller passed a cookie name (like 'token'), resolve it first
        let token = name;
        if (token.indexOf('.') === -1) {
            token = getCookie(name);
        }
        if (!token) return null;

        const parts = token.split('.');
        const base64Url = parts[1];
        if (!base64Url) return null;

        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}
function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

function loadCDN(type, url) {
    return new Promise((resolve, reject) => {
        // ตรวจสอบว่าโหลดแล้วหรือยัง
        if (type === 'css') {
            // ตรวจสอบว่า CSS โหลดแล้วหรือยัง
            if (document.querySelector(`link[href="${url}"]`)) {
                console.log(`CSS already loaded: ${url}`);
                return resolve();
            }
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = () => {
                resolve();
            };
            link.onerror = () => {
                console.error(`Failed to load CSS: ${url}`);
                reject(new Error(`Failed to load CSS: ${url}`));
            };
            document.head.appendChild(link);
        } else if (type === 'js') {
            // ตรวจสอบว่า JS โหลดแล้วหรือยัง
            if (document.querySelector(`script[src="${url}"]`)) {
                console.log(`Script already loaded: ${url}`);
                return resolve();
            }
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
                resolve();
            };
            script.onerror = () => {
                console.error(`Failed to load script: ${url}`);
                reject(new Error(`Failed to load script: ${url}`));
            };
            document.body.appendChild(script);
        } else {
            reject(new Error(`Unsupported type: ${type}. Use 'css' or 'js'`));
        }
    });
}
// Load Bootstrap CSS and JS from CDN
loadCDN('css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css')
loadCDN('css', '/assets/css/style.css')
loadCDN('js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js')
loadCDN('css', 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css')
{/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"></link> */ }
async function loadComponent(id, filename) {
    const el = document.getElementById(id);
    if (!el) {
        console.log(`Element with id '${id}' not found`);
        return;
    }
    // ถ้ามีเนื้อหาอยู่แล้ว ให้ข้ามการโหลด (ป้องกันโหลดซ้ำ)
    if (el.innerHTML && el.innerHTML.trim().length > 0) {
        return;
    }
    try {
        const res = await fetch(`/assets/components/${filename}`);
        const html = await res.text();
        el.innerHTML = html;
        // ...existing code...
    } catch (err) {
        console.error(`Failed to load component '${filename}':`, err);
    }
}
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


// Load components when placeholders exist
async function ensureComponents() {
    try {
        if (document.getElementById('navbar')) {
            await loadComponent('navbar', 'navbar.html');
            updateAuthNavbar();
        }
    } catch (e) {
        console.error('Failed to load navbar:', e);
    }

    try {
        if (document.getElementById('footer')) {
            await loadComponent('footer', 'footer.html');
        }
    } catch (e) {
        console.error('Failed to load footer:', e);
    }
}

// Close sidebar/overlay helper
function closeSidebar() {
    try {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        if (sidebar) sidebar.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
    } catch (e) {
        console.error('closeSidebar error:', e);
    }
}

// Initialize layout behavior: attach toggle, overlay click, escape key, and dismiss handlers
function initLayoutBehavior() {
    try {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        // Attach/refresh toggle button listener
        const toggleBtn = document.getElementById('menu-toggle');
        if (toggleBtn) {
            const newToggle = toggleBtn.cloneNode(true);
            toggleBtn.parentNode.replaceChild(newToggle, toggleBtn);
            newToggle.addEventListener('click', () => {
                if (sidebar) sidebar.classList.toggle('show');
                if (overlay) overlay.classList.toggle('show');
            });
        }

        // Attach/refresh overlay click listener
        if (overlay) {
            const newOverlay = overlay.cloneNode(true);
            overlay.parentNode.replaceChild(newOverlay, overlay);
            newOverlay.addEventListener('click', () => {
                closeSidebar();
            });
        }

        // Global handlers (only once)
        if (!window.__layoutBehaviorInitialized) {
            // click on dismiss elements inside offcanvas/sidebar
            document.addEventListener('click', (e) => {
                try {
                    // dismiss attributes/buttons inside offcanvas
                    const dismiss = e.target.closest('[data-bs-dismiss="offcanvas"],[data-dismiss="offcanvas"],.offcanvas .btn-close');
                    if (dismiss) return closeSidebar();

                    // Overlay click (robust: handles if overlay node was replaced later)
                    const overlayClicked = e.target.closest && e.target.closest('#overlay, .overlay');
                    if (overlayClicked) return closeSidebar();
                } catch (err) {
                    // ignore
                }
            });

            // Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeSidebar();
            });

            window.__layoutBehaviorInitialized = true;
        }
    } catch (e) {
        console.error('initLayoutBehavior error:', e);
    }
}

// Safely update `#time` if present on the page
const _timeEl = document.getElementById('time');
if (_timeEl) {
    _timeEl.innerText = new Date().toLocaleString();
}


async function layout(containerId, layoutName) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container '${containerId}' not found`);
        return;
    }

    try {
        // เก็บเนื้อหาเดิม
        const contentHtml = container.innerHTML;

        // โหลด layout
        // support passing with or without .html
        const fileName = layoutName.endsWith('.html') ? layoutName : `${layoutName}.html`;
        const res = await fetch(`/assets/layout/${fileName}`);
        let layoutHtml = await res.text();

        // แทนที่ <slot></slot> ด้วย content เดิม (ยืดหยุ่นกับ whitespace/attributes)
        layoutHtml = layoutHtml.replace(/<slot\b[^>]*>\s*<\/slot>/i, contentHtml);

        // แสดง layout + content
        container.innerHTML = layoutHtml;

        // Execute any scripts that came with the injected layout (external or inline)
        (function processInjectedScripts(root) {
            try {
                const scripts = Array.from(root.querySelectorAll('script'));
                scripts.forEach(s => {
                    const newScript = document.createElement('script');
                    // copy type if present
                    if (s.type) newScript.type = s.type;
                    if (s.src) {
                        // avoid loading same src twice
                        if (document.querySelector(`script[src="${s.src}"]`)) return;
                        newScript.src = s.src;
                    } else {
                        newScript.textContent = s.textContent;
                    }
                    document.body.appendChild(newScript);
                    // remove original to avoid duplication
                    s.parentNode && s.parentNode.removeChild(s);
                });
            } catch (e) {
                console.error('Failed to process injected scripts:', e);
            }
        })(container);

        // Initialize layout interactivity (menu toggle / overlay)
        initLayoutBehavior();
        // ถ้ามี placeholder สำหรับ navbar/footer ให้โหลด component เหล่านั้น
        try {
            if (document.getElementById('navbar')) {
                await loadComponent('navbar', 'navbar.html');
                // update auth links if navbar was loaded inside layout
                updateAuthNavbar();
            }
        } catch (e) {
            console.error('Failed to load navbar into layout:', e);
        }

        try {
            if (document.getElementById('footer')) {
                await loadComponent('footer', 'footer.html');
            }
        } catch (e) {
            console.error('Failed to load footer into layout:', e);
        }
    } catch (err) {
        console.error(`Failed to load layout '${layoutName}':`, err);
    }
}

// เรียกใช้ เมื่อ DOM พร้อม
function runWhenReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

runWhenReady(() => {
    // For pages that already have navbar/footer placeholders (like index.html)
    ensureComponents();
    // If this page uses a layout container, inject layout
    // Support multiple container ids: #app, #layout-admin, or an element with data-layout-container
    const containerEl = document.querySelector('#app, #layout-admin, [data-layout-container]');
    if (containerEl) {
        const containerId = containerEl.id || containerEl.getAttribute('data-layout-container');
        if (containerId) {
            layout(containerId, 'admin.layout.html');
        } else {
            // If the element has no id, inject layout into it directly
            (async () => {
                const contentHtml = containerEl.innerHTML;
                const fileName = 'admin.layout.html';
                try {
                    const res = await fetch(`/assets/layout/${fileName}`);
                    let layoutHtml = await res.text();
                    layoutHtml = layoutHtml.replace(/<slot\b[^>]*>\s*<\/slot>/i, contentHtml);
                    containerEl.innerHTML = layoutHtml;

                    // Execute any scripts that came with the injected layout
                    (function processInjectedScripts(root) {
                        try {
                            const scripts = Array.from(root.querySelectorAll('script'));
                            scripts.forEach(s => {
                                const newScript = document.createElement('script');
                                if (s.type) newScript.type = s.type;
                                if (s.src) {
                                    if (document.querySelector(`script[src="${s.src}"]`)) return;
                                    newScript.src = s.src;
                                } else {
                                    newScript.textContent = s.textContent;
                                }
                                document.body.appendChild(newScript);
                                s.parentNode && s.parentNode.removeChild(s);
                            });
                        } catch (e) {
                            console.error('Failed to process injected scripts:', e);
                        }
                    })(containerEl);

                    // Initialize layout interactivity (menu toggle / overlay)
                    initLayoutBehavior();

                    await ensureComponents();
                } catch (e) {
                    console.error('Failed to inject layout into container element:', e);
                }
            })();
        }
    }
});