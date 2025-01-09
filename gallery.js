class ImageViewer {
    constructor() {
        // Select the lightbox element and its components
        this.lightbox = document.querySelector('.lightbox');
        this.lightboxImg = this.lightbox.querySelector('.lightbox-content img');
        
        // Initialize variables for tracking current image index, total images, and gestures
        this.currentIndex = 0;
        this.images = Array.from(document.querySelectorAll('.container [data-lightbox="homePortfolio"]'));
        this.indexDisplay = this.lightbox.querySelector('.index');
        this.totalImages = this.images.length;
        this.startX = 0;
        this.endX = 0;
        this.lastTap = 0;
        this.isDoubleTap = false;

        // Initialize the viewer
        this.init();
    }

    init() {
        // Set up all event listeners and navigation handlers
        this.setupEventListeners();
        this.setupKeyboardNavigation();
        this.addSwipeListeners();
        this.addDoubleTapListener();
    }

    setupEventListeners() {
        // Add click event listeners to all images in the gallery
        this.images.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                if (this.isDoubleTap) {
                    // Prevent further action if a double-tap is detected
                    this.isDoubleTap = false;
                    e.preventDefault();
                    return;
                }
                e.preventDefault();
                
                // Open the lightbox and set the current image index
                this.currentIndex = index;
                this.open(link.querySelector('img').src);
                this.updateIndexDisplay();
            });
        });

        // Add click event listeners for navigation buttons (previous and next)
        this.lightbox.querySelector('.prev').addEventListener('click', (e) => {
            e.preventDefault();
            this.prev();
        });

        this.lightbox.querySelector('.next').addEventListener('click', (e) => {
            e.preventDefault();
            this.next();
        });

        // Prevent default behavior for index display
        this.indexDisplay.addEventListener('click', (e) => {
            e.preventDefault();
        });

        // Add click event listener for the close button
        this.lightbox.querySelector('.close-btn').addEventListener('click', () => {
            this.close();
        });

        // Close the lightbox if the background (outside the image) is clicked
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });
    }

    setupKeyboardNavigation() {
        // Add keyboard navigation for lightbox when it is active
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return; // Ignore if lightbox is not active

            switch (e.key) {
                case 'ArrowLeft': this.prev(); break; // Navigate to previous image
                case 'ArrowRight': this.next(); break; // Navigate to next image
                case 'Escape': this.close(); break;   // Close the lightbox
            }
        });
    }

    addSwipeListeners() {
        // Detect touch gestures for swipe navigation
        this.lightbox.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX; // Capture start position
        });

        this.lightbox.addEventListener('touchend', (e) => {
            this.endX = e.changedTouches[0].clientX; // Capture end position
            this.handleSwipe();
        });
    }

    addDoubleTapListener() {
        // Detect double-tap gesture to close the lightbox
        this.lightboxImg.addEventListener('touchstart', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - this.lastTap;

            if (tapLength < 300 && tapLength > 0) {
                // Double-tap detected
                this.isDoubleTap = true;
                this.close();
            }
            this.lastTap = currentTime;
        });
    }

    handleSwipe() {
        // Determine swipe direction and navigate accordingly
        const swipeDistance = this.endX - this.startX;
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance to trigger
            swipeDistance > 0 ? this.prev() : this.next();
        }
    }

    updateIndexDisplay() {
        // Update the displayed index in the lightbox
        this.indexDisplay.textContent = `${this.currentIndex + 1}/${this.totalImages}`;
    }

    open(src) {
        // Open the lightbox and display the selected image
        this.lightboxImg.src = src;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        this.updateIndexDisplay();
    }

    close() {
        // Close the lightbox and reset styling
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    prev() {
        // Navigate to the previous image (wrap around if needed)
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.open(this.images[this.currentIndex].querySelector('img').src);
    }

    next() {
        // Navigate to the next image (wrap around if needed)
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.open(this.images[this.currentIndex].querySelector('img').src);
    }
}

// Initialize the ImageViewer once the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageViewer();
});
