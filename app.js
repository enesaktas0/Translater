const formLang = document.getElementById('form-lang');
const toLang = document.getElementById('to-lang');

const toLangArea = document.querySelector('.to-lang');
const fromText = document.querySelector('.form-lang');
const translate = document.querySelector('.btn');

const exchangeIcon = document.querySelector('.fa-arrow-right-arrow-left');

const icons = document.querySelectorAll('.icon');

for(let lang in languages){
    let option = `
        <option value="${lang}">${languages[lang]}</option>
    `
    formLang.innerHTML += option;
    toLang.innerHTML += option;

    formLang.value = 'tr-TR';
    toLang.value = 'en-GB';
};



translate.addEventListener('click',() => {
    let text = fromText.value;
    let from = formLang.value;
    let to = toLang.value;

    let website = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;


    fetch(website)
        .then(response => response.json())
        .then((reponse) => {
            toLangArea.value = reponse.responseData.translatedText;
        })
        .catch(error => console.log('error', error));
})

exchangeIcon.addEventListener('click' , () => {
    fromText.value = toLangArea.value;
    toLangArea.value = '';
    let selection = formLang.value;
    formLang.value = toLang.value;
    toLang.value = selection;
    translate.click();

});

for(let icon of icons){
    icon.addEventListener('click' , (e) => {
        if(e.target.classList == 'fa-regular fa-copy'){
            if(e.target.parentElement.parentElement.classList == 'left'){
                navigator.clipboard.writeText(fromText.value);
            }
            else{
                navigator.clipboard.writeText(toLangArea.value);
            }
        }else if(e.target.classList == 'fa-solid fa-volume-up'){
            let utterance;
            if(e.target.parentElement.parentElement.classList == 'left'){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = formLang.value;
            }
            else{
                utterance = new SpeechSynthesisUtterance(toLangArea.value);
                utterance.lang = toLang.value;
            }
            speechSynthesis.speak(utterance);
        }
    })
}

