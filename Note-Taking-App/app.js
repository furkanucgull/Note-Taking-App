const text = document.getElementById('textarea');
let container = document.querySelector('.Container');
let noteContainer = document.querySelector('.noteContainer');

var notes = JSON.parse(localStorage.getItem('notes')) || [];

document.querySelector('.btn-submit').addEventListener('click', createNote);
displayNotes();

function createNote() {
  let note = text.value.trim();

  if (note !== '') {
    const div = document.createElement('div');
    div.className = 'notes';

    const p = document.createElement('p');
    p.innerText = note;
    p.id = 'note';

    const button = document.createElement('button');
    button.id = 'Delete';

    button.innerText = 'Delete';

    button.addEventListener('click', function () {
      let index = notes.indexOf(note);
      if (index !== -1) {
        notes.splice(index, 1);
        saveNotes('notes', notes);
        displayNotes();
      }
    });

    div.appendChild(p);
    div.appendChild(button);
    noteContainer.appendChild(div);

    text.value = '';
    notes.push(note);
    saveNotes('notes', notes);
  } else {
    alert('Please fill the textarea section');
  }
}

function saveNotes(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function displayNotes() {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  noteContainer.innerHTML = '';
  notes.forEach((note, index) => {
    const div = document.createElement('div');
    div.className = 'notes';

    const p = document.createElement('p');
    p.id = 'note';
    p.innerText = note;

    const button = document.createElement('button');
    button.id = 'Delete';
    button.innerText = 'Delete';

    button.addEventListener('click', function () {
      notes.splice(index, 1);
      saveNotes('notes', notes);
      displayNotes();
    });

    div.appendChild(p);
    div.appendChild(button);
    noteContainer.appendChild(div);
  });
}
