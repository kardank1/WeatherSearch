import axios from 'axios';

export class UnsplashAPI {
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #API_KEY = 'gcevo00lZKvSMKLnZZJPKYS5xNbpbsP_4i6E-BVlG58';
  #searchParams = new URLSearchParams({
    per_page: 12,
    orientation: 'portrait',
    client_id: this.#API_KEY,
  });
  #query = '';
  async getPopularPhotos(page) {
    const urlApi = `${this.#BASE_URL}?query=popular&page=${page}&${this.#searchParams}`;
    try {
      const { data } = await axios.get(urlApi);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  set query(newQuery) {
    this.#query = newQuery;
   
  }
  async getPhotoByQuery(page) {
  const urlApi = `${this.#BASE_URL}?query=${this.#query}&page=${page}&${this.#searchParams}`;
    try {
      const { data } = await axios.get(urlApi);
      return data;
    } catch (error) {
      console.log(error);
    }
}  
}
