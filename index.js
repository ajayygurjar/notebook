function handleFormSubmit(event) {
    event.preventDefault();
    const bookDetail = {
        bookTitle: event.target.notetext.value,
        bookDesc: event.target.notedesc.value,
    };

    axios
        .post('https://crudcrud.com/api/99ab4982490a408f8fdf34de7a806240/noteBook', bookDetail)
        .then(response => {
            displayUserOnScreen(response.data);
            incrementTotalNotes();
            event.target.reset(); // Clearing the input fields after successful post
        })
        .catch(error => console.error(error));
}

document.addEventListener('DOMContentLoaded', () => {
    axios
        .get('https://crudcrud.com/api/99ab4982490a408f8fdf34de7a806240/noteBook')
        .then(response => {
            response.data.forEach(user => displayUserOnScreen(user));
            updateTotalNotes(response.data.length); // Update total notes count on page load
        })
        .catch(error => console.error(error));
});

function displayUserOnScreen(bookDetail) {
    const ul = document.getElementById('detailList');
    const li = document.createElement('li');
    li.textContent = `${bookDetail.bookTitle} - ${bookDetail.bookDesc}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteUser(bookDetail, li));
    li.appendChild(deleteBtn);

    ul.appendChild(li);
}

function deleteUser(bookDetail, li) {
    axios
        .delete(`https://crudcrud.com/api/99ab4982490a408f8fdf34de7a806240/noteBook/${bookDetail._id}`)
        .then(() => {
            li.remove();
            decrementTotalNotes(); // Decrement the total notes count after successful delete
        })
        .catch(error => console.error(error));
}

function incrementTotalNotes() {
    const totalNotesInput = document.getElementById('totalnotes');
    totalNotesInput.value = parseInt(totalNotesInput.value) + 1;
}

function decrementTotalNotes() {
    const totalNotesInput = document.getElementById('totalnotes');
    totalNotesInput.value = parseInt(totalNotesInput.value) - 1;
}

function updateTotalNotes(count) {
    const totalNotesInput = document.getElementById('totalnotes');
    totalNotesInput.value = count;
}

// Do not touch the code below
module.exports = handleFormSubmit;
``
