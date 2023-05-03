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
const numbers = [3, 2, 7, 0, 5, 8, 6, 1, 4, 9, 5, 7, 8, 9, 6];
const delays_ms = [800, 500, 700, 400, 900, 700, 600, 1000, 450, 750, 620, 1000, 1100, 550, 500];
const font_sizes = ['185px', '140px', '215px', '170px', '120px', '200px', '90px', '130px', '155px', '105px'];

let difficulty = 0;
let number_and_delay_index = 0;
let number_counter = 0;
let color_index = 0;
let font_size_index = 0;
let state = 'start';
let mistakes = 0;
let missed = 0;
let stimulus_time = 0;
let reaction_time = 0;

let reaction = [];
let stimulus = [];

document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        switch (state) {
            case 'start':
                task_progress_text.innerHTML = 'Uzdevums sācies!';
                state = 'in_progress';
                show_number();
                break;
            case 'in_progress':
                reaction_time = new Date().getTime();
                if (numbers[number_and_delay_index] === 6) {
                    number_placeholder.innerHTML = '';
                    document.getElementById('rt_2nd_task').style.backgroundImage = 'none';

                    stimulus.push(stimulus_time);
                    reaction.push(reaction_time);

                    set_task_progress_text();
                    if (difficulty === 3) {
                        state = 'completed';
                        setTimeout(function () {
                            window.location.href = './r38.html';
                        }, 3500);
                        break;
                    }
                    state = 'start';
                    difficulty++;
                    number_and_delay_index = difficulty * 3;
                    modify_numbers_array();
                } else {
                    mistakes++;
                }
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

    set_missed();

    set_style();

    set_timestamp(number_and_delay_index);

    number_placeholder.innerHTML = numbers[number_and_delay_index];

    setTimeout(function () {
        const is_last_item_in_array = number_and_delay_index >= numbers.length - 1;
        if (is_last_item_in_array) {
            number_and_delay_index = 0;
        } else {
            number_and_delay_index++;
        }
        show_number();
    }, delays_ms[number_and_delay_index]);
}

function set_missed() {
    if (number_placeholder.innerHTML === '6') {
        missed++;
    }
}

function set_timestamp(index) {
    if (numbers[index] === 6) {
        stimulus_time = new Date().getTime();
    }
}

function set_style() {
    if (difficulty === 0) {
        number_placeholder.style.fontSize = font_sizes[0];
        number_placeholder.style.color = colors[color_index + 5];
    } else if (difficulty === 1) {
        change_color();
    } else if (difficulty === 2) {
        change_color();
        change_font_size();
    } else if (difficulty === 3) {
        document.getElementById('rt_2nd_task').style.backgroundImage = "url('dotted_bg.png')";
        change_color();
        change_font_size();
    }
}

function change_color() {
    number_placeholder.style.color = colors[color_index];
    if (color_index >= colors.length - 1) {
        color_index = 0;
    } else {
        color_index++;
    }
}

function change_font_size() {
    number_placeholder.style.fontSize = font_sizes[font_size_index];
    if (font_size_index >= font_sizes.length - 1) {
        font_size_index = 0;
    } else {
        font_size_index++;
    }
}

function modify_numbers_array() {
    if (difficulty === 1) {
        numbers.splice(4, 2, 4, 2);
    }
    if (difficulty === 2) {
        numbers.splice(6, 1, 3);
    }
}

function set_task_progress_text() {
    if (difficulty === 0) {
        task_progress_text.innerHTML = 'Ļoti labi! Vēl palikušas 3 reizes. Spied atstarpes taustiņu, lai turpinātu.';
    } else if (difficulty === 1) {
        task_progress_text.innerHTML = 'Izcili! Vēl 2 reizes. Spied atstarpes taustiņu, lai turpinātu.';
    } else if (difficulty === 2) {
        task_progress_text.innerHTML = 'Un vēl pēdējā reize. Spied atstarpes taustiņu, lai turpinātu.';
    } else if (difficulty === 3) {
        task_progress_text.innerHTML = 'Uzdevums pabeigts! Tūlīt parādīsies nākamais uzdevums.';
    }
}
