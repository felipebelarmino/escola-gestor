document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('deleteModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    let deleteId = null;

    // Abrir o modal de confirmação
    window.openDeleteModal = (event) => {
        deleteId = event.target.getAttribute('data-id');
        modal.style.display = 'flex';
    };

    // Confirmar exclusão
    confirmDeleteBtn.addEventListener('click', () => {
        if (deleteId) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/students/${deleteId}?_method=DELETE`;

            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = '_method';
            hiddenInput.value = 'DELETE';
            form.appendChild(hiddenInput);

            document.body.appendChild(form);
            form.submit();
        }
    });

    // Cancelar exclusão
    cancelDeleteBtn.addEventListener('click', () => {
        deleteId = null;
        modal.style.display = 'none';
    });

    // Fechar o modal ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
