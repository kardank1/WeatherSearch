import iziToast from 'izitoast';
import { UnsplashAPI } from './UnsplashAPI';
import { createGalleryCard } from './createGallery';
import { refs } from './refs';
import Pagination from 'tui-pagination'; 
import 'tui-pagination/dist/tui-pagination.min.css';
import 'izitoast/dist/css/iziToast.min.css';
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


pagination.on('beforeMove', evt => {
   
    const { page } = evt;
    api.getPopularPhotos(page).then(({ results }) => {
    refs.galleryList.innerHTML = createGalleryCard(results);
        
    })
   
})

refs.jsSearchForm.addEventListener('submit', event => {
    event.preventDefault();
    const searchQuery = event.target.elements.query.value.trim();
    if (searchQuery === '') {
        iziToast.info({
            message: 'enter query for search',
            position: 'topRight',
        })
        return 
    }
    api.query = searchQuery;      
    api.getPhotoByQuery(page).then(({ results, total }) => {
    refs.galleryList.innerHTML = createGalleryCard(results);
    pagination.reset(total);   
    });
})

