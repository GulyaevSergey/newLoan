import { VideoPlayer } from "./modules/playVideo";
import { MainSlider } from "./modules/slider-main";

window.addEventListener("DOMContentLoaded", () => {
    const slider = new MainSlider({ btns: ".next", page: ".page" });
    slider.render();
    const player = new VideoPlayer(".showup .play", ".overlay");
    player.init();
});
