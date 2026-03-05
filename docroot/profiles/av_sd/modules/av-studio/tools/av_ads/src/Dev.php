<?php
   namespace Drupal\av_ads;
   
   class Dev
      {
         public static function dump($mixed, $setting='')
            {
               print '<pre>';
                  switch($setting)
                     {
                        case 'key':             
                        case 'keys':             
                        case 'array':             
                           var_dump(array_keys($mixed));
                        break;
                        case 'object':             
                        case 'obj':             
                        case 'method':             
                           var_dump(get_class_methods($mixed));
                        break;          
                        case 'msg':  
                           ob_start();
                           var_dump($mixed);
                           $result = ob_get_clean();                   
                           \Drupal::messenger()->addMessage($result, 'warning');
                        break;
                        default:                        
                           var_dump($mixed);
                        break;
                     }
               print '</pre>';
            }    
            
         public static function msg($mixed, $typ='warning')
            {                  
               if(is_object($mixed))
                  {
                     \Drupal::messenger()->addMessage(get_class_methods($mixed), $typ); 
                  }
               else if(is_array($mixed))
                  {
                     \Drupal::messenger()->addMessage(array_keys($mixed), $typ); 
                  }
               else
                  {
                     \Drupal::messenger()->addMessage($mixed, $typ); 
                  }   
            }  
      }