const app = (() => {
  const addBtn = document.getElementById('add-btn');
  const modal = document.getElementById('modal');
  const exitModal = document.getElementById('exit-modal');

  const createBtn = document.getElementById('create');

  const projectName = document.getElementById('project-name');
  const date = document.getElementById('date');
  const taskBtn = document.querySelector('.task-btn');

  addBtn.addEventListener('click', () => {
    modal.classList.remove('visibility');
  });

  exitModal.addEventListener('click', () => {
    modal.classList.add('visibility');
  });

  createBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let test1 = new Project(projectName.value, date.value, task.value);
    console.log(test1);
  });

  taskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
  });

  return {
    taskBtn
  }

})();

// function that creates a container, input, and button when add new task is clicked
function addTask() {
  const taskContainer = document.createElement('div');
  const taskLabel = document.createElement('label');
  const taskInput = document.createElement('input');
  const addTask = document.createElement('button');
  const ul = document.getElementById('task-list');

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
    
    ul.append(listItem);
    taskContainer.remove();
  });

  // return {
  //   taskContainer
  // }
}

// const factory = (taskItems) => {
//   const ul = document.createElement('ul');
//   const listItem = document.createElement('li');

//   taskItems = taskItems;

//   addTask.taskcontainer.append(ul);

// }

class Project {
  constructor(name, date, task) {
    this.name = name;
    this.date = date;
    this.task = task;

    console.log(this.name, this.date, this.note);
  }
}




