import { VideoPlayer } from "./modules/playVideo";
import { MainSlider } from "./modules/slider-main";
import { Difference } from "./modules/difference";

window.addEventListener("DOMContentLoaded", () => {
    const slider = new MainSlider({ btns: ".next", page: ".page" });
    slider.render();
    const player = new VideoPlayer(".showup .play", ".overlay");
    player.init();

    new Difference(".officerold", ".officernew", ".officer__card-item").init();
});
