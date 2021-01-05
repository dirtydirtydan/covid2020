export function copyToClipboard(e) {
    const element = e.currentTarget;
    if (document.selection) {
        document.selection.empty();
        const range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select().createTextRange();
        document.execCommand("copy");
    } else if (window.getSelection) {
        window.getSelection().empty();
        const range = document.createRange();
        range.selectNode(element);
        window.getSelection().addRange(range);
        document.execCommand("copy");
    }
}

export function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}
