export class Difference {
    constructor(oldOfficer, prevOfficer, items) {
        try {
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(prevOfficer);
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
            this.oldCounter = 0;
            this.newCounter = 0;
        } catch (e) {}
    }

    bindTriggers() {
        try {
            this.oldOfficer
                .querySelector(".plus")
                .addEventListener("click", () => {
                    if (this.oldCounter !== this.oldItems.length - 2) {
                        this.oldItems[this.oldCounter].style.display = "flex";
                        this.oldCounter++;
                    } else {
                        this.oldItems[this.oldCounter].style.display = "flex";
                        this.oldItems[this.oldItems.length - 1].remove();
                    }
                });

            this.newOfficer
                .querySelector(".plus")
                .addEventListener("click", () => {
                    if (this.newCounter !== this.newItems.length - 2) {
                        this.newItems[this.newCounter].style.display = "flex";
                        this.newCounter++;
                    } else {
                        this.newItems[this.newCounter].style.display = "flex";
                        this.newItems[this.newItems.length - 1].remove();
                    }
                });
        } catch (e) {}
    }

    hideItems() {
        try {
            this.oldItems.forEach((item, i, arr) => {
                if (i !== arr.length - 1) {
                    item.style.display = "none";
                }
            });

            this.newItems.forEach((item, i, arr) => {
                if (i !== arr.length - 1) {
                    item.style.display = "none";
                }
            });
        } catch (e) {}
    }

    init() {
        this.hideItems();
        this.bindTriggers();
    }
}
