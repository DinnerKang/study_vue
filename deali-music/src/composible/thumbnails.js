
import cat1 from '@/assets/thumbnails/cat1.jpg';
import cat2 from '@/assets/thumbnails/cat2.jpg';
import IM from '@/assets/thumbnails/IM.jpg';

const images = [
    cat1,
    cat2,
    IM,
];

export const getImageByIdx = (idx) => {
    return images[idx];
};

export const getImageAll = () => {
    return images;
};