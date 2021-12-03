const GetMemberItem = (nameItem = "Elemento 'x'") => { 
    const memberItem = document.createElement('article');
    memberItem.className = "member-item";
    memberItem.innerHTML = /*html*/ `
        <div class="content">
            <span>${nameItem}</span>
            <input type="text"/>
        </div>
        <div class="actions">
            <button class="action edit">
                <span class="iconify" data-icon="teenyicons:edit-circle-solid"></span>
            </button>
            <button class="action delete">
                <span class="iconify" data-icon="fluent:delete-24-filled"></span>
            </button>
        </div>
    `;
    return memberItem;
};

const SetActionEditButtons = ($memberItem, $content, $inputText, $spanText) => {
    // Asociando evento de modificación en el botón de member-item
    $memberItem.querySelector('.action.edit')
    .addEventListener('click', () => {
        // Intercambiando class edit
        $content.classList.toggle('edit');
        // Verificando si ha sido revelado el campo de modificación y estableciendo el foco
        if ($content.classList.contains('edit')) {
            $inputText.value = $spanText.innerHTML;
            $inputText.focus();
            return;
        }
    });
}
const SetActionDeleteButtons = ($memberItem, $sectionContainer) => {
    // Asociando handler al evento del botón delete
    $memberItem.querySelector('.action.delete')
        .addEventListener('click', () => {
            $sectionContainer.removeChild($memberItem);
        });
}

const ids = [0, 0];
const addMemberItem = ($sectionContainer, relationIdx, memberName) => {
    const $memberItem = GetMemberItem(memberName ? memberName : `Elemento ${++ids[relationIdx]}`);
    // Obteniendo referencia de content de member-item
    const $content = $memberItem.querySelector('.content');
    // Obteniendo referencia del input
    const $inputText = $content.querySelector('input');
    // Obteniendo referencia del span
    const $spanText = $content.querySelector('span');

    SetActionEditButtons($memberItem, $content, $inputText, $spanText);
    
    $inputText.addEventListener('keypress', evt => {
        if (evt.key === 'Enter') {
            $inputText.value.length > 0 && ($spanText.innerText = $inputText.value);
            $content.classList.remove('edit');
        }
    });
    SetActionDeleteButtons($memberItem, $sectionContainer);
    // Agregando elemento miembro
    $sectionContainer.appendChild($memberItem);
    // Inicializando valores
    $memberItem.querySelector('.content').classList.add('edit');
    $memberItem.querySelector('.content input').focus();
}

const InitAddRelation = () => {
    const $sectionsRelation = document.querySelectorAll('.section-relation');
    // Inicializando secciones de relación
    $sectionsRelation.forEach(($section, idx) => {
        const $btnAddMember = $section.querySelector('.btn-add-member');
        $btnAddMember.addEventListener('click', 
            () => addMemberItem(
                $section.querySelector('.container'), idx));
            });
    InitDeleteRelation();
}

const InitDeleteRelation = () => {
    const $sectionsRelation = document.querySelectorAll('.section-relation');
    // Recorriendo secciones de relación
    $sectionsRelation.forEach($section => {
        const $btnDeleteRelation = $section.querySelector('.btn-delete-relation');
        $btnDeleteRelation.addEventListener('click', () => {
            const dialogConfirm = $section.querySelector('.dialog-confirm');
            dialogConfirm.classList.toggle('active');
            dialogConfirm.querySelector('.confirm-yes')
                .addEventListener('click', () => {
                    $section.querySelector('.container').innerHTML = '';
                    dialogConfirm.classList.remove('active');
                });
            dialogConfirm.querySelector('.confirm-no')
                .addEventListener('click', () => {
                    dialogConfirm.classList.remove('active');
                });
        });
    });
}

export default InitAddRelation;