(() => {
    const script = document.currentScript;

    if (script === null) {
        console.error("Error: Unable to recognize script tag, unable to insert IFrame to Document");
    }

    let url = script.src;
    url = url.substring(0, url.lastIndexOf("/") + 1);

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', url);
    for (const key of script.getAttributeNames()) {
        if (key.startsWith('data-attr-')) {
            iframe.setAttribute(key.substring(10), script.getAttribute(key));
        }
    }

    const bindTargedName = script.dataset.bindTo;
    const bindTarged = bindTargedName ? document.getElementById(bindTargedName) : null;
    if(bindTarged === null) {
        script.parentNode.insertBefore(iframe, script);
    } else {
        bindTarged.appendChild(iframe);
    }

    if (script.hasAttribute('data-no-resize')) {
        return;
    }

    window.addEventListener("message", (message) => {
        if (message.source !== iframe.contentWindow
            || message.data?.type !== 'contentResize') {
            return;
        }

        const height = parseFloat(message.data?.height).toString();

        if (height === "0.0" || height === "NaN") {
            return;
        }

        iframe.height = height;
        iframe.style.height = height + 'px';
    }, {capture: false, passive: true});
})();
