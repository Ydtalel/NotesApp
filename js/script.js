// Получаем ссылки на HTML-элементы
const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const notesList = document.getElementById('notesList');
const importantFilter = document.getElementById('importantFilter');

// Получаем заметки из localStorage или создаем пустой массив
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Функция отображения заметок в списке
function displayNotes() {
    notesList.innerHTML = '';

    const filteredNotes = importantFilter.checked
        ? notes.filter((note) => note.important)
        : notes;

    filteredNotes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div class="note-actions">
                <button onclick="editNote(${index})">Редактировать</button>
                <button onclick="deleteNote(${index})">Удалить</button>
            </div>
        `;
        notesList.appendChild(noteDiv);
    });
}

// Функция добавления новой заметки
function addNote() {
    const title = noteTitle.value;
    const content = noteContent.value;
    const newNote = { title, content, important: false };
    notes.push(newNote);

    // Сохраняем заметки в localStorage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Очищаем поля формы и обновляем список заметок
    noteTitle.value = '';
    noteContent.value = '';
    displayNotes();
}

// Функция редактирования заметки
function editNote(index) {
    const editedTitle = prompt('Введите новый заголовок', notes[index].title);
    const editedContent = prompt('Введите новый текст заметки', notes[index].content);

    if (editedTitle !== null && editedContent !== null) {
        notes[index].title = editedTitle;
        notes[index].content = editedContent;
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

// Обработчик отправки формы для добавления заметки
noteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addNote();
});

// Обработчик изменения фильтра
importantFilter.addEventListener('change', displayNotes);

// При загрузке страницы отображаем список заметок
displayNotes();
