   
window.addEventListener('DOMContentLoaded', function() {
   var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
         var addedNodes = mutation.addedNodes;
         for (var i = 0; i < addedNodes.length; i++) {
            var element = addedNodes[i];
            if (element.nodeType === Node.ELEMENT_NODE && element.hasAttribute('data-set-color')) {
               element.style.color = element.getAttribute('data-set-color');
            }
         }
      });
   });

   var targetNode = document.documentElement;
   var config = { childList: true, subtree: true };

   observer.observe(targetNode, config);
});
