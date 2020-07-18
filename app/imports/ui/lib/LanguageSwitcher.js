export default languageSwitcher = () => {
    let language = 'de-DE';
    if (localStorage.getItem('vapp-language')) {
        language = localStorage.getItem('vapp-language');
    }

    return language;
}