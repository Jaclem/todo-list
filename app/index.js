const app = (() => {
  const addBtn = document.getElementById('add-btn');
  const modal = document.getElementById('modal');
  const exitModal = document.getElementById('exit-modal');
  const createBtn = document.getElementById('create');
  const taskBtn = document.querySelector('.task-btn');
  const ul = document.getElementById('task-list');  

  addBtn.addEventListener('click', () => {
    clearScreen();
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

  if(JSON.parse(localStorage.getItem('userProjects')) !== null){
    refreshEntries();
  }
  
  openProjectHeader();
  editContents();

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
  const newProj = new Project(projectName.value, date.value, note.value, arr);

  let new_project = JSON.stringify(newProj);

  if(localStorage.getItem('userProjects') == null) {
    localStorage.setItem('userProjects', '[]');
  }

  let old_project = JSON.parse(localStorage.getItem('userProjects'));
  old_project.push(new_project);
  localStorage.setItem('userProjects', JSON.stringify(old_project));
  factory(newProj);
}

// project class that takes all information given when the createBtn is clicked
class Project {
  constructor(name, date, note, tasks) {
    this.name = name;
    this.date = date;
    this.note = note;
    this.tasks = tasks;
  }
}

// Factory function that will be used to create new projects on home page
function factory(project) {
  let name = project.name;
  let date = project.date;
  let note = project.note;
  let tasks = project.tasks;


  const projectHeader = document.querySelector('.add-new-header');
  const projectContainer = document.createElement('div');
  const closedProj = document.createElement('div');
  const projectInfo = document.createElement('div');
  const projectTodos = document.createElement('div');  
  const projectNotes = document.createElement('div');
  const editContainer = document.createElement('div');
  const editInput = document.createElement('input');
  const editBtn = document.createElement('button');

  const header = document.createElement('h1');
  const dateText = document.createElement('p');

  header.append(name);
  dateText.append(date);

  const description1 = document.createElement('p');
  const description2 = document.createElement('p');

  description1.textContent = 'To-Do\'s';
  description2.textContent = 'Notes';
  editBtn.textContent = '+';

  description1.className = 'description';
  description2.className = 'description';
  editContainer.className = 'edit';
  editInput.className = 'edit-input';
  editBtn.className = 'edit-btn';
  closedProj.className = 'closed';

  closedProj.id = 'closed';
  editContainer.id = 'edit';
  editInput.id = 'edit-input';
  editBtn.id = 'edit-btn';

  const ul = document.createElement('ul');

  ul.id = 'todo-items';

  projectContainer.className = 'projects';
  projectInfo.className = 'project-info';
  projectTodos.className = 'project-todos';
  projectNotes.className = 'project-note';

  closedProj.append(description1, projectTodos, projectNotes);
  projectContainer.append(projectInfo, closedProj);
  projectTodos.after(editContainer, description2);
  projectInfo.append(header, dateText);
  editContainer.append(editInput, editBtn);
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.append(task);
    ul.append(li);
  });
  
  projectTodos.append(ul);

  const noteTag = document.createElement('textarea');
  noteTag.className = 'note-text';

  noteTag.append(note);

  projectNotes.append(noteTag);
  projectHeader.after(projectContainer);  
}


// Clears the add project form from previously entered data
function clearScreen() {
  const projectName = document.getElementById('project-name');
  const date = document.getElementById('date');
  const taskList = document.querySelectorAll('.checkbox');
  const noteMessage = document.getElementById('note');

  projectName.value = '';
  date.value = '';

  taskList.forEach(task => {
    task.remove();
  });

  noteMessage.value = '';
}

// opens and closes the projects when clicked as well as allows you to edit existing information
function openProjectHeader() {
  const projects = document.querySelectorAll('.projects');

  projects.forEach(project => {
    project.addEventListener('click', (e) => {
      const target = e.target.nextElementSibling;
      // tries to add conditions and if there is an error it just returns
      try {
        if(target.classList.contains('closed')){
          target.classList.remove('closed');
          target.classList.add('open');
        } else if(target.classList.contains('open')) {
          target.classList.remove('open');
          target.classList.add('closed');
        } 
      } catch(err) {
        if (err instanceof TypeError) {
          return;
        }
      }
    });
  });
}

function editContents() {
  const projects = document.querySelectorAll('.projects');
  const editBtns = document.querySelectorAll('.edit-btn');
  let listItem = JSON.parse(localStorage.getItem('userProjects'));
  let nameToFind = [];
  let boolean = false;

  editBtns.forEach(edit => {
    edit.addEventListener('click', (e) => {
      const edit = document.getElementById('edit-input');
      const todoList = document.getElementById('todo-items');
      const liEl = document.createElement('li');

      console.log(edit.value);

      liEl.append(edit.value);
      todoList.append(liEl);

      // showing all items in local storage
      listItem.forEach(project => {
        let new_project = JSON.parse(project);
        
        if(new_project.name == nameToFind[0]) {
          console.log(new_project);
          new_project.tasks.push(edit.value);
          console.log(JSON.stringify(new_project));
          localStorage.setItem('tasks', JSON.stringify([new_project]));
        }
      });

      // let new_project = JSON.stringify(newProj);

      // if(localStorage.getItem('userProjects') == null) {
      //   localStorage.setItem('userProjects', '[]');
      // }
    
      // let old_project = JSON.parse(localStorage.getItem('userProjects'));
      // old_project.push(new_project);
      // localStorage.setItem('userProjects', JSON.stringify(old_project));
      // edit.value = '';
    });
  });

  projects.forEach(project => {
    project.addEventListener('click', (e) => {
      if(!boolean){
        nameToFind.push(e.target.childNodes[0].textContent);
        boolean = true;
      } else if (boolean) {

      }
    });
  });


}

function refreshEntries() {
  let project_deserialized = JSON.parse(localStorage.getItem('userProjects'));

  project_deserialized.forEach(project => {
    let new_project = JSON.parse(project);

    factory(new_project);
  });


}


