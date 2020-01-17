const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

const toDos = [];

function saveToDos() {                                  //toDos를 LocalStorage에 저장하기 위한 함수
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));       //JSON.stringify는 js 오브젝트를 String형으로 바꿔주는 함수임
}

function paintToDo(text) {
    const li = document.createElement("li");            //html의 목록을 만드는 li 생성
    const delBtn = document.createElement("button");    //버튼 생성
    const span = document.createElement("span");        //가로로 컴포넌트들을 나열함
    const newId = toDos.length+1;                       //배열의 다음 id의 값
    delBtn.textContent = "❌";                          //버튼 문구를 x로 설정
    span.textContent = text;                            //span의 내용을 매개변수로 받은 text로 설정함
    li.appendChild(delBtn);                             //리스트의 하위 개체로 버튼을 추가함
    li.appendChild(span);                               //리스트의 하위 개체로 span을 추가함
    li.id = newId;                                      //각각의 li들에 Id값을 줌
    toDoList.appendChild(li);                           //toDoList의 하위 개체로 li 리스트를 추가함

    const toDoObj = {                                   //toDoObj 객체를 생성하고 값을 저장함
        text: text,
        id: newId
    };
    toDos.push(toDoObj);                                //생성한 객체를 toDos 배열에 저장함
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();         //기본 동작 막기
    const currentValue = toDoInput.value;       //현재 submit칸에 입력된 값을 변수에 저장함
    paintToDo(currentValue);                    //함수 실행
    toDoInput.value = "";                       //함수를 처리하고 submit칸에 입력된 값을 지움
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos!==null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {     //forEach함수는 배열안에 있는 것들을 각각 한번씩 함수를 실행시켜주는 것
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
}

init();