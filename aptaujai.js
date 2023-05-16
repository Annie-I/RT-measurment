const firebaseConfig = {
    apiKey: 'AIzaSyAWx10zY5IOM_1q5azTc2FMqLF9ZRYzeBw',
    authDomain: 'reaction-time-research.firebaseapp.com',
    projectId: 'reaction-time-research',
    storageBucket: 'reaction-time-research.appspot.com',
    messagingSenderId: '1096547623373',
    appId: '1:1096547623373:web:396890b449f1d0708fe484',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const gaming_exp = document.getElementById('active_gaming_questions');
const smoking = document.getElementById('if_smoking');
const checkbox = document.getElementById('agreement');
const submit_button = document.getElementById('form_submit_button');
const form = document.getElementById('user_data');

form.addEventListener('submit', submit_form);
checkbox.addEventListener('change', function () {
    submit_button.disabled = !this.checked;
});

function show_gaming_questions() {
    gaming_exp.style.display = 'block';
}

function hide_gaming_questions() {
    gaming_exp.style.display = 'none';
}

function show_smoking_question() {
    smoking.style.display = 'block';
}

function hide_smoking_question() {
    smoking.style.display = 'none';
}

function submit_form(event) {
    event.preventDefault();
    // form.style.display = 'none';
    // document.getElementById('questionnaire_despription').hidden = true;
    // document.getElementById('thank_you_text').hidden = false;
    send_data(new FormData(form));
}

function send_data(formData) {
    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));

    formDataObj.window = { width: window.innerWidth, height: window.innerHeight };

    let user_id;
    db.collection('users')
        .add(formDataObj)
        .then((docRef) => {
            console.log('success');
            console.log(docRef);
            user_id = docRef.id;
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
        });
}
