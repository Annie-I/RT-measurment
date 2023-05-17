const task_progress_text = document.getElementsByClassName('start_task_instruction');
const task_container = document.getElementsByClassName('to_hide');
const answers = document.getElementsByClassName('rotation_answer_container');

let state = 'start';
let stimulus = 0;
let reaction = 0;
let is_answer_correct = 0;

document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        switch (state) {
            case 'start':
                task_progress_text[0].style.display = 'none';
                show_answers();
                state = 'in_progress';
                break;
            case 'default':
                break;
        }
    }
    if (event.key === '1' || event.key === '2' || event.key === '3') {
        switch (state) {
            case 'in_progress':
                reaction = new Date().getTime();
                state = 'completed';
                task_progress_text[0].style.display = 'block';
                task_progress_text[0].innerHTML =
                    'Visi rotācijas uzdevumi ir pabeigti! Tūlīt Tev parādīsies iespēja vai nu izvēlēties nākamo uzdevumu komplektu vai arī beigt uzdevumu izpildi un doties uz dalībnieku aptaujas aizpildīšanu.';
                setTimeout(finish_task, 9500);
                if (event.key === '1') {
                    is_answer_correct = 1;
                }
                break;
            case 'default':
                break;
        }
    }
});

function show_answers() {
    task_container[0].style.visibility = 'visible';
    answers[0].style.visibility = 'visible';
    stimulus = new Date().getTime();
}

function finish_task() {
    localStorage.setItem(
        'rotation-4',
        JSON.stringify({
            stimulus,
            reaction,
            is_answer_correct,
            reaction_time_ms: reaction - stimulus,
        })
    );

    window.location.href = '../index.html';
}
