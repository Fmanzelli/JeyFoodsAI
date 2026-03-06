document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Navbar Scroll Effect --- */
    const navbar = document.querySelector('.navbar');

    const handleScroll = () => {
        // If the body has class 'menu-page-body', navbar could always be white, 
        // but 'scrolled' class handles this naturally if we want.
        // Actually, on the menu page we added 'scrolled' by default in HTML, 
        // but let's just assert standard behavior
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            // Only remove if it's not the menu page where it should be fixed
            if (!document.body.classList.contains('menu-page-body')) {
                navbar.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial state

    /* --- 2. Mobile Menu Toggle --- */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const icon = mobileToggle.querySelector('i');

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        // Prevenir scroll quando menu aberto
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';

        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* --- 3. Smooth Scroll Navbar Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const dest = this.getAttribute('href');
            // Ignores href="#"
            if (dest !== '#') {
                e.preventDefault();
                const target = document.querySelector(dest);
                if (target) {
                    const navHeight = navbar.offsetHeight;
                    window.scrollTo({
                        top: target.offsetTop - navHeight + 2, // 2px pra o observador cravar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* --- 4. Intersection Observer for Active Menu Items (Home Only) --- */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    if (!document.body.classList.contains('menu-page-body')) {
        const observerOptions = {
            root: null,
            rootMargin: '-50px 0px -50% 0px', // Aciona quando passa do topo do elemento com o navbar
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    // Remove active de todos
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${id}` || item.getAttribute('href') === `index.html#${id}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }


    /* --- 5. Custom Carousel Logic --- */
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (track && items.length > 0) {
        let currentIndex = 0;

        const getItemsToScroll = () => {
            return 1; // Always scroll 1 item at a time for smoother feel
        };

        const updateCarousel = () => {
            const itemWidth = items[0].getBoundingClientRect().width;
            const gap = parseFloat(getComputedStyle(track).gap) || 32;
            const moveAmount = itemWidth + gap;

            // max index logic: não rolar mais do que pode
            const maxIndex = getMaxIndex();
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
        };

        const getMaxIndex = () => {
            const wrapperWidth = track.parentElement.getBoundingClientRect().width;
            const itemWidth = items[0].getBoundingClientRect().width;
            // Visible items on screen + gap logic
            const visibleItems = wrapperWidth / itemWidth; // estimated
            return Math.max(0, items.length - Math.floor(visibleItems));
        };

        const goNext = () => {
            const maxIndex = getMaxIndex();
            if (currentIndex < maxIndex) {
                currentIndex += getItemsToScroll();
                if (currentIndex > maxIndex) currentIndex = maxIndex;
            } else {
                currentIndex = 0; // reset
            }
            updateCarousel();
        };

        const goPrev = () => {
            if (currentIndex > 0) {
                currentIndex -= getItemsToScroll();
                if (currentIndex < 0) currentIndex = 0;
            } else {
                currentIndex = getMaxIndex(); // Vai pro fim
            }
            updateCarousel();
        };

        nextBtn.addEventListener('click', goNext);
        prevBtn.addEventListener('click', goPrev);

        window.addEventListener('resize', () => {
            // timeout pro resize completar
            setTimeout(updateCarousel, 250);
        });

        // Basic Swipe/Drag logic for Carousel
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;

        const setSliderPosition = () => {
            track.style.transform = `translateX(${currentTranslate}px)`;
        }

        const animation = () => {
            setSliderPosition();
            if (isDragging) requestAnimationFrame(animation);
        }

        const dragStart = (e) => {
            isDragging = true;
            // handle touch vs mouse
            startPos = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;

            // Get current transform
            const style = window.getComputedStyle(track);
            const transform = style.getPropertyValue("transform");
            if (transform !== 'none') {
                const matrix = new WebKitCSSMatrix(transform);
                currentTranslate = matrix.m41;
                prevTranslate = currentTranslate;
            } else {
                currentTranslate = 0;
                prevTranslate = 0;
            }

            items.forEach(it => it.classList.add('grabbing'));
            track.style.transition = 'none'; // remove transicao via drag
            animationID = requestAnimationFrame(animation);
        }

        const dragMove = (e) => {
            if (!isDragging) return;
            const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
        }

        const dragEnd = () => {
            isDragging = false;
            cancelAnimationFrame(animationID);
            items.forEach(it => it.classList.remove('grabbing'));
            track.style.transition = 'transform 0.5s ease-out'; // restore transition

            const movedBy = currentTranslate - prevTranslate;

            // Threshold for snapping to next logic
            if (movedBy < -50) goNext();
            else if (movedBy > 50) goPrev();
            else updateCarousel(); // snap back
        }

        // Attach events
        track.addEventListener('mousedown', dragStart);
        track.addEventListener('mouseup', dragEnd);
        track.addEventListener('mouseleave', () => { if (isDragging) dragEnd(); });
        track.addEventListener('mousemove', dragMove);

        track.addEventListener('touchstart', dragStart, { passive: true });
        track.addEventListener('touchend', dragEnd);
        track.addEventListener('touchmove', dragMove, { passive: true });
    }

});
