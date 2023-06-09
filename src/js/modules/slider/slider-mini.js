import { Slider } from "./slider";

export class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        try {
            this.slides.forEach((slide) => {
                slide.classList.remove(this.activeClass);
                if (this.animate) {
                    const cardTitle = slide.querySelector(".card__title");
                    if (cardTitle) {
                        cardTitle.style.opacity = "0.4";
                    }
                    const cardControls = slide.querySelector(
                        ".card__controls-arrow"
                    );
                    if (cardControls) {
                        cardControls.style.opacity = "0";
                    }
                }
            });

            if (!this.slides[0].closest("button")) {
                this.slides[0].classList.add(this.activeClass);
            }

            if (this.animate) {
                const cardTitle = this.slides[0].querySelector(".card__title");
                if (cardTitle) {
                    cardTitle.style.opacity = "1";
                }
                const cardControls = this.slides[0].querySelector(
                    ".card__controls-arrow"
                );
                if (cardControls) {
                    cardControls.style.opacity = "1";
                }
            }
        } catch (e) {}
    }

    nextSLide() {
        try {
            if (
                this.slides[1].tagName === "BUTTON" &&
                this.slides[2].tagName === "BUTTON"
            ) {
                this.container.appendChild(this.slides[0]);
                this.container.appendChild(this.slides[1]);
                this.container.appendChild(this.slides[2]);
                this.decorizeSlides();
            } else if (this.slides[1].tagName === "BUTTON") {
                this.container.appendChild(this.slides[0]);
                this.container.appendChild(this.slides[1]);
                this.decorizeSlides();
            } else {
                this.container.appendChild(this.slides[0]);
                this.decorizeSlides();
            }
        } catch (e) {}
    }

    bindTriggers() {
        try {
            this.next.addEventListener("click", () => this.nextSLide());
            this.prev.addEventListener("click", () => {
                for (let i = this.slides.length - 1; i > 0; i--) {
                    if (this.slides[i].tagName !== "BUTTON") {
                        let active = this.slides[i];
                        this.container.insertBefore(active, this.slides[0]);
                        this.decorizeSlides();
                        break;
                    }
                }
            });
        } catch (e) {}
    }

    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;
        } catch (e) {}

        this.bindTriggers();
        this.decorizeSlides();
        if (this.autoplay) {
            setInterval(() => this.nextSLide(), 5000);
        }
    }
}
