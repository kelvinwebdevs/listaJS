const inputTarefa = document.querySelector('.novaTarefa');
const botaoTarefa = document.querySelector('.novaTarefaBtn');
const ul = document.querySelector('.tarefas');
 
function criaLi(){
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', (e)=>{
    if(e.keyCode === 13){
        if(!inputTarefa.value)return;
        criaTarefa(inputTarefa.value);
    }
})

function limpaImput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaTarefa(tarefa){
   
    const li = criaLi();
    li.innerText = tarefa;
    ul.appendChild(li);
    limpaImput();
    criaApagar(li);
    
}

function criaApagar(li){
    li.innerText += ' ';
    const apagar = document.createElement('button')
    apagar.innerHTML = 'apagar';
    apagar.setAttribute('class', 'apagar')
    li.appendChild(apagar);
    salvartarefas();
}

botaoTarefa.addEventListener('click', (e)=>{
        if(!inputTarefa.value)return;
        criaTarefa(inputTarefa.value);
})


document.addEventListener('click', (e)=>{
    const el =  e.target;
    
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvartarefas();
    }
})

function salvartarefas(){
    const liTarefas = ul.querySelectorAll('li')
    const listasTarefas = [];
    for(let tarefa of liTarefas){
        let tarefaText = tarefa.innerText;
        tarefaText =  tarefaText.replace('apagar', '').trim();
        
        listasTarefas.push(tarefaText)
    }
    const tarefasJSON = JSON.stringify(listasTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function adicionarLocal(){
    const tarefas = localStorage.getItem('tarefas');
    const listasTarefasjs = JSON.parse(tarefas);

    for(let tarefa of listasTarefasjs){
        criaTarefa(tarefa)
    }
    console.log(listasTarefasjs)
}

adicionarLocal()

