const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const endPoint = 10;
const select = []; //사용자가 선택한 답변을 담을 배열
const solution = [];

function calResult(){
    // var pointArray = [
    //     {name:'mouse',value:0,key:0},
    //     {name:'cow',value:0,key:1},
    //     {name:'tiger',value:0,key:2},
    //     {name:'rabbit',value:0,key:3},
    //     {name:'dragon',value:0,key:4},
    //     {name:'snake',value:0,key:5},
    //     {name:'horse',value:0,key:6},
    //     {name:'sheep',value:0,key:7},
    //     {name:'monkey',value:0,key:8},
    //     {name:'chick',value:0,key:9},
    //     {name:'dog',value:0,key:10},
    //     {name:'pig',value:0,key:11}
    // ]

    // for (let i =0; i<endPoint; i++){
    //     var target = qnaList[i].a[select[i]];
    //     for (let j=0; j<target.type.length; j++){
    //         for(let k=0; k<pointArray.length; k++){
    //             if (target.type[j] === pointArray[k].name){
    //                 pointArray[k].value += 1;
    //                 //target은 몇번째 답변인지가 되고
    //                 //j는 target의 type길이만큼 반복
    //                 //k는 pointArray에서 target의 type과 같은것들을
    //                 //value += 1 씩 시켜주는 알고리즘
    //             }
    //         }
    //     }
    // }
    //mozila의 js sort 참고
    // var resultArray = pointArray.sort(function(a,b){
    //     if(a.value > b.value){
    //         return -1;
    //     }
    //     if(a.value < b.value){
    //         return 1;
    //     }
    //     return 0;
    // });
    // let resultword = resultArray[0].key;
    // console.log(resultArray);

    var res = select.indexOf(Math.max(...select));//전개구문
    return res;
}

function setResult(){
    let point = calResult(); //infoList 중에서 인덱스 받아옴
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    //var resultImg = document.createElement('img');
    //const imgDiv = document.querySelector('#resultImg');
    //var imgURL = './img/image-'+point+'.png';

    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);
   
    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = qnaList[a].solutions
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            qna.style.display = 'none';
            result.style.display = 'block';
        },400)
    },400);
    setResult();
}

function addAnswer(answerText,qIdx,idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    //이벤트리스너를 위해 모든 answer를 담기위해 클래스를 만들어준다
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer); //answer와 a 의 관계를 만들어준다
    answer.innerHTML = answerText;
    //answer버튼이 클릭되면 지금거 사라지고 다음게 나타나야한다
    answer.addEventListener('click',function(){
        var children = document.querySelectorAll('.answerList');
        for(let i=0; i< children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(()=>{
            var targetAnswer = qnaList[qIdx].a[idx]['answer'];
            var targetSolution = qnaList[qIdx].a[idx]['solution'];

            select.push(targetAnswer);
            solution.push(targetSolution);
            for(let i =0; i<children.length; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450);
    }, false);
    console.log(solution);
}

function goNext(qIdx){
    var q = document.querySelector('.qBox');

    if (qIdx == endPoint){
         goResult();
         return;
    }
    q.innerHTML = qnaList[qIdx].q;
    for (let i in qnaList[qIdx].a){ //질문당 답변은 여러개니까 for문으로
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
    //statusBar의 넓이를 진행상황에 따라 넓게 하기 위해서
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(()=>{
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(()=>{
            main.style.display = 'none';
            qna.style.display = 'block';
        },400)
        let qIdx = 0;
        goNext(qIdx);
    },400);
}