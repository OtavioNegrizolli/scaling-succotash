export function applyErrorMsg(sourceField, msg) {
    console.log(sourceField, msg);
    const field = document.querySelector(`#${sourceField.trim()}`);
    const helpText = field.closest('.form-group')?.querySelector('.help-text');
    helpText.innerText = msg;
}


export class http {

    static async post(url, body) {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const rb = await res.json();
        return {
            ...res,
            body: rb
        };
    }
}

export function showModal({
    message,
    title = null,
    type = 'info',
    backdropClickShouldClose,
    okButtonText,
    cancelbuttonText,
    hasCancelButton = false
}) {
    const okButton = createOkButton(okButtonText);
    console.log(okButton);
    const cancelButton = hasCancelButton || !!cancelbuttonText ? createCancelButton(cancelbuttonText) : null;
    console.log(cancelButton);

    const btnPanel = document.createElement('footer');

    btnPanel.appendChild(okButton);
    if (cancelButton)
        btnPanel.appendChild(cancelButton);

    const modal = createModal(
        createHeading(title, type),
        createDetailsText(message),
        btnPanel
    )

    const backdrop = document.createElement('div');
    backdrop.classList.add('backdrop');
    backdrop.appendChild(modal);

    const body = document.querySelector('body');
    body.appendChild(backdrop);

    return new Promise((res, rej) => {
        if (!!backdropClickShouldClose)
            backdrop.addEventListener('click', () => {
                backdrop.remove();
                rej('Aborted!');
            });
        if (!!cancelButton)
            cancelButton.addEventListener('click', () => {
                backdrop.remove();
                rej('Canceld!');
            })
        okButton.addEventListener('click', () => {
            backdrop.remove();
            res('it was succcessifully resolved');
        });
    });
}

function createHeading(title, type) {
    const defaultHeader = {
        'info': "Atenção!",
        'warning': "Aviso!",
        'error': "Erro!",
        'success': "Deu bom!",
    };
    const headingText = title != null ? title : defaultHeader[type];

    const heading = document.createElement('h1');
    heading.innerText = headingText;

    return heading;
}

function createDetailsText(text) {
    const details = document.createElement('p');
    details.innerText = text;
    return details;
}

function createOkButton(okButtonText) {
    const button = document.createElement('button');
    button.innerText = okButtonText != null ? okButtonText : 'OK';
    button.classList.add('ok');
    return button;
}

function createCancelButton(cancelbuttonText) {
    const button = document.createElement('button');
    button.innerText = cancelbuttonText != null ? cancelbuttonText : 'Cancel';
    button.classList.add('cancel');
    return button;
}

function createModal(...elements) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    if (elements != null && Array.isArray(elements)) {
        elements.forEach(e => {
            if (!!e)
                modal.appendChild(e);
        });
    }
    return modal;
}
