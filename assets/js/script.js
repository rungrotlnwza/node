console.log('script.js loaded');
function logout() {
    deleteCookie('token');
    deleteCookie('user');
    location.reload();
}