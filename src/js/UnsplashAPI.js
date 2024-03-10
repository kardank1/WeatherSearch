import axios from 'axios';

export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #API_KEY = 'gcevo00lZKvSMKLnZZJPKYS5xNbpbsP_4i6E-BVlG58';
  async getPopularPhotos(page) {
    const urlApi = `${
      this.#BASE_URL
    }?query=popular&page=${page}&per_page=12&orientation=portrait&client_id=${
      this.#API_KEY
    }`;
    try {
      const { data } = await axios.get(urlApi);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
