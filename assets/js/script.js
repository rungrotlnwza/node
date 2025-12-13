if(getCookie('token')){
    document.getElementById('logout').classList.remove('d-none');
    document.getElementById('logout').classList.add('d-block');

    document.getElementById('login').classList.remove('d-block');
    document.getElementById('login').classList.add('d-none');

    document.getElementById('register').classList.remove('d-block');
    document.getElementById('register').classList.add('d-none');
}else{
    document.getElementById('logout').classList.remove('d-block');
    document.getElementById('logout').classList.add('d-none');

    document.getElementById('login').classList.remove('d-none');
    document.getElementById('login').classList.add('d-block');

    document.getElementById('register').classList.remove('d-none');
    document.getElementById('register').classList.add('d-block');

    document.getElementById('dropdown').classList.remove('d-block');
    document.getElementById('dropdown').classList.add('d-none');
}
console.log('hello0s')