document.addEventListener('DOMContentLoaded', function() 
   {
      const accordions = document.querySelectorAll('.ph-accordion');
            accordions.forEach(function(accordion) 
               {
                  const accordionItems = accordion.querySelectorAll('.ph-accordion-item');
                        accordionItems.forEach(function(accordionItem) 
                           {
                              var accordionTitle = accordionItem.querySelector('.ph-accordion-title button');
                              var accordionContent = accordionItem.querySelector('.ph-accordion-content');

                                  accordionTitle.addEventListener('click', function() 
                                    {
                                       if(accordionItem.classList.contains('open')) 
                                          {
                                              // Close current accordion item
                                              accordionItem.classList.remove('open');
                                              accordionItem.classList.add('close');
                                              accordionContent.style.maxHeight = '';
                                              accordionContent.style.display = 'none';
                                              accordionTitle.setAttribute('aria-expanded', 'false');
                                          } 
                                       else 
                                          {
                                              // Open accordion item
                                              accordionItem.classList.remove('close');
                                              accordionItem.classList.add('open');
                                              // accordionContent.style.maxHeight = (accordionContent.scrollHeight + accordionContent.innerHeight) + 'px';
                                              accordionContent.style.maxHeight = '';
                                              accordionContent.style.display = 'block';
                                              accordionTitle.setAttribute('aria-expanded', 'true');                                              

                                              // Move display to current accordion item
                                              /*
                                              var scrollTarget = this;
                                              window.scrollTo({
                                                top: scrollTarget.offsetTop - 20,
                                                behavior: 'smooth'
                                              });
                                              */
                                         }
                                    });
                            });
                 });
   });
