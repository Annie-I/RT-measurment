const survey_button = document.getElementById('go_to_survey');
const reset_button = document.getElementById('reset_tasks');

const reaction_finished = localStorage.getItem('reaction-3');
const search_finished = localStorage.getItem('search-5');
const rotation_finished = localStorage.getItem('rotation-4');

if (reaction_finished || search_finished || rotation_finished) {
    document.getElementById('button_group').hidden = false;
}

if (reaction_finished) {
    document.getElementById('card-one').hidden = true;
}

if (rotation_finished) {
    document.getElementById('card-two').hidden = true;
}

if (search_finished) {
    document.getElementById('card-three').hidden = true;
}

reset_button.addEventListener('click', function () {
    if (window.confirm('Vai tiešām dzēst visus līdzšinējos rezultātus?')) {
        localStorage.clear();
        window.location.reload();
    }
});
