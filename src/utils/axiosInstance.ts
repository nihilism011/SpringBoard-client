import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// accessToken
axiosInstance.interceptors.request.use( req => {
    const accessToken = sessionStorage.getItem('accessToken');
    if(accessToken) req.headers['accessToken'] = `Bearer ${accessToken}`;
    return req;
  }, async err => err)

// refreshToken
let isRefreshing = false;
let refreshSubscribers: ((newToken: string) => void)[] = [];

axiosInstance.interceptors.response.use( res => res,
  async err => {

    const originReq = err.config;

      if(err.response.status === 401 && !originReq._retry){
        originReq._retry = true;

        if(isRefreshing){
          return new Promise(resolve => {
            refreshSubscribers.push(newToken =>{
              originReq.headers['Authorization'] = `Bearer ${newToken}`
              resolve(axiosInstance(originReq));
            });
          });
        }

        isRefreshing = true;

        try{
          const res = await axiosInstance.post('/refresh',{ withCredentials: true });
          const newAccessToken = res.data.accessToken;
          sessionStorage.setItem('accessToken', newAccessToken);
          originReq.headers['Authorization'] = `Bearer ${newAccessToken}`

          refreshSubscribers.forEach(callback => callback(newAccessToken));
          refreshSubscribers = [];

          return axiosInstance(originReq);
        } catch (err){
          sessionStorage.removeItem('accessToken');
          refreshSubscribers = [];

          window.location.href = '/login';
          return Promise.reject(err);

        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(err);

  }
)

export default axiosInstance;
