const app = (() => {
  const addBtn = document.getElementById('add-btn');
  const modal = document.getElementById('modal');
  const exitModal = document.getElementById('exit-modal');
  const createBtn = document.getElementById('create');
  const taskBtn = document.querySelector('.task-btn');
  const ul = document.getElementById('task-list');

  addBtn.addEventListener('click', () => {
    modal.classList.remove('visibility');
  });

  exitModal.addEventListener('click', () => {
    modal.classList.add('visibility');
  });

  createBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createProject();
  });

  taskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
  });

  return {
    taskBtn,
    modal,
    ul
  }

})();

// function that creates a container, input, and button when add new task is clicked
function addTask() {
  const taskContainer = document.createElement('div');
  const taskLabel = document.createElement('label');
  const taskInput = document.createElement('input');
  const addTask = document.createElement('button');

  taskContainer.id = 'task-container';
  taskLabel.textContent = 'New Task';
  addTask.textContent = 'Add';
  taskInput.id = 'task-input';

  taskContainer.classList.add('task-container');

  taskContainer.append(taskLabel, taskInput, addTask);
  app.taskBtn.after(taskContainer);

  // listens to add button click and appends a list item to it
  addTask.addEventListener('click', (e) => {
    const listItem = document.createElement('li');

    e.preventDefault();

    listItem.className = 'checkbox';
    listItem.textContent = taskInput.value;
    
    app.ul.append(listItem);
    taskContainer.remove();
  });
}

// function that grabs all of the information given on the modal screen and passes it
// to the Project Class as well as runs the Class method
function createProject() {
  const projectName = document.getElementById('project-name');
  const date = document.getElementById('date');
  const note = document.getElementById('note');
  const checkboxes = document.querySelectorAll('.checkbox');

  let arr = [];

  checkboxes.forEach(item => {
    arr.push(item.innerHTML);
  });

  app.modal.classList.add('visibility');
  new Project(projectName.value, date.value, note.value, arr);
  (new Project).addProjectToBoard();
}

// project class that takes all information given when the createBtn is clicked
class Project {
  constructor(name, date, note, tasks) {
    this.name = name;
    this.date = date;
    this.note = note;
    this.tasks = tasks;
  }

  addProjectToBoard() {
    factory(this.name, this.date, this.note, this.tasks);
    console.log('working?');
  }
}

// Factory function that will be used to create new projects on home page
const factory = (name, date, note, tasks) => {
  name,
  date,
  note,
  tasks

  const projectHeader = document.querySelector('.add-new-header');
  const projectContainer = document.createElement('div');
  const projectInfo = document.createElement('div');
  const projectTodos = document.createElement('div');  
  const projectNotes = document.createElement('div');


  const header = document.createElement('h1');
  const dateText = document.createElement('p');

  projectContainer.className = 'projects';
  projectInfo.className = 'project-info';
  projectTodos.className = 'project-todos';
  projectNotes.className = 'project-note';

  projectHeader.after(projectContainer);

}


