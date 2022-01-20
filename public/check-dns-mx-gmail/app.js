(() => {
    // Submit content height to parent window
    if (window.parent !== window) {
        let lastHeight = null;
        (new ResizeObserver((resizeEntries) => {
            const height = document.querySelector('html').offsetHeight;
            if (lastHeight === height) return;
            lastHeight = height;

            window.parent.postMessage({type: 'contentResize', height: height}, '*');
        }))
            .observe(document.body);
    }

    async function resolve(domain) {
        const url = new URL('https://dns.google/resolve?type=MX');
        url.searchParams.set('name', domain);
        const response = await fetch(url.toString());
        return await response.json();
    }

    const App = {
        data() {
            return {
                inputdomain: null,
                status: null,
                resultdomain: null,
                userError: null,
                resultError: null,
                resultNote: null,
            }
        },
        methods: {
            resolve: function () {
                // Clean default states
                this.resultError = null;
                this.userError = null;
                this.status = null;
                this.resultNote = null;

                const parsed = /^(.*@)?(?<domain>[.\w-]+\.[a-z]{2,})$/.exec(this.inputdomain);
                if (parsed === null) {
                    this.userError = 'Zadejte prosím platnou doménu ve tvaru: domena.cz';
                    return;
                }

                const domain = parsed.groups.domain;
                this.resultdomain = parsed.groups.domain;

                this.status = 'loading';

                resolve(domain)
                    .then((result) => {
                        this.resultdomain = domain;
                        if (result.Status !== 0) {
                            throw `DNS vrátilo chybu (Status: ${result.Status}), může to znamenat, že zadaná doména buď`
                            + ` neexistuje a nebo se její DNS záznamy nedají načíst.`;
                        }

                        if (result.Answer === undefined) {
                            this.status = false;
                            this.resultNote = `Doména ${domain} nemá žádné MX záznamy. Může to znamenat, že doména`
                                + ` buď není nakonfigurována, nebo nepoužívá e-mailové služby. Zkontrolujte také, zda jste`
                                + ` zadali doménu správně, zadání by nemělo obsahovat 'www.' a jiné subdomény.`;
                            return;
                        }

                        for (const record of result.Answer) {
                            if (/\.google(?:mail)?\.com\.?$/i.test(record.data)) {
                                this.status = true;
                                return;
                            }
                        }

                        this.status = false;
                    }).catch((error) => {
                    this.status = null;
                    this.resultError = error;
                });
            },
        },
    };

    Vue.createApp(App).mount('#app');
})();
