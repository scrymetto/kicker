export const scrollToTop = () => {
    let intervalId;
    const scrollStep = () => {
        if (window.pageYOffset === 0) {
            clearInterval(intervalId);
        }
        window.scrollTo(0, window.pageYOffset-50)
    };
    const scrollToTop = () => {
        intervalId = setInterval(scrollStep, 15);
    };
    return scrollToTop()
};