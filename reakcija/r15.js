const circles = document.querySelectorAll('.rt_task1_circle');
let start_task_instruction = document.getElementById('instruction2');

const sequence = [1, 5, 2, 3, 4, 0];

const ms_timings = [1200, 4205, 2520, 6661, 1188];

let reaction = [];
let stimulus = [];

let state = 'start';
let sequence_index = 0;
let mistakes = 0;

set_color(sequence[sequence_index]);

document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        switch (state) {
            case 'start':
                start_task_instruction.innerHTML = 'Uzdevums sācies!';
                start_task();
                break;
            case 'in_progress':
                mistakes++;
                console.log(mistakes);
            case 'relocated':
                const reaction_time = new Date().getTime();
                reaction.push(reaction_time);
                if (sequence_index <= 5) {
                    start_task();
                } else {
                    state = 'completed';
                    start_task_instruction.innerHTML = 'Uzdevums pabeigts! Tūlīt parādīsies nākamais uzdevums.';
                    setTimeout(function () {
                        //window.location.href = '../index.html';
                    }, 3500);
                }
            case 'completed':
                break;
        }
    }
});

function start_task() {
    state = 'in_progress';
    setTimeout(move_circle, ms_timings[sequence_index]);
}

function move_circle() {
    remove_color(sequence[sequence_index]);
    sequence_index++;
    set_color(sequence[sequence_index]);

    const stimulus_time = new Date().getTime();
    stimulus.push(stimulus_time);
    state = 'relocated';
}

function set_color(number) {
    circles[number].style.backgroundColor = 'rgb(253, 85, 73)';
}

function remove_color(number) {
    circles[number].removeAttribute('style');
}

// switch (state) {
//     case 0:
//         state++;
//         console.log(state);
//     case 1:
//         console.log(state);
//         in_progress = 1;
//         setTimeout(function () {
//             set_color(sequence[state]);
//             remove_color(sequence[state - 1]);
//             in_progress = 0;
//             state++;
//         }, timing[state - 1]);
//         if (in_progress === 1) {
//             mistakes++;
//             console.log('mistakes', mistakes);
//         }
//     case 2:
//     case 3:
//     case 4:
//     case 5:
//     case 6:
//     // set_color(sequence[state]);
//     // remove_color(sequence[state - 1]);
//     // setTimeout(function () {
//     //     state++;
//     // }, timing[state - 1]);
// }
//}
