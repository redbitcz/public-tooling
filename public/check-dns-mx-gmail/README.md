# Ověření e-mailové schránky na Google Workspace

Aplikace ověřuje, zda určitá doména provozuje svoje e-maily na Google Workspace. Vytvořena pro potřeby článku
vysvětlujícího možné problémy spojené s migrací z Google Workspace, neboť tento k 1. 7. 2022 ukončuje provoz bezplatných
licencí a očekáváme, že velké množství lidí bude migrovat a tím si naruší propojení mezi svojí e-mailovou adresou
a projekty Vyfakturuj.cz a Simpleshop.cz.

Aplikace je použitelná samostatně ([`index.html`](index.html)) a nebo v Iframe, k čemuž je přiravena sada nástrojů, aby
bylo možné apúlikaci do stránky vložit co nejsnadněji.

Ukázka použití Iframe je v souboru [`iframe-demo.html`](iframe-demo.html). Základem je vložení scriptu do stránky:

```html
<script src="https://redbit-tooling.web.app/check-dns-mx-gmail/iframe.js"></script>
```

Pro rychlejší načtení stránky je doporučeno přidat atribut [`async`](https://www.vzhurudolu.cz/prirucka/js-async-defer-module).

Nastavení aplikace se pak provádí přes `data` atributy zapisované ke scriptu.

Přidání attributu `width="100%"` na tag `<iframe>` se provede atributem `data-attr-width`:  

```html
<script src="https://redbit-tooling.web.app/check-dns-mx-gmail/iframe.js" async data-attr-width="100%"></script>
```

Výška Iframe se automaticky přizpůsobuje svému obsahu. Pokud je to nežádoucí, lze to vypnput přidáním `data-no-resize` 

```html
<script src="https://redbit-tooling.web.app/check-dns-mx-gmail/iframe.js" async data-no-resize></script>
```
