const button = document.getElementById('go_to_survey');

const reaction_finished = localStorage.getItem('reaction-3');
const search_finished = localStorage.getItem('search-5');
const rotation_finished = localStorage.getItem('rotation-4');

if (reaction_finished || search_finished || rotation_finished) {
    button.hidden = false;
}
