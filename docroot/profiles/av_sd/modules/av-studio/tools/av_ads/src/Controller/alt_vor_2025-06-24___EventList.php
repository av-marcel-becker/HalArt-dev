<?php
   // https://www.drupal.org/docs/8/api/routing-system/introductory-drupal-8-routes-and-controllers-example
   namespace Drupal\av_ads\Controller;

   use Drupal\Core\Controller\ControllerBase;

   use \Datetime;
   use \DateTimeZone;
   use \DateInterval;
   
   use Symfony\Component\HttpFoundation\Response;
   use Drupal\Component\Serialization\Json;
      # $json = Json::encode($data);
      # $data = Json::decode($json);
      
   use Drupal\file\Entity\File;
   
   use Drupal\av_ads\Dev;
   
   #use Drupal\Core\Url;
   #use Drupal\Core\Link;
   
   #use Drupal\Component\Utility\Xss;
   #use Drupal\Component\Utility\Html;
   
   # use Symfony\Component\HttpFoundation\Request;
   
   #use Drupal\Core\Cache\CacheBackendInterface;
   
   class EventList extends ControllerBase 
      {
         public function __construct()
            {     
            
            }
         // request: https://drupal.stackexchange.com/questions/207044/how-to-get-post-and-get-parameters
         public function content()
            {
               #$now = new DateTime('', new DateTimeZone('Europe/Berlin'));
               #$now_date = $now->format('Y-m-d');
               # \Drupal::request()->query->get('page')
               # 
               # 
               # $filter = array_replace_recursive($filter_default, $filter); 
               $json = Json::encode($this->get_items());
               $response = new Response();
               $response->headers->set('Content-type', 'application/json; charset=UTF-8');
               $response->setContent($json);
               return $response;
               #return [
               #          '#markup' => 'Test',
               #       ];
            }
         # https://drupal.stackexchange.com/questions/213689/get-all-nodes-of-given-type
         private function get_items()
            {
               $location_id = \Drupal::routeMatch()->getParameter('location');
               
               #$now_datetime = new DateTime('', new DateTimeZone('Europe/Berlin'));
               ##$now_datetime = new DateTime('');
               $now_datetime = new \DateTimeImmutable();
               $now = $now_datetime->format('U');
               # $query = \Drupal::entityTypeManager()->getStorage('node')->getQuery();
               $query = \Drupal::entityQuery('node')
                              ->accessCheck(true)
                              ->condition('status', 1)
                              ->condition('type', 'n_advertisement');
               if($location_id)
                  {
                     $query->condition('field_n_ads_location', $location_id);
                  }               
               $nids = $query->execute();
               $nodes = \Drupal\node\Entity\Node::loadMultiple($nids);
               
               $nodedata = [];
               if($nodes) 
                  {
                     foreach ($nodes as $node) 
                        {    
                           $field_n_ads_time_range = $node->get('field_n_ads_time_range')->getValue();
                           if(isset($field_n_ads_time_range))
                              {
                                 $sticky = false;
                                 foreach($field_n_ads_time_range as $key => $value)
                                    {
                                       ##$start_datetime  = new DateTime($value['value']);
                                       ##$start = $start_datetime->add(DateInterval::createfromdatestring('+2 hours'))->format('U');
                                       ##$end_datetime  = new DateTime($value['end_value']);
                                       ##$end = $end_datetime->add(DateInterval::createfromdatestring('+2 hours'))->format('U');
                                       $start_datetime  = (new \DateTimeImmutable())->setTimestamp(strtotime($value['value']))->modify('+2 hour');
                                       $start = $start_datetime->format('U');
                                       $end_datetime  = (new \DateTimeImmutable())->setTimestamp(strtotime($value['end_value']))->modify('+2 hour');
                                       $end = $end_datetime->format('U');
                                       #if($now >= $start && $now <= $end)
                                       if($now_datetime >= $start_datetime && $now_datetime <= $end_datetime)
                                          {
                                             $now_time  = $now_datetime->setDate('1970', '1', '1');
                                             $start_time = $start_datetime->setDate('1970', '1', '1');
                                             $end_time = $end_datetime->setDate('1970', '1', '1');
                                             $check_now = $now_time->format('U');
                                             $check_start = $start_time->format('U');
                                             $check_end = $end_time->format('U');
                                             # Dev::dump($check_now.' >= '.$check_start.' && '.$check_now.' <= '.$check_end);
                                             # Dev::dump($now_time->format('H:i:s').' >= '.$start_time->format('H:i:s').' && '.$now_time->format('H:i:s').' <= '.$end_time->format('H:i:s'));
                                             if($check_now >= $check_start && $check_now <= $check_end)
                                                {
                                                   $sticky = true;
                                                   break;
                                                }
                                          }
                                    }
                                    /*
                                 if($sticky)
                                    {
                                       $node->setSticky(true);
                                       $node->save();  
                                    }
                                 else
                                    {
                                       $node->setSticky(false);
                                       #$node->setSticky(true);
                                       $node->save();  
                                    }
                                    */
                              }
                           # Dev::dump($field_n_ads_time_range);
                                 
                           $sticky = $node->sticky->value;
                           # Dev::dump($sticky);
                           if($sticky == 1)
                              {
                                 $node_array = $node->toArray();
                                 unset
                                    (
                                       $node_array['uuid'],
                                       $node_array['vid'],
                                       $node_array['langcode'],
                                       $node_array['type'],
                                       $node_array['revision_timestamp'],
                                       $node_array['revision_uid'],
                                       $node_array['revision_log'],
                                       $node_array['uid'],
                                       $node_array['created'],
                                       $node_array['changed'],
                                       $node_array['promote'],
                                       $node_array['sticky'],
                                       $node_array['default_langcode'],
                                       $node_array['revision_default'],
                                       $node_array['revision_translation_affected'],
                                       $node_array['moderation_state'],
                                       $node_array['metatag'],
                                       $node_array['path'],
                                       $node_array['menu_link'],
                                       $node_array['status'],
                                       #$node_array['field_n_ads_time_range']
                                    );
                                 unset($node_array['nid']);
                                 if($nid = $node->nid->get(0))
                                    {
                                       $node_array['convert']['nid'] = $nid->value;
                                    }
                                 unset($node_array['title']);
                                 if($title = $node->title->get(0))
                                    {
                                       $node_array['convert']['title'] = $title->value;
                                    }
                                 unset($node_array['field_n_ads_label']);
                                 if($label = $node->field_n_ads_label->get(0))
                                    {
                                       $node_array['convert']['label'] = $label->value;
                                    }
                                 # https://www.computerminds.co.uk/articles/rendering-drupal-8-fields-right-way
                                 #if($ads_img = $node->field_n_ads_img->get(0))
                                 #   {
                                 #      $node_array['render']['ads_img'] = \Drupal::service('renderer')->renderRoot($ads_img->view('full'));
                                 #   }
                                 unset($node_array['field_n_ads_time_range']);
                                 if($ads_date = $node->field_n_ads_time_range->get(0))
                                    {
                                       $node_array['convert']['date']['start'] = $ads_date->value;
                                       $node_array['convert']['date']['end'] = $ads_date->end_value;
                                       $node_array['convert']['date']['format']['start'] = (new \DateTimeImmutable())->setTimestamp(strtotime($ads_date->value))->format('d.m.Y H:i');
                                       $node_array['convert']['date']['format']['end'] = (new \DateTimeImmutable())->setTimestamp(strtotime($ads_date->end_value))->format('d.m.Y H:i');
                                    }
                                 unset($node_array['field_n_ads_img']);
                                 if($ads_img = $node->field_n_ads_img->get(0))
                                    {
                                       $fid = $ads_img->target_id;
                                       $file = File::load($fid);
                                       $url = $file->createFileUrl();
                                       #$ads_img_target_id = $node->field_n_ads_img->get(0)
                                       $node_array['convert']['banner']['img']['default']['url'] = $url;
                                       $node_array['convert']['banner']['img']['default']['width'] = $ads_img->width;
                                       $node_array['convert']['banner']['img']['default']['height'] = $ads_img->height;
                                       $node_array['convert']['banner']['img']['default']['type'] = $file->getMimeType();
                                       $node_array['convert']['banner']['img']['title'] = $ads_img->title;
                                       $node_array['convert']['banner']['img']['alt'] = $ads_img->alt;
                                       # $node_array['render']['ads_img'] = \Drupal::service('renderer')->renderRoot($ads_img->view('full'));
                                    }
                                 unset($node_array['field_n_ads_img_bp1200']);
                                 if($ads_img = $node->field_n_ads_img_bp1200->get(0))
                                    {
                                       $fid = $ads_img->target_id;
                                       $file = File::load($fid);
                                       $url = $file->createFileUrl();
                                       $node_array['convert']['banner']['img']['1200']['url'] = $url;
                                       $node_array['convert']['banner']['img']['1200']['width'] = $ads_img->width;
                                       $node_array['convert']['banner']['img']['1200']['height'] = $ads_img->height;
                                       $node_array['convert']['banner']['img']['1200']['type'] = $file->getMimeType();
                                    }
                                 unset($node_array['field_n_ads_img_bp992']);
                                 if($ads_img = $node->field_n_ads_img_bp992->get(0))
                                    {
                                       $fid = $ads_img->target_id;
                                       $file = File::load($fid);
                                       $url = $file->createFileUrl();
                                       $node_array['convert']['banner']['img']['992']['url'] = $url;
                                       $node_array['convert']['banner']['img']['992']['width'] = $ads_img->width;
                                       $node_array['convert']['banner']['img']['992']['height'] = $ads_img->height;
                                       $node_array['convert']['banner']['img']['992']['type'] = $file->getMimeType();
                                    }
                                 unset($node_array['field_n_ads_img_bp768']);
                                 if($ads_img = $node->field_n_ads_img_bp768->get(0))
                                    {
                                       $fid = $ads_img->target_id;
                                       $file = File::load($fid);
                                       $url = $file->createFileUrl();
                                       $node_array['convert']['banner']['img']['768']['url'] = $url;
                                       $node_array['convert']['banner']['img']['768']['width'] = $ads_img->width;
                                       $node_array['convert']['banner']['img']['768']['height'] = $ads_img->height;
                                       $node_array['convert']['banner']['img']['768']['type'] = $file->getMimeType();
                                    }
                                 unset($node_array['field_n_ads_img_bp576']);
                                 if($ads_img = $node->field_n_ads_img_bp576->get(0))
                                    {
                                       $fid = $ads_img->target_id;
                                       $file = File::load($fid);
                                       $url = $file->createFileUrl();
                                       $node_array['convert']['banner']['img']['576']['url'] = $url;
                                       $node_array['convert']['banner']['img']['576']['width'] = $ads_img->width;
                                       $node_array['convert']['banner']['img']['576']['height'] = $ads_img->height;
                                       $node_array['convert']['banner']['img']['576']['type'] = $file->getMimeType();
                                    }
                                 unset($node_array['field_n_ads_link']);
                                 if($link = $node->field_n_ads_link->get(0))
                                    {
                                       $node_array['convert']['banner']['link']['url'] = $link->uri;
                                       $node_array['convert']['banner']['link']['title'] = $link->title;
                                    }
                                 unset($node_array['field_n_ads_iframe']);
                                 if($iframe = $node->field_n_ads_iframe->get(0))
                                    {
                                       $node_array['convert']['iframe']['url'] = $iframe->url;
                                       $node_array['convert']['iframe']['title'] = $iframe->title;
                                       $node_array['convert']['iframe']['class'] = $iframe->class;
                                       $node_array['convert']['iframe']['width'] = $iframe->width;
                                       $node_array['convert']['iframe']['height'] = $iframe->height;
                                    }
                                 unset($node_array['field_n_ads_type']);
                                 if($type = $node->field_n_ads_type->get(0))
                                    {
                                       $tid = $type->target_id;
                                       $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($tid);
                                       $name = $term->name->value;
                                       $node_array['convert']['type'][$tid] = $name;
                                    }
                                 unset($node_array['field_n_ads_location']);
                                 if($type = $node->field_n_ads_location->get(0))
                                    {
                                       $tid = $type->target_id;
                                       $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($tid);
                                       $name = $term->name->value;
                                       $node_array['convert']['location'][$tid] = $name;
                                    }
                                 unset($node_array['field_n_ads_position']);
                                 if($type = $node->field_n_ads_position->get(0))
                                    {
                                       $tid = $type->target_id;
                                       $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($tid);
                                       $name = $term->name->value;
                                       $node_array['convert']['position'][$tid] = $name;
                                    }
                                 $nodedata[] = $node_array;      
                              }
                           
                        }
                  }
               
               return $nodedata;
            }    /*     
         private function get_items_ids()
            {
               $nids = \Drupal::entityQuery('node')
                              ->condition('status', 1)
                              ->condition('type', 'n_advertisement')
                              ->execute();
               $nodes = \Drupal\node\Entity\Node::loadMultiple($nids);
               return $nodes;
            }*/
            /*
         private function get_content_types()
            {
               $entityTypeManager = \Drupal::service('entity_type.manager');
               $types = [];
               #$contentTypes = $entityTypeManager->getStorage('n_event_page')->loadMultiple();
               $contentTypes = $entityTypeManager->getStorage('node_type')->loadMultiple();
               foreach($contentTypes as $contentType) 
                  {
                     $types[$contentType->id()] = $contentType->label();
                  }
               return $types;
            }
            */
      }