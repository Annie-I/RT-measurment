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
    send_data(new FormData(form));
}

function finish_survey() {
    form.style.display = 'none';
    document.getElementById('questionnaire_despription').hidden = true;
    document.getElementById('thank_you_text').hidden = false;
    document.getElementById('thank_you_button').style.display = 'block';
}

function send_data(formData) {
    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));

    if (
        !formDataObj.age ||
        !formDataObj.occupation ||
        !formDataObj.hobbies ||
        !formDataObj.vision_impairments ||
        !formDataObj.videogames ||
        !formDataObj.alcohol ||
        !formDataObj.smoking
    ) {
        alert('Lūdzu, aizpildi visus aptaujas laukus!');

        return;
    }

    formDataObj.window = { width: window.innerWidth, height: window.innerHeight };

    let user_id;
    db.collection('users')
        .add(formDataObj)
        .then((docRef) => {
            user_id = docRef.id;

            send_reaction_results(user_id);
            send_rotation_results(user_id);
            send_search_results(user_id);
            localStorage.clear();
            finish_survey();
        })
        .catch((error) => {
            // console.error('Error adding document: ', error);
        });
}

function send_reaction_results(user_id) {
    const reaction_intro = localStorage.getItem('reaction-intro');
    const reaction_one = localStorage.getItem('reaction-1');
    const reaction_two = localStorage.getItem('reaction-2');
    const reaction_three = localStorage.getItem('reaction-3');

    if (!reaction_intro || !reaction_one || !reaction_two || !reaction_three) {
        return;
    }

    let data = JSON.parse(reaction_intro);

    db.collection('reaction_results').add({
        user_id,
        task: 'intro',
        mistakes: data.mistakes,
        reaction: data.reaction,
        stimulus: data.stimulus,
        reacton_time_ms: data.reaction_time_ms,
    });

    data = JSON.parse(reaction_one);

    db.collection('reaction_results').add({
        user_id,
        task: 'first',
        // first result
        mistakes_1: data[0].mistakes,
        stimulus_1: data[0].stimulus,
        reaction_1: data[0].reaction,
        reacton_time_ms_1: data[0].reaction_time_ms,
        // second result
        mistakes_2: data[1].mistakes,
        stimulus_2: data[1].stimulus,
        reaction_2: data[1].reaction,
        reacton_time_ms_2: data[1].reaction_time_ms,
        // third result
        mistakes_3: data[2].mistakes,
        stimulus_3: data[2].stimulus,
        reaction_3: data[2].reaction,
        reacton_time_ms_3: data[2].reaction_time_ms,
        // fourth result
        mistakes_4: data[3].mistakes,
        stimulus_4: data[3].stimulus,
        reaction_4: data[3].reaction,
        reacton_time_ms_4: data[3].reaction_time_ms,
        // fifth result
        mistakes_5: data[4].mistakes,
        stimulus_5: data[4].stimulus,
        reaction_5: data[4].reaction,
        reacton_time_ms_5: data[4].reaction_time_ms,
    });

    data = JSON.parse(reaction_two);

    db.collection('reaction_results').add({
        user_id,
        task: 'second',
        // first result
        mistakes_1: data[0].mistakes,
        missed_1: data[0].missed,
        stimulus_1: data[0].stimulus,
        reaction_1: data[0].reaction,
        reacton_time_ms_1: data[0].reaction_time_ms,
        // second result
        mistakes_2: data[1].mistakes,
        missed_2: data[1].missed,
        stimulus_2: data[1].stimulus,
        reaction_2: data[1].reaction,
        reacton_time_ms_2: data[1].reaction_time_ms,
        // third result
        mistakes_3: data[2].mistakes,
        missed_3: data[2].missed,
        stimulus_3: data[2].stimulus,
        reaction_3: data[2].reaction,
        reacton_time_ms_3: data[2].reaction_time_ms,
        // fourth result
        mistakes_4: data[3].mistakes,
        missed_4: data[3].missed,
        stimulus_4: data[3].stimulus,
        reaction_4: data[3].reaction,
        reacton_time_ms_4: data[3].reaction_time_ms,
    });

    data = JSON.parse(reaction_three);

    db.collection('reaction_results').add({
        user_id,
        task: 'third',
        // first result
        mistakes_1: data[0].mistakes,
        stimulus_1: data[0].stimulus,
        reaction_1: data[0].reaction,
        reacton_time_ms_1: data[0].reaction_time_ms,
        // second result
        mistakes_2: data[1].mistakes,
        stimulus_2: data[1].stimulus,
        reaction_2: data[1].reaction,
        reacton_time_ms_2: data[1].reaction_time_ms,
        // third result
        mistakes_3: data[2].mistakes,
        stimulus_3: data[2].stimulus,
        reaction_3: data[2].reaction,
        reacton_time_ms_3: data[2].reaction_time_ms,
        // fourth result
        mistakes_4: data[3].mistakes,
        stimulus_4: data[3].stimulus,
        reaction_4: data[3].reaction,
        reacton_time_ms_4: data[3].reaction_time_ms,
        // fifth result
        mistakes_5: data[4].mistakes,
        stimulus_5: data[4].stimulus,
        reaction_5: data[4].reaction,
        reacton_time_ms_5: data[4].reaction_time_ms,
        // sixth result
        mistakes_6: data[5].mistakes,
        stimulus_6: data[5].stimulus,
        reaction_6: data[5].reaction,
        reacton_time_ms_6: data[5].reaction_time_ms,
        // seventh result
        mistakes_7: data[6].mistakes,
        stimulus_7: data[6].stimulus,
        reaction_7: data[6].reaction,
        reacton_time_ms_7: data[6].reaction_time_ms,
        // eighth result
        mistakes_8: data[7].mistakes,
        stimulus_8: data[7].stimulus,
        reaction_8: data[7].reaction,
        reacton_time_ms_8: data[7].reaction_time_ms,
    });
}

function send_rotation_results(user_id) {
    const rotation_intro = localStorage.getItem('rotation-intro');
    const rotation_one = localStorage.getItem('rotation-1');
    const rotation_two = localStorage.getItem('rotation-2');
    const rotation_three = localStorage.getItem('rotation-3');
    const rotation_fourth = localStorage.getItem('rotation-4');

    if (!rotation_intro || !rotation_one || !rotation_two || !rotation_three || !rotation_fourth) {
        return;
    }

    let data = JSON.parse(rotation_intro);

    db.collection('rotation_results').add({
        user_id,
        task: 'intro',

        mistakes: data.is_answer_correct ? 0 : 1,
        stimulus: data.stimulus,
        reaction: data.reaction,
        reacton_time_ms: data.reaction_time_ms,
    });

    data = JSON.parse(rotation_one);

    db.collection('rotation_results').add({
        user_id,
        task: 'first',
        mistakes: data.is_answer_correct ? 0 : 1,
        stimulus: data.stimulus,
        reaction: data.reaction,
        reacton_time_ms: data.reaction_time_ms,
    });

    data = JSON.parse(rotation_two);

    db.collection('rotation_results').add({
        user_id,
        task: 'second',
        mistakes: data.is_answer_correct ? 0 : 1,
        stimulus: data.stimulus,
        reaction: data.reaction,
        reacton_time_ms: data.reaction_time_ms,
    });

    data = JSON.parse(rotation_three);

    db.collection('rotation_results').add({
        user_id,
        task: 'third',
        mistakes: data.is_answer_correct ? 0 : 1,
        stimulus: data.stimulus,
        reaction: data.reaction,
        reacton_time_ms: data.reaction_time_ms,
    });

    data = JSON.parse(rotation_fourth);

    db.collection('rotation_results').add({
        user_id,
        task: 'fourth',
        mistakes: data.is_answer_correct ? 0 : 1,
        stimulus: data.stimulus,
        reaction: data.reaction,
        reacton_time_ms: data.reaction_time_ms,
    });
}

function send_search_results(user_id) {
    const search_intro = localStorage.getItem('search-intro');
    const search_one = localStorage.getItem('search-1');
    const search_two = localStorage.getItem('search-2');
    const search_three = localStorage.getItem('search-3');
    const search_fourth = localStorage.getItem('search-4');
    const search_fifth = localStorage.getItem('search-5');

    if (!search_intro || !search_one || !search_two || !search_three || !search_fourth || !search_fifth) {
        return;
    }

    let data = JSON.parse(search_intro);

    db.collection('search_results').add({
        user_id,
        task: 'intro',
        stimulus: data.stimulus,
        reaction: data.reaction,
        reacton_time_ms: data.reaction_time_ms,
    });

    data = JSON.parse(search_one);

    db.collection('search_results').add({
        user_id,
        task: 'first',
        stimulus: data.stimulus,
        reaction: data.reaction,
        reacton_time_ms: data.reaction_time_ms,
    });

    data = JSON.parse(search_two);

    db.collection('search_results').add({
        user_id,
        task: 'second',
        stimulus: data.stimulus,
        reaction: data.reaction,
        reacton_time_ms: data.reaction_time_ms,
    });

    data = JSON.parse(search_three);

    db.collection('search_results').add({
        user_id,
        task: 'third',
        stimulus: data.stimulus,
        reaction: data.reaction,
        reacton_time_ms: data.reaction_time_ms,
    });

    data = JSON.parse(search_fourth);

    db.collection('search_results').add({
        user_id,
        task: 'fourth',
        stimulus: data.stimulus,
        reaction: data.reaction,
        reacton_time_ms: data.reaction_time_ms,
    });

    data = JSON.parse(search_fifth);

    db.collection('search_results').add({
        user_id,
        task: 'fifth',
        stimulus: data.stimulus,
        reaction: data.reaction,
        reacton_time_ms: data.reaction_time_ms,
    });
}
