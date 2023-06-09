const survey_button = document.getElementById('go_to_survey');
const reset_button = document.getElementById('reset_tasks');

const reaction_finished = localStorage.getItem('reaction-3');
const search_finished = localStorage.getItem('search-5');
const rotation_finished = localStorage.getItem('rotation-4');

if (reaction_finished || search_finished || rotation_finished) {
    document.getElementById('button_group').hidden = false;
}

if (reaction_finished) {
    document.getElementById('card-one').style.display = 'none';
}

if (rotation_finished) {
    document.getElementById('card-two').style.display = 'none';
}

if (search_finished) {
    document.getElementById('card-three').style.display = 'none';
}

reset_button.addEventListener('click', function () {
    if (
        window.confirm(
            'Vai tiešām vēlies nodzēst visus izpildīto uzdevumu rezultātus un sākt uzdevumu izpildi no jauna? Nodzēstos rezultātus nebūs iespējams atgūt.'
        )
    ) {
        localStorage.clear();
        window.location.reload();
    }
});
