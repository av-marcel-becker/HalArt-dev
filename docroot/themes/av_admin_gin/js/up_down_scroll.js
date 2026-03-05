class UpDownScroll {
    constructor() {
        this.html = '<div class="up-down-scroll">' +
                    '   <button><i class="icon">⋀</i></button>' +
                    '   <button><i class="icon">⋁</i></button>' +
                    '</div>';
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            if (!document.querySelector('body .up-down-scroll')) {
                document.querySelector('body').insertAdjacentHTML('beforeend', this.html);
                document.querySelector('.up-down-scroll button:first-child').addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });

                document.querySelector('.up-down-scroll button:last-child').addEventListener('click', () => {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth'
                    });
                });
            }
        });
    }
}

new UpDownScroll();
