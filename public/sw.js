let cacheData="appv1"
this.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            cache.addAll([
                "/static/js/bundle.js",
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "/index.html",
                "/",
                "/manifest.json",
                "/logo192.png",
                "/favicon.ico",
                "/static/js/vendors~main.chunk.js",
                "/static/media/logo.6ce24c58.svg",
               


            ])
        })
    )
})
this.addEventListener("fetch",(event)=>{
event.respondWith(
    caches.match(event.request).then((res)=>{
        if(res)
    
        { console.log(res,"fetch")
            return res;
        }
    }
 )
)
})