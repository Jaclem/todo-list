const app = (() => {
  const addBtn = document.getElementById('add-btn');
  const modal = document.getElementById('modal');
  const exitModal = document.getElementById('exit-modal');

  const createBtn = document.getElementById('create');

  const projectName = document.getElementById('project-name');
  const date = document.getElementById('date');
  const task = document.getElementById('task');

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
  })

})();

class Project {
  constructor(name, date, task) {
    this.name = name;
    this.date = date;
    this.task = task;

    console.log(this.name, this.date, this.note);
  }
}




