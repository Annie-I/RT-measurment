let number_placeholder = document.getElementById('rt_number');
let task_progress_text = document.getElementById('instruction3');

const colors = [
    'green',
    'deepskyblue',
    'sandybrown',
    'hotpink',
    'cadetblue',
    'darkviolet',
    'mediumvioletred',
    'midnightblue',
    'darkslateblue',
    'orangered',
    'crimson',
    'yellowgreen',
    'lightgreen',
    'lightseagreen',
];
const numbers = [3, 6, 2, 8, 5, 6, 0, 7, 1, 4, 9, 6];
const delays_ms = [900, 450, 700, 600, 1100, 500, 1200, 850, 1000, 630, 780, 1500];
const font_sizes = ['185px', '140px', '215px', '170px', '120px', '200px', '90px', '130px', '155px', '105px'];

let difficulty = 0;
let index = 0;
let state = 'start';
let mistakes = 0;
let missed = 0;

document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        console.log(state);
        switch (state) {
            case 'start':
                task_progress_text.innerHTML = 'Uzdevums sācies!';
                state = 'in_progress';
                show_number();
                break;
            case 'in_progress':
                if (numbers[index] === 6) {
                    if (difficulty === 3) {
                        state = 'completed';
                        task_progress_text.innerHTML = 'Uzdevums pabeigts! Tūlīt parādīsies nākamais uzdevums.';
                        break;
                    }
                    state = 'start';
                    task_progress_text.innerHTML = 'Spied atstarpes taustiņu, lai turpinātu.';
                    difficulty++;
                    index = difficulty * 2;
                } else {
                    mistakes++;
                    console.log(mistakes);
                }
                break;
            case 'completed':
                task_progress_text.innerHTML = 'Uzdevums pabeigts! Tūlīt parādīsies nākamais uzdevums.';
                break;
            case 'default':
                break;
        }
    }
});

function show_number() {
    if (state === 'start' || state === 'completed') {
        return;
    }
    number_placeholder.innerHTML = numbers[index];
    setTimeout(function () {
        if (index >= numbers.length - 1) {
            index = -1;
        }
        index++;
        show_number();
    }, delays_ms[index]);
}

// task_progress_text.innerHTML = 'Ļoti labi! Vēl palikušas 3 reizes. Spied atstarpes taustiņu, lai turpinātu.';
// task_progress_text.innerHTML = 'Lieliski! Palikušas vēl 2 reizes. Spied atstarpes taustiņu, lai turpinātu.';
// task_progress_text.innerHTML = 'Un vēl pēdējā reize. Tev lieliski izdodas! Spied atstarpes taustiņu, lai turpinātu.';
// task_progress_text.innerHTML = 'Uzdevums pabeigts! Tūlīt parādīsies nākamais uzdevums.';
