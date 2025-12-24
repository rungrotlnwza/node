function logout() {
    deleteCookie('token');
    deleteCookie('user');
    location.reload();
}