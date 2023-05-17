const task_progress_text = document.getElementsByClassName('start_task_instruction');
const task_image = document.getElementsByClassName('s_intro_task_img');

let state = 'start';
let reaction = 0;
let stimulus = 0;

document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        switch (state) {
            case 'start':
                task_progress_text[0].innerHTML = 'Uzdevums sācies!';
                state = 'in_progress';
                show_image();
                break;
            case 'in_progress':
                hide_image();
                end_task();
                break;
            case 'default':
                break;
        }
    }
});

function show_image() {
    task_image[0].style.visibility = 'visible';
    stimulus = new Date().getTime();
}

function hide_image() {
    task_image[0].style.visibility = 'hidden';
    reaction = new Date().getTime();
}

function end_task() {
    localStorage.setItem(
        'search-1',
        JSON.stringify({
            stimulus,
            reaction,
            reaction_time_ms: reaction - stimulus,
        })
    );

    state = 'completed';
    task_progress_text[0].innerHTML = 'Uzdevums pabeigts! Tūlīt parādīsies nākamais uzdevums.';
    setTimeout(function () {
        window.location.href = './s2.html';
    }, 3500);
}
