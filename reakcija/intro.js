let circle = document.getElementById('reaction_intro_circle');
let start_task_instruction = document.getElementById('start_task_instruction');
let in_progress = 0;
let color_change = 0;
let finish = 0;
const ms = 3200;

document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        if (!in_progress) {
            in_progress = 1;
            start = new Date().getTime();
            console.log('start', start);
            setTimeout(change_color, ms);
            start_task_instruction.innerHTML = 'Uzdevums sācies!';
        } else if (in_progress && !finish) {
            finish = new Date().getTime();
            console.log('finish', finish);
            setTimeout(function () {
                window.location.href = '../index.html';
            }, 2500);
            start_task_instruction.innerHTML = 'Uzdevums pabeigts! Tūlīt parādīsies nākamā uzdevuma apraksts.';
            // šeit var parātīt arī to, cik ātrs bija reakcijas laiks, ja tas tiks uzskatīts par vajadzīgu.
        }
    }
});

function change_color() {
    circle.style.backgroundColor = 'rgb(14, 119, 96)';
    color_change = new Date().getTime();
    console.log(start - color_change);
}
