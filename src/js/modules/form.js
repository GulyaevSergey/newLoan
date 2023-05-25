export class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll("input");
        this.message = {
            loading: "Загрузка...",
            success: "Заявка отправлена",
            failure: "Что-то пошло не так...",
        };
        this.path = "https://simple-server-cumz.onrender.com/api/data";
    }

    clearInputs() {
        this.inputs.forEach((input) => {
            input.value = "";
        });
    }

    checkMailInputs = () => {
        const mailInputs = document.querySelectorAll("[type='email']");

        mailInputs.forEach((input) => {
            input.addEventListener("keypress", (e) => {
                if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
                    e.preventDefault();
                }
            });
        });
    };

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data,
        });
        return await res.test();
    }

    initMask() {
        const setCursorPosition = (pos, elem) => {
            elem.focus();
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                const range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd("character", pos);
                range.moveStart("character", pos);
                range.select();
            }
        };

        const createMask = (e) => {
            const matrix = "+1 (___) ___-___";
            let i = 0;
            let def = matrix.replace(/\D/g, "");
            let val = e.target.value.replace(/\D/g, "");

            if (def.length >= val.length) {
                val = def;
            }

            e.target.value = matrix.replace(/./g, (a) => {
                return /[_\d]/.test(a) && i < val.length
                    ? val.charAt(i++)
                    : i >= val.length
                    ? ""
                    : a;
            });

            if (e.type === "blue") {
                if (e.target.value.length === 2) {
                    e.target.value = "";
                } else {
                    setCursorPosition(e.target.value.length, e.target);
                }
            }
        };
        const inputs = document.querySelectorAll("[name='phone']");
        inputs.forEach((input) => {
            input.addEventListener("input", createMask);
            input.addEventListener("focus", createMask);
            input.addEventListener("blur", createMask);
        });
    }

    init() {
        this.checkMailInputs();
        this.initMask();
        this.forms.forEach((form) => {
            form.addEventListener("submit", (e) => {
                e.preventDefault();

                const statusMessage = document.createElement("div");
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                form.parentNode.appendChild(statusMessage);
                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then((res) => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 6000);
                    });
            });
        });
    }
}
