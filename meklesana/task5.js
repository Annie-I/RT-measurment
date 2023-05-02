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
                end_task();
                hide_image();
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
    state = 'completed';
    task_progress_text[0].innerHTML =
        'Visi meklēšanas uzdevumi ir pabeigti! Tūlīt Tev parādīsies iespēja vai nu izvēlēties nākamo uzdevumu komplektu vai arī beigt uzdevumu izpildi un doties uz dalībnieku aptaujas aizpildīšanu.';
    setTimeout(function () {
        window.location.href = '../index.html';
    }, 9500);
}
