import { UnsplashAPI } from './UnsplashAPI';
import { createGalleryCard } from './createGallery';
import { refs } from './refs';
import Pagination from 'tui-pagination'; 
import 'tui-pagination/dist/tui-pagination.min.css';

const api = new UnsplashAPI();

const options = {
    totalItems: 0,
    itemsPerPage: 12,
    visiblePages: 5,
    page: 1,
}

const pagination = new Pagination(refs.galleryTui, options);
const page = pagination.getCurrentPage();

api.getPopularPhotos(page)
    .then(({results, total}) => {
        refs.galleryList.innerHTML = createGalleryCard(results);
        pagination.reset(total);
        
    });

