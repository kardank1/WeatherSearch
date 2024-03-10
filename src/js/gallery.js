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
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
    disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
    moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
            '<span class="tui-ico-ellip">...</span>' +
        '</a>'
  },
};

const pagination = new Pagination(refs.galleryTui, options);
const page = pagination.getCurrentPage();

api.getPopularPhotos(page).then(({ results, total }) => {
  refs.galleryList.innerHTML = createGalleryCard(results);
  pagination.reset(total);
});

pagination.on('beforeMove', popular);

refs.jsSearchForm.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = event.target.elements.query.value.trim();
  if (searchQuery === '') {
    iziToast.info({
      message: 'enter query for search',
      position: 'topRight',
    });
    return;
  }
  refs.jsSearchForm.reset();
  pagination.off('beforeMove', byQuery);
  pagination.off('beforeMove', popular);
  api.query = searchQuery;

  refs.loader.classList.remove('is-hidden');
  api.getPhotoByQuery(page).then(({ results, total }) => {
    if (!results.length) {
      iziToast.info({
        message: 'try another query',
        position: 'topRight',
      });
      return;
    }
    refs.galleryList.innerHTML = createGalleryCard(results);
    iziToast.info({
      message: `We found ${total} images`,
      position: 'topRight',
    });
    if(total<=12){
      refs.galleryTui.classList.add("is-hidden")
    }else{
      refs.galleryTui.classList.remove("is-hidden")
    }
    
    pagination.reset(total);
  }).catch(
    error => {
      console.log(error);
      iziToast.error({
        message: "Try later",
        position: "topRight"
      })
    }
  )
  .finally(
    () => refs.loader.classList.add('is-hidden')
  );
  pagination.on('beforeMove', byQuery);
});

function popular(event) {
  const { page } = event;
  api.getPopularPhotos(page).then(({ results }) => {
    refs.galleryList.innerHTML = createGalleryCard(results);
  });
}

function byQuery({ page }) {
  api.getPhotoByQuery(page).then(({ results }) => {
    refs.galleryList.innerHTML = createGalleryCard(results);
  });
}
