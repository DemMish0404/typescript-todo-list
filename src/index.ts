import {v4 as  uuidV4} from "uuid"
// у некоторых библиотек (те которые написаны не на TypeScript ) TypeScript не может отслеживать типы переменных но можно скачать подбиблиотеки которые помогают TypeScript отслеживать типы данных для опеределенных библиотек . обычно типы скачиваются в таком формате: "@types/uuid" (@types/name-of-your-library) . скачивать надо в dev зависимости так как это пригодится только в процессе разработки

//console.log(uuidV4())// "uuidV4()" функция которая возвращает уникальный id в формате строки
//console.log(uuidV4())



type Task = {
  id: string,
  whenCreated: Date,
  completed: boolean,
  title: string
}

const form = document.querySelector<HTMLFormElement>('#add-a-new-task-to-the-todo-list')
const list = document.querySelector<HTMLLIElement>('#todo-list')
const input = document.querySelector<HTMLInputElement>('#todo-list-form__input')


const tasksArr: Task[] = getTasksFromLocalStorage() || []
tasksArr.forEach(addNewTaskOntoThePage) // перебираем все "дела нащего списка дел" с Локального Хранилища
console.log(list)

// добавляем прослушиватель на отправку формы , убеждаясь что input не пустой (если пустой - то нам ничего делать с ним не надо)

// TypeScript по умолчанию добавляет "?." чтобы не вылетали ошибки если нет (так как наша форма ,если ее нет на станице, может быть null)
form?.addEventListener('submit', (event)=>{
  event.preventDefault() // отменяем стандартное поведение (обновление старницы) так как оно нам не надо

  // проверяем не пустой ли инпут
  if(input?.value.trim() == '' || input?.value == null)  return


  const newTask: Task  = {
    id: uuidV4(),
    whenCreated: new Date(),
    completed: false,
    title: input.value
  }

  tasksArr.push(newTask) // пихаем в конец массива со всеми задачами
  saveTasks(tasksArr) // сохраняем заново массив с делами в локальное хранилище
  addNewTaskOntoThePage(newTask) // добавляем на страницу новое дело  



})

function addNewTaskOntoThePage(task: Task ): void {
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = task.completed 

  checkbox.addEventListener('change', event=>{
    task.completed = checkbox.checked
    saveTasks(tasksArr) 
  })

  label.append(task.title, checkbox)
  item.append(label)


  list?.append(item)
  
}

function saveTasks(tasks: Task[]):void{
  localStorage.setItem('ToDoList__Tasks' , JSON.stringify(tasks) )
}


function getTasksFromLocalStorage(){
  const tasksFromLocalStorage = localStorage.getItem('ToDoList__Tasks')

  // проверяем чтобы не было равно null
  if(tasksFromLocalStorage == null) return


  return JSON.parse(tasksFromLocalStorage)
}