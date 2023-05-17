let circle = document.getElementById('reaction_intro_circle');
let start_task_instruction = document.getElementById('instruction1');
let state = 0; //0 - not started, 1 started but color not changed, 2 color is changed, waiting reaction
let color_change = 0;
let mistakes = 0;
let finish = 0;

document.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        if (!state) {
            state = 1;
            setTimeout(change_color, 5100);
            start_task_instruction.innerHTML = 'Uzdevums sācies!';
        } else if (state === 1) {
            mistakes++;
        } else if (state === 2 && !finish) {
            finish = new Date().getTime();
            setTimeout(finish_task, 3500);
            start_task_instruction.innerHTML = 'Uzdevums pabeigts! Tūlīt parādīsies nākamais uzdevums.';
            // šeit var parātīt arī to, cik ātrs bija reakcijas laiks, ja tas tiks uzskatīts par vajadzīgu.
        }
    }
});

function change_color() {
    circle.style.backgroundColor = 'rgb(14, 119, 96)';
    state = 2;
    color_change = new Date().getTime();
}

function finish_task() {
    localStorage.setItem(
        'reaction-intro',
        JSON.stringify({
            stimulus: color_change,
            reaction: finish,
            reaction_time_ms: finish - color_change,
            mistakes,
        })
    );

    window.location.href = './r15.html';
}
