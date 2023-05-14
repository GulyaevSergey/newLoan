export class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = document.querySelector(".close");
        this.video = document.querySelector(".video");
    }

    createPlayer(url) {
        this.player = new YT.Player("frame", {
            height: "100%",
            width: "100%",
            videoId: `${url}`,
        });
        this.overlay.style.display = "flex";
    }

    bindTrigger() {
        this.btns.forEach((btn) => {
            btn.addEventListener("click", () => {
                if (document.querySelector("iframe#frame")) {
                    this.overlay.style.display = "flex";
                } else {
                    const path = btn.getAttribute("data-url");
                    this.createPlayer(path);
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener("click", () => {
            this.overlay.style.display = "none";
            this.player.stopVideo();
        });
        this.overlay.addEventListener("click", (e) => {
            if (e.target !== this.video) {
                this.overlay.style.display = "none";
                this.player.stopVideo();
            }
        });
        document.body.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.overlay.style.display = "none";
                this.player.stopVideo();
            }
        });
    }

    init() {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.bindTrigger();
        this.bindCloseBtn();
    }
}
