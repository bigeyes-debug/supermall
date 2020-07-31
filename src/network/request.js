import axios from  'axios'
export function request(config) {
  const  instance=axios.create({
    baseURL:"请加codewhy002微信",
    timeout:5000
  })
  instance.interceptors.request.use(config=>{
    // console.log(config);
    return config;
  },error => {
    // console.log(error);
  })
  // instance.interceptors.response
  return instance(config)
}
