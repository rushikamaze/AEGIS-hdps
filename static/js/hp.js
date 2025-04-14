const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');  // Assuming it's an ID
const closeBtn = document.querySelector('#close_btn');  // Assuming it's an ID
const themeToggler = document.querySelector('.theme-toggler');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        if (sideMenu) {
            sideMenu.style.display = "block";
        }
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (sideMenu) {
            sideMenu.style.display = "none";
        }
    });
}

if (themeToggler) {
    themeToggler.addEventListener('click', () => {
        const span1 = themeToggler.querySelector('span:nth-child(1)');
        const span2 = themeToggler.querySelector('span:nth-child(2)');

        if (span1 && span2) {
            span1.classList.toggle('active');
            span2.classList.toggle('active');
        }
    });
}
