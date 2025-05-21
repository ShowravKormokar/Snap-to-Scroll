document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.scroll-container');
    const imageWrappers = document.querySelectorAll('.image-wrapper');
    const textOverlay = document.querySelector('.text-overlay');
    const totalHeight = document.querySelector('.main-section').offsetHeight;
    const viewportHeight = window.innerHeight;

    // Calculate scroll thresholds
    const image1End = viewportHeight * 0.5;
    const image2Start = viewportHeight * 0.5;
    const image2End = viewportHeight * 1.5;
    const image3Start = viewportHeight * 1.5;

    function handleScroll() {
        const scrollPosition = scrollContainer.scrollTop;

        // Image 1 (starts visible, fades out halfway)
        if (scrollPosition < image1End) {
            const opacity = 1 - (scrollPosition / image1End);
            imageWrappers[0].style.opacity = opacity;
        } else {
            imageWrappers[0].style.opacity = '0';
        }

        // Image 2 (appears halfway, fades out at 1.5x viewport)
        if (scrollPosition >= image2Start && scrollPosition <= image2End) {
            const progress = (scrollPosition - image2Start) / viewportHeight;
            imageWrappers[1].style.opacity = 1;

            // Show text after some scrolling into image 2
            if (progress > 0.3) {
                textOverlay.classList.add('show');
            } else {
                textOverlay.classList.remove('show');
            }
        } else if (scrollPosition < image2Start) {
            imageWrappers[1].style.opacity = '0';
            textOverlay.classList.remove('show');
        } else {
            imageWrappers[1].style.opacity = '0';
        }

        // Image 3 (appears at 1.5x viewport)
        if (scrollPosition >= image3Start) {
            const progress = (scrollPosition - image3Start) / viewportHeight;
            imageWrappers[2].style.opacity = Math.min(1, progress * 2);
        } else {
            imageWrappers[2].style.opacity = '0';
        }
    }

    // Set initial state
    handleScroll();

    // Add scroll event listener
    scrollContainer.addEventListener('scroll', handleScroll);
});