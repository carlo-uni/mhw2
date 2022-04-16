const divList = document.querySelectorAll('.choice-grid div');
const selList = document.querySelectorAll('.checkbox'); 
let presente1 = 0;
let presente2 = 0;
let presente3 = 0;
let risp = [3];

for( let i=0; i<divList.length; i++){
    divList[i].classList.add("grigio");
}

function seleziona(event)
{
    const b = event.currentTarget;
    for(let i=0; i<divList.length; i++)
    {
        if(divList[i].dataset.questionId === b.dataset.questionId){
            
            if(divList[i].dataset.choiceId === b.dataset.choiceId){

                let current = selList[i];    
                current.classList.add("pos");
                current.classList.add("sel");
                current.classList.add("colore");
                divList[i].classList.add("colore");
                const image = document.querySelector('img.pos');
                
                image.src="images/checked.png";
                image.classList.add("checkbox");
                current.classList.remove("desele");
                divList[i].classList.remove("desele");
                current.classList.remove("pos");

                if(divList[i].dataset.questionId === 'one'){
                    presente1=1;
                    risp[0] = b.dataset.choiceId;
                }
                else if(divList[i].dataset.questionId === 'two'){
                    presente2=1;
                    risp[1] = b.dataset.choiceId;
                }
                else if(divList[i].dataset.questionId === 'three'){
                    presente3=1;
                    risp[2] = b.dataset.choiceId;
                }
                if(presente1===1 && (presente2===1 && presente3===1))
                {
                    for(let i of divList)
                    {
                        i.removeEventListener('click', seleziona);
                        risultato();
                    }        
                }
            }
            else if(divList[i].dataset.choiceId !== b.dataset.choiceId){
                let current = selList[i]; 
                current.classList.add("pos");
                const image = document.querySelector('img.pos');
                current.classList.remove("sel");
                image.src="images/unchecked.png";
                image.classList.add("checkbox");
                current.classList.add("desele");
                divList[i].classList.add("desele");
                current.classList.remove("pos");

                current.classList.remove("colore");
                divList[i].classList.remove("colore");
            }
            
        } 
    }
}

for(let i of divList)
{
    i.addEventListener('click', seleziona);
}

const s = document.querySelector("button");
s.addEventListener('click', reset);

function reset(event)
{
    for(let k=0; k<selList.length; k++)
    {
        selList[k].innerHTML='';
        selList[k].src="images/unchecked.png";
        selList[k].classList.remove("desele");
        selList[k].classList.remove("sel");
        selList[k].classList.remove("colore");
    }
    for(let t=0; t<divList.length; t++)
    {
        divList[t].classList.add("grigio");
        divList[t].classList.remove("desele");
        divList[t].classList.remove("sel");
        divList[t].classList.remove("colore");
    }
    for(let i of divList)
    {
        presente1=0;
        presente2=0;
        presente3=0;
        
        i.addEventListener('click', seleziona);
    }
    for (const j in risp) {
        delete risposte[j];
    }
    document.querySelector('#risp_h1').textContent = '';
    document.querySelector('#risp_p').textContent = '';
}

function risultato()
{    
    if(risp[0] === risp[1] && risp[0] === risp[2])
    {
        document.querySelector('#risp_h1').textContent = RESULTS_MAP[risp[0]].title;
        document.querySelector('#risp_p').textContent = RESULTS_MAP[risp[0]].contents;
    }
    else if(risp[1] === risp[2])
    {
        document.querySelector('#risp_h1').textContent = RESULTS_MAP[risp[1]].title;
        document.querySelector('#risp_p').textContent = RESULTS_MAP[risp[1]].contents;
    }
    else if(risp[2] === risp[0])
    {
        document.querySelector('#risp_h1').textContent = RESULTS_MAP[risp[2]].title;
        document.querySelector('#risp_p').textContent = RESULTS_MAP[risp[2]].contents;
    }
    else{
        document.querySelector('#risp_h1').textContent = RESULTS_MAP[risp[0]].title;
        document.querySelector('#risp_p').textContent = RESULTS_MAP[risp[0]].contents;
    }
}