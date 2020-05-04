
import Thumnail01 from '@/assets/thumbnails/1.png';
import Thumnail02 from '@/assets/thumbnails/2.png';
import Thumnail03 from '@/assets/thumbnails/3.png';
import Thumnail04 from '@/assets/thumbnails/4.png';

const images = [
    Thumnail01,
    Thumnail02,
    Thumnail03,
    Thumnail04,
];

export const getImageByIdx = (idx) => {
    return images[idx];
};

export const getImageAll = () => {
    return images;
};