<?php
   namespace Drupal\av_dev_api;
   
   class Dev
      {
         public static function dump($mixed, $setting='')
            {
               switch($setting)
                  {
                     case 'key':             
                     case 'keys':             
                     case 'array':  
                        print '<pre>';           
                           var_dump(array_keys($mixed));
                        print '</pre>';
                     break;
                     case 'object':             
                     case 'obj':             
                     case 'method':  
                        print '<pre>';           
                           var_dump(get_class_methods($mixed));
                        print '</pre>';
                     break;          
                     case 'msg':  
                        ob_start();
                        var_dump($mixed);
                        $result = ob_get_clean();                   
                        \Drupal::messenger()->addMessage($result, 'warning');
                     break;        
                     case 'msg_keys':  
                        ob_start();
                        var_dump(array_keys($mixed));
                        $result = ob_get_clean();                   
                        \Drupal::messenger()->addMessage($result, 'warning');
                     break;     
                     case 'text':  
                        ob_start();
                        var_dump($mixed);
                        $result = ob_get_clean();                   
                        return '<pre>'.$result.'</pre>';
                     break;
                     default:        
                        print '<pre>';                
                           var_dump($mixed);
                        print '</pre>';
                     break;
                  }
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