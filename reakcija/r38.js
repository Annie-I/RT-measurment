const task_progress_text = document.getElementById('instruction4');
const shapes = document.querySelectorAll('.rt_3rd_task_shape');

const delays_ms = [2300, 5000, 950, 3700, 1800, 500, 850, 5000];
const shape_sequence = [0, 6, 4, 3, 1, 7, 5, 2];

let state = 'start';
let shape_counter = 0;
let mistakes = new Array(shape_sequence.length).fill(0);

let reaction = [];
let stimulus = [];

let stimulus_time = 0;

document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        switch (state) {
            case 'start':
                task_progress_text.innerHTML = 'Uzdevums sācies!';
                state = 'in_progress';
                show_shape();
                break;
            case 'in_progress':
                if (!stimulus_time) {
                    mistakes[shape_counter]++;
                } else {
                    hide_shape();
                    reaction.push(new Date().getTime());
                    set_state();
                }
                break;
            case 'default':
                break;
        }
    }
});

function show_shape() {
    setTimeout(function () {
        shapes[shape_sequence[shape_counter]].style.visibility = 'visible';
        stimulus_time = new Date().getTime();
        stimulus.push(stimulus_time);
        shape_counter++;
    }, delays_ms[shape_counter]);
}

function hide_shape() {
    shapes[shape_sequence[shape_counter - 1]].style.visibility = 'hidden';
}

function set_state() {
    if (shape_counter < 8) {
        stimulus_time = 0;
        show_shape();
    } else {
        state = 'completed';
        task_ended();
    }
}

function task_ended() {
    const results = [];

    mistakes.forEach((mistake, index) => {
        results.push({
            mistake,
            reaction: reaction[index],
            stimulus: stimulus[index],
            reaction_time_ms: reaction[index] - stimulus[index],
        });
    });

    localStorage.setItem('reaction-3', JSON.stringify(results));

    task_progress_text.innerHTML =
        'Visi reakcijas uzdevumi ir pabeigti! Tūlīt Tev parādīsies iespēja vai nu izvēlēties nākamo uzdevumu komplektu vai arī beigt uzdevumu izpildi un doties uz dalībnieku aptaujas aizpildīšanu.';
    setTimeout(function () {
        window.location.href = '../index.html';
    }, 9500);
}
