const container = document.querySelector(".container");
const form = document.querySelector(".div-inputs");
const input = document.querySelector(".input");
const addButton = document.querySelector(".add");
const content = document.querySelector(".div-content");
const list = document.querySelector(".list");
const remove = document.querySelector(".remover");
const btn = document.querySelector('.button');
const randBtn = document.querySelector('.random');
const tasks = [];
const padrao = ['var(--primary)', 'var(--secondary)'];
const p2 = ['rgb(112, 16, 16)', 'rgb(25, 29, 145)'];
const p3 = ['#F51720', '#F8D210'];
const p4 = ['#122620', '#F4EBD0'];
const p5 = ['#211522', '#613659'];
const p6 = ['#3CACAE', '#C8F4F9'];
const p7 = ['#07040A', '#AB0552'];
const p8 = ['#52584D', '#9AB19A'];
const p9 = ['#3B707D', '#FFB85D'];

const timer = setInterval(() => {
    changeColors(randomizer(), true);
    //console.log('executado');
}, 500);

input.addEventListener('keypress', (e) => {
    if (e.key === "Enter") addTask(input.value);
    if (input.value.length >= 40) {
        input.value = input.value.slice(0, -1);
        alert('A tarefa não pode conter mais do que 40 caracteres :)')
    }
})

function addTask(task = '') {
    if (task === '') return;
    list.innerHTML += `<li>${task}<br> <button class="remover">Apagar Task</button> </li>`;
    input.value = "";
    input.focus();
    salvarTarefas();
}

addButton.addEventListener('click', (evento) => {
    evento.preventDefault();
    addTask(input.value);
})

document.addEventListener('click', (e) => {
    e.preventDefault();
    const t = e.target;
    if (t.classList.contains('remover')) {
        t.parentElement.remove();
        salvarTarefas();
    }
    if (t.classList.contains('padrao')) return changeColors(padrao);
    if (t.classList.contains('p2')) return changeColors(p2);
    if (t.classList.contains('p3')) return changeColors(p3);
    if (t.classList.contains('p4')) return changeColors(p4);
    if (t.classList.contains('p5')) return changeColors(p5);
    if (t.classList.contains('p6')) return changeColors(p6);
    if (t.classList.contains('p7')) return changeColors(p7);
    if (t.classList.contains('p8')) return changeColors(p8);
    if (t.classList.contains('p9')) return changeColors(p9);
    if (t.classList.contains('random')) return changeColors(randomizer(true));
})

function salvarTarefas() {
    const liGet = list.querySelectorAll('li');
    const tasklists = [];

    for (t of liGet) {
        let ttext = t.innerText;
        ttext = ttext.replace('Apagar Task', '').trim();
        tasklists.push(ttext);
    }
    const tasksJSON = JSON.stringify(tasklists);
    localStorage.setItem('tasks', tasksJSON);
}

function loadTaskFromLocal() {
    const cacheTasks = localStorage.getItem('tasks');
    const tasklist = JSON.parse(cacheTasks);
    console.log(tasklist);
    for (let t of tasklist) {
        addTask(t);
    }
}

function changeColors(x, y = false) {
    if (y === true) {
        randBtn.style.backgroundColor = x;
    };
    const remove = document.querySelector(".remover");
    document.body.style.backgroundColor = x[0];
    container.style.border = `5px solid ${x[1]}`;
    btn.style.backgroundColor = x[1];
    remove.style.backgroundColor = x[1];
}

function randomizer(twoColors = false) {
    let cor1 = `rgb(${Math.floor(Math.random() * 250)},${Math.floor(Math.random() * 250)},${Math.floor(Math.random() * 250)})`;
    let cor2 = `rgb(${Math.floor(Math.random() * 250)},${Math.floor(Math.random() * 250)},${Math.floor(Math.random() * 250)})`;
    if (twoColors === true) return [cor1, cor2];
    return cor1;
};

loadTaskFromLocal();