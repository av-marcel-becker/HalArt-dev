in theme: node--n-notification--default.html.twig siehe eva

in page.html.twig

      {% if notifications %}
          {{ notifications }}
      {% endif %}

z. B.

   <main role="main" class="page-content cssf" id="main-content">  
      {{ page.content }}  
      {% if notifications %}
          {{ notifications }}
      {% endif %}
   </main>  
