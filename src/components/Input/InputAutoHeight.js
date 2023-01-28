const InputAutoHeight = input => {
    if (input.current === null) return
    input.style.height = input.setAttribute('style', 'height: ' + (input.scrollHeight - 20) + 'px');
    input.addEventListener('input', e => {
        input.style.height = 'auto';
        input.style.height = (input.scrollHeight - 20) + 'px';
    });
}

export default InputAutoHeight