// app.js

// ----- 공통 요소 선택 -----
const getTodoBtn = document.getElementById("getTodoBtn");
const postBtn = document.getElementById("postBtn");
const patchBtn = document.getElementById("patchBtn");
const putBtn = document.getElementById("putBtn");
const deleteBtn = document.getElementById("deleteBtn");
const listBtn = document.getElementById("listBtn");
const resultDisplay = document.getElementById("resultDisplay");
const todoList = document.getElementById("todoList");

// API 기본 주소 - "http://localhost:8080/api"
const BASE_URL = "https://jsonplaceholder.typicode.com";

// 결과를 pre 태그에 보여주는 헬퍼 함수
function showResult(data) {
  resultDisplay.textContent = JSON.stringify(data, null, 2);
}

// 1. GET 조회
async function fetchTodo() {
  resultDisplay.textContent = "Loading (GET) ......";
  try {
    // 1) 요청을 보내고 응답이 도착할 대까지 여기서 잠시 대기
    //    fetch 함수에서 기본값을 GET 요청이다.
    const response = await fetch(`${BASE_URL}/todos/1`);

    console.log(response);

    console.log(response.status); // 응답 상태코드

    // 2) 응답 본문 (json 문자열)을 객체로 바꿀 때까지 기다린다.
    const data = await response.json();
    console.log(data);

    // 3) 화면에 뿌려보자.
    showResult(data);
  } catch (error) {
    // 인터넷이 끊기는 등 요청 자체가 실패 했을 때
    resultDisplay.textContent = "요청 실패 : " + error.message;
  }
}

// 1-1. GET 조회 - then 사용
function fetchTodo2() {
  resultDisplay.textContent = "Loading (GET) ......";

  // fetch 는 Promise 를 돌려 준다. 메서드를 안쓰면 기본 GET 요청이다.
  fetch(`${BASE_URL}/todos/1`, { method: "GET" })
    .then((response) => {
      // 1) 응답이 도착하면 실행된다
      console.log(response.status); // 응답 상태 코드
      // response.json() 도 Promise를 돌려준다.
      return response.json();
    })
    .then((data) => {
      // 응답 본문에 문자열을 js Object 파싱해서 넘겨 받는다.
      console.log(data);
      showResult(data); // 내부에서 다시 객체를 문자열로 변환해서 화면에 그림
    })
    .catch((error) => {
      // 인터넷 끊기는 동안 요청 자체 실패... 등
      resultDisplay.textContent = "요청 실패 : " + error.message;
    });
}

getTodoBtn.addEventListener("click", fetchTodo);

// ----- 2. POST : 생성 ----
async function createTodo() {
  resultDisplay.textContent = "Loading (GET) ......";

  const newTodo = { title: "자바스크립트복습", completed: false, userId: 1 };

  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(newTodo), // 객체를 문자열로 바꿔 보내야 한다.
    });

    // 상태 코드 POST : 201 (Created)
    console.log(response.status);
    const data = await response.json(); // JSON 형식에 문자열이 객체로 변환 됨.
    showResult(data);
  } catch (error) {
    resultDisplay.textContent = "요청 실패 : " + error.message;
  }
}
postBtn.addEventListener("click", createTodo);

// 3. ---- PATCH: 부분 수정 ----
async function patchTodo() {}

// 4. ---- PUT: 전체 수정 ----
async function putTodo() {}

// 5. ---- delete: 삭제 ----
async function deleteTodo() {}

// 6 ---- 받은 목록을 화면에 그리기 (todo) 응용 코드 ----

// --------------------------------------

// ---------- 3. PATCH: 부분 수정 ----------
async function patchTodo() {
  resultDisplay.textContent = "Loading (PATCH) ...";

  try {
    const response = await fetch(`${BASE_URL}/todos/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }), // 바꿀 필드만 보낸다
    });
    const data = await response.json();

    console.log(data); // { userId: 1, id: 1, title: 'delectus aut autem', completed: true }
    showResult(data);
  } catch (error) {
    resultDisplay.textContent = "요청 실패: " + error.message;
  }
}

// ---------- 4. PUT: 전체 수정 ----------
async function putTodo() {
  resultDisplay.textContent = "Loading (PUT) ...";

  const updatedTodo = { id: 1, title: "수정된 제목", completed: true, userId: 1 };

  try {
    const response = await fetch(`${BASE_URL}/todos/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo), // 데이터 전체를 보낸다. 빠진 필드는 사라진다
    });
    const data = await response.json();

    console.log(data); // { id: 1, title: '수정된 제목', completed: true, userId: 1 }
    showResult(data);
  } catch (error) {
    resultDisplay.textContent = "요청 실패: " + error.message;
  }
}

// ---------- 4. PUT: 전체 수정 ----------
async function putTodo() {
  resultDisplay.textContent = "Loading (PUT) ...";

  const updatedTodo = { id: 1, title: "수정된 제목", completed: true, userId: 1 };

  try {
    const response = await fetch(`${BASE_URL}/todos/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo), // 데이터 전체를 보낸다. 빠진 필드는 사라진다
    });
    const data = await response.json();

    console.log(data); // { id: 1, title: '수정된 제목', completed: true, userId: 1 }
    showResult(data);
  } catch (error) {
    resultDisplay.textContent = "요청 실패: " + error.message;
  }
}

// ---------- 5. DELETE: 삭제 ----------
async function deleteTodo() {
  resultDisplay.textContent = "Loading (DELETE) ...";

  try {
    const response = await fetch(`${BASE_URL}/todos/1`, {
      method: "DELETE", // 보낼 본문이 없으므로 headers와 body가 없다
    });
    const data = await response.json();

    console.log(response.status); // 200
    console.log(data); // {} (JSONPlaceholder는 빈 객체를 돌려준다)
    showResult({ message: "1번 할 일이 삭제되었습니다", status: response.status });
  } catch (error) {
    resultDisplay.textContent = "요청 실패: " + error.message;
  }
}

patchBtn.addEventListener("click", patchTodo);
putBtn.addEventListener("click", putTodo);
deleteBtn.addEventListener("click", deleteTodo);

// ---------- 6. 목록 조회 후 렌더링 ----------
function renderTodos(todos) {
  todoList.innerHTML = todos
    .map(
      (todo) => `
        <li>
          <input type="checkbox" ${todo.completed ? "checked" : ""} disabled />
          ${todo.title}
        </li>
      `,
    )
    .join("");
}

async function fetchTodoList() {
  todoList.innerHTML = "<li>불러오는 중...</li>";

  try {
    // 쿼리 문자열로 5개만 요청한다. 스프링에서는 @RequestParam으로 받는다
    const response = await fetch(`${BASE_URL}/todos?_limit=5`);
    const todos = await response.json(); // 객체 배열

    console.log(todos.length); // 5
    renderTodos(todos);
  } catch (error) {
    todoList.innerHTML = "<li>목록을 불러오지 못했습니다</li>";
  }
}

listBtn.addEventListener("click", fetchTodoList);
