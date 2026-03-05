class Anchor {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                if (location.hash) {
                    window.scrollTo(0, 0);
                    const target = document.getElementById(location.hash.slice(1));
                    if (target) {
                        this.smoothScrollTo(target, true);
                    }
                }
            }, 1);

            document.querySelectorAll('a[href^="#"]:not(a[href^="#mm-0"]):not(a[href^="#cookie_einstellungen"])').forEach(anchor => {
                anchor.addEventListener('click', (event) => {
                    const target = document.getElementById(anchor.getAttribute('href').slice(1));
                    if (target) {
                        event.preventDefault();
                        this.smoothScrollTo(target);
                    }
                });
            });
        });
    }

    smoothScrollTo(target, on_load = false) {
        if (target) {
            const offset = on_load ? 0 : - (window.innerHeight * 0.1);
            const time = on_load ? 1 : 1000;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset + offset,
                behavior: 'smooth'
            });
        }
    }
}

const anchor = new Anchor();
