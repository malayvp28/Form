export default function swDev()
{
   
    let swUrl=`${process.env.PUBLIC_URL}/sw.js`
    console.log(swUrl,"url")
navigator.serviceWorker.register(swUrl).then((res)=>{
    console.warn("res",res)
}).catch("not working")
}