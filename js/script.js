// Получаем ссылки на HTML-элементы
const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const importantNote = document.getElementById('importantNote');
const notesList = document.getElementById('notesList');
const importantFilter = document.getElementById('importantFilter');
const searchInput = document.getElementById('searchInput');

// Получаем заметки из localStorage или создаем пустой массив
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Функция отображения заметок в списке
function displayNotes(notesToDisplay = notes) {
  notesList.innerHTML = '';

  notesToDisplay.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.classList.add('card', 'mb-3');
    noteDiv.innerHTML = `
        <div class="card-body ${note.important ? 'important-note' : ''}">
          <h3 class="card-title">${note.title}</h3>
          <p class="card-text">${note.content}</p>
          <button class="btn btn-dark" onclick="editNote(${index})">Редактировать</button>
          <button class="btn btn-danger" onclick="deleteNote(${index})">Удалить</button>
        </div>
    `;

    notesList.appendChild(noteDiv);
  });
}


// Функция добавления новой заметки
function addNote() {
  const title = noteTitle.value;
  const content = noteContent.value;
  const important = importantNote.checked; // Получаем значение из чекбокса
  const newNote = { title, content, important };
  notes.push(newNote);

  // Сохраняем заметки в localStorage
  localStorage.setItem('notes', JSON.stringify(notes));

  // Очищаем поля формы и обновляем список заметок
  noteTitle.value = '';
  noteContent.value = '';
  importantNote.checked = false; // Сбрасываем чекбокс в неотмеченное состояние
  displayNotes();
}

// Функция редактирования заметки
function editNote(index) {
  const editedTitle = prompt('Введите новый заголовок', notes[index].title);
  const editedContent = prompt('Введите новый текст заметки', notes[index].content);

  if (editedTitle !== null && editedContent !== null) {
    const isImportant = notes[index].important; // Получаем значение важности из заметки
    notes[index].title = editedTitle;
    notes[index].content = editedContent;
    notes[index].important = isImportant; // Сохраняем значение важности обратно
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
  }
}

// Функция удаления заметки
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes();
}

// Функция поиска заметок по фрагменту текста в заголовке или тексте
function searchNotes(searchTerm) {
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) 
      || note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  displayNotes(filteredNotes);
}

// Обработчик отправки формы для добавления заметки
noteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addNote();
});

// Обработчик изменения фильтра
importantFilter.addEventListener('change', () => {
  const filteredNotes = importantFilter.checked
    ? notes.filter((note) => note.important)
    : notes;
  displayNotes(filteredNotes);
});

// Обработчик изменения поля поиска
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim();
  searchNotes(searchTerm);
});

function applyImportantStyles(noteDiv, isImportant) {
  if (isImportant) {
    noteDiv.style.backgroundColor = '#f8d7da'; 
  } else {
    noteDiv.style.backgroundColor = ''; // Сбрасываем фон, если заметка не важная
  }
}


// При загрузке страницы отображаем список всех заметок
displayNotes();
