class av_studio_media
   {
      items = null;
      
      constructor(el)
         {
            this.items = document.querySelectorAll(el);
            this.init();
         }
         
      init()
         {
            for(const [item_key, item] of Object.entries(this.items))
               {
                  this.update(item);
                  window.addEventListener('resize', () => 
                     {
                           this.update(item)
                     });
               
               }            
         }
      update(item)
         {
            const width = item.offsetWidth;
            const height = width / 16 * 9
            item.style.setProperty('height', height+'px');
         }         

   }
   
 document.addEventListener("DOMContentLoaded", (event) => 
   {
      const avsm = new av_studio_media('.av-studio-media iframe');
   });

   