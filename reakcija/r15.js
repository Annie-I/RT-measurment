const circles = document.querySelectorAll('.rt_task1_circle');

const sequence = [1, 5, 2, 3, 4, 0];

const timing = [1200, 4205, 2520, 6661, 1188];

let state = 0;
//0 - not started,
//1 - started, 1st circle,
//2 - 2nd circle,
//3 - 3rd circle,
//4 - 4th circle,
//5 - 5th circle,
//6 - 6th circle

if (state === 0) {
    set_color(sequence[state]);
}

document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        switch (state) {
            case 0:
                state++;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                set_color(sequence[state]);
                remove_color(sequence[state - 1]);
                setTimeout(function () {
                    state++;
                }, timing[state - 1]);
        }
    }
});

function set_color(number) {
    circles[number].style.backgroundColor = 'rgb(253, 85, 73)';
}

function remove_color(number) {
    circles[number].removeAttribute('style');
}

// change_color(5);
