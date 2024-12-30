class ImageViewer {
    constructor() {
        this.lightbox = document.querySelector('.lightbox');
        this.lightboxImg = this.lightbox.querySelector('.lightbox-content img');
        this.currentIndex = 0;
        this.images = Array.from(document.querySelectorAll('.container [data-lightbox="homePortfolio"]'));
        this.indexDisplay = this.lightbox.querySelector('.index');
        this.totalImages = this.images.length;
        this.startX = 0;
        this.endX = 0;
        this.lastTap = 0;
        this.isDoubleTap = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardNavigation();
        this.addSwipeListeners();
        this.addDoubleTapListener();
    }

    setupEventListeners() {
        // Image click listeners
        this.images.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                if (this.isDoubleTap) {
                    this.isDoubleTap = false;
                    e.preventDefault();
                    return;
                }
                e.preventDefault();
                this.currentIndex = index;
                this.open(link.querySelector('img').src);
                this.updateIndexDisplay();
            });
        });

        // Navigation buttons
        this.lightbox.querySelector('.prev').addEventListener('click', (e) => {
            e.preventDefault();
            this.prev();
        });

        this.lightbox.querySelector('.next').addEventListener('click', (e) => {
            e.preventDefault();
            this.next();
        });

        // Index display
        this.indexDisplay.addEventListener('click', (e) => {
            e.preventDefault();
        });

        // Close button
        this.lightbox.querySelector('.close-btn').addEventListener('click', () => {
            this.close();
        });

        // Background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;

            switch (e.key) {
                case 'ArrowLeft': this.prev(); break;
                case 'ArrowRight': this.next(); break;
                case 'Escape': this.close(); break;
            }
        });
    }

    addSwipeListeners() {
        this.lightbox.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
        });

        this.lightbox.addEventListener('touchend', (e) => {
            this.endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
    }

    addDoubleTapListener() {
        this.lightboxImg.addEventListener('touchstart', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - this.lastTap;

            if (tapLength < 300 && tapLength > 0) {
                this.isDoubleTap = true;
                this.close();
            }
            this.lastTap = currentTime;
        });
    }

    handleSwipe() {
        const swipeDistance = this.endX - this.startX;
        if (Math.abs(swipeDistance) > 50) {
            swipeDistance > 0 ? this.prev() : this.next();
        }
    }

    updateIndexDisplay() {
        this.indexDisplay.textContent = `${this.currentIndex + 1}/${this.totalImages}`;
    }

    open(src) {
        this.lightboxImg.src = src;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.updateIndexDisplay();
    }

    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.open(this.images[this.currentIndex].querySelector('img').src);
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.open(this.images[this.currentIndex].querySelector('img').src);
    }
}

// Initialize the viewer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ImageViewer();
});