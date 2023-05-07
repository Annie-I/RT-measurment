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

console.log(db);

const gaming_exp = document.getElementById('active_gaming_questions');
const smoking = document.getElementById('if_smoking');

const form = document.getElementById('user_data');
form.addEventListener('submit', submit_form);

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
    console.log(new FormData(form));
}

function send_data() {
    let user_id;
    db.collection('users')
        .add({
            name: 'John',
            country: 'Japan',
        })
        .then((docRef) => {
            user_id = docRef.id;
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
        });

    db.collection('reaction_results')
        .add([
            {
                name: 'John',
                country: 'Japan',
            },
        ])
        .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
        });
}
