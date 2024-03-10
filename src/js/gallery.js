import { UnsplashAPI } from './UnsplashAPI';

const api = new UnsplashAPI();
api.getPopularPhotos(1).then(data => console.log(data));
