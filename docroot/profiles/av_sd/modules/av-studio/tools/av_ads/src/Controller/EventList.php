<?php
namespace Drupal\av_ads\Controller;

use Drupal\Core\Controller\ControllerBase;
use \DateTime;
use \DateTimeZone;
use \DateInterval;
use Symfony\Component\HttpFoundation\Response;
use Drupal\Component\Serialization\Json;
use Drupal\file\Entity\File;
use Drupal\av_ads\Dev;

class EventList extends ControllerBase 
{
    // Debug-Variable - auf true setzen für ausführliche Logs
    private $debug = false;
    
    public function __construct()
    {     
    }

    public function content()
    {
        $json = Json::encode($this->get_items());
        $response = new Response();
        $response->headers->set('Content-type', 'application/json; charset=UTF-8');
        $response->setContent($json);
        return $response;
    }

    private function get_items()
    {
        $location_id = \Drupal::routeMatch()->getParameter('location');
        
        // Einheitliche Zeitzone für alle Berechnungen verwenden
        $timezone = new DateTimeZone('Europe/Berlin');
        $now_datetime = new \DateTimeImmutable('now', $timezone);
        
        $query = \Drupal::entityQuery('node')
                        ->accessCheck(TRUE)
                        ->condition('status', 1)
                        ->condition('type', 'n_advertisement');
        
        if($location_id) {
            $query->condition('field_n_ads_location', $location_id);
        }               
        
        $nids = $query->execute();
        $nodes = \Drupal\node\Entity\Node::loadMultiple($nids);
        
        $nodedata = [];
        if($nodes) {
            foreach ($nodes as $node) {    
                $field_n_ads_time_range = $node->get('field_n_ads_time_range')->getValue();
                
                if(isset($field_n_ads_time_range)) {
                    $sticky = false;
                    
                    foreach($field_n_ads_time_range as $key => $value) {
                        // Zeitwerte korrekt parsen - Drupal speichert oft in UTC
                        // Erst als UTC parsen, dann zur lokalen Zeitzone konvertieren
                        $start_utc = new \DateTimeImmutable($value['value'], new DateTimeZone('UTC'));
                        $end_utc = new \DateTimeImmutable($value['end_value'], new DateTimeZone('UTC'));
                        
                        // Zur lokalen Zeitzone konvertieren
                        $start_datetime = $start_utc->setTimezone($timezone);
                        $end_datetime = $end_utc->setTimezone($timezone);
                        
                        if($this->debug) {
                            \Drupal::logger('av_ads')->info('Node @nid: Zeitbereich @key - UTC Start: @start_utc, UTC Ende: @end_utc', [
                                '@nid' => $node->id(),
                                '@key' => $key,
                                '@start_utc' => $start_utc->format('d.m.Y H:i:s'),
                                '@end_utc' => $end_utc->format('d.m.Y H:i:s')
                            ]);
                            
                            \Drupal::logger('av_ads')->info('Node @nid: Zeitbereich @key - Berlin Start: @start, Berlin Ende: @end, Jetzt: @now', [
                                '@nid' => $node->id(),
                                '@key' => $key,
                                '@start' => $start_datetime->format('d.m.Y H:i:s'),
                                '@end' => $end_datetime->format('d.m.Y H:i:s'),
                                '@now' => $now_datetime->format('d.m.Y H:i:s')
                            ]);
                        }
                        
                        // Prüfen ob das aktuelle Datum im Zeitbereich liegt
                        if($now_datetime >= $start_datetime && $now_datetime <= $end_datetime) {
                            
                            if($this->debug) {
                                \Drupal::logger('av_ads')->info('Node @nid: Datum liegt im Zeitbereich', [
                                    '@nid' => $node->id()
                                ]);
                            }
                            
                            // Nur die Uhrzeiten für den Tageszeit-Vergleich extrahieren
                            $now_time = $now_datetime->format('H:i:s');
                            $start_time = $start_datetime->format('H:i:s');
                            $end_time = $end_datetime->format('H:i:s');
                            
                            if($this->debug) {
                                \Drupal::logger('av_ads')->info('Node @nid: Zeitvergleich - Jetzt: @now_time, Start: @start_time, Ende: @end_time', [
                                    '@nid' => $node->id(),
                                    '@now_time' => $now_time,
                                    '@start_time' => $start_time,
                                    '@end_time' => $end_time
                                ]);
                            }
                            
                            // Fall 1: Normale Zeitspanne (z.B. 08:00 bis 18:00)
                            if($start_time <= $end_time) {
                                if($now_time >= $start_time && $now_time <= $end_time) {
                                    $sticky = true;
                                    if($this->debug) {
                                        \Drupal::logger('av_ads')->info('Node @nid: AKTIV - Normale Zeitspanne erfüllt', [
                                            '@nid' => $node->id()
                                        ]);
                                    }
                                    break;
                                } else {
                                    if($this->debug) {
                                        \Drupal::logger('av_ads')->info('Node @nid: INAKTIV - Normale Zeitspanne nicht erfüllt', [
                                            '@nid' => $node->id()
                                        ]);
                                    }
                                }
                            }
                            // Fall 2: Zeitspanne über Mitternacht (z.B. 22:00 bis 06:00)
                            else {
                                if($now_time >= $start_time || $now_time <= $end_time) {
                                    $sticky = true;
                                    if($this->debug) {
                                        \Drupal::logger('av_ads')->info('Node @nid: AKTIV - Mitternachts-Zeitspanne erfüllt', [
                                            '@nid' => $node->id()
                                        ]);
                                    }
                                    break;
                                } else {
                                    if($this->debug) {
                                        \Drupal::logger('av_ads')->info('Node @nid: INAKTIV - Mitternachts-Zeitspanne nicht erfüllt', [
                                            '@nid' => $node->id()
                                        ]);
                                    }
                                }
                            }
                        } else {
                            if($this->debug) {
                                \Drupal::logger('av_ads')->info('Node @nid: Datum liegt NICHT im Zeitbereich', [
                                    '@nid' => $node->id()
                                ]);
                            }
                        }
                    }
                    
                    // Sticky-Status setzen
                    if($sticky !== $node->isSticky()) {
                        $node->setSticky($sticky);
                        $node->save();
                        
                        if($this->debug) {
                            \Drupal::logger('av_ads')->info('Node @nid: Sticky-Status geändert auf @status', [
                                '@nid' => $node->id(),
                                '@status' => $sticky ? 'AKTIV' : 'INAKTIV'
                            ]);
                        }
                    } else {
                        if($this->debug) {
                            \Drupal::logger('av_ads')->info('Node @nid: Sticky-Status unverändert (@status)', [
                                '@nid' => $node->id(),
                                '@status' => $sticky ? 'AKTIV' : 'INAKTIV'
                            ]);
                        }
                    }
                }
                
                // Nur aktive (sticky) Anzeigen in das Ergebnis einbeziehen
                if($node->isSticky()) {
                    $node_array = $this->prepareNodeData($node);
                    $nodedata[] = $node_array;      
                }
            }
        }
        
        return $nodedata;
    }
    
    /**
     * Bereitet die Node-Daten für die Ausgabe vor
     */
    private function prepareNodeData($node)
    {
        $timezone = new DateTimeZone('Europe/Berlin');
        $node_array = $node->toArray();
        
        // Unerwünschte Felder entfernen
        $fields_to_remove = [
            'uuid', 'vid', 'langcode', 'type', 'revision_timestamp',
            'revision_uid', 'revision_log', 'uid', 'created', 'changed',
            'promote', 'sticky', 'default_langcode', 'revision_default',
            'revision_translation_affected', 'moderation_state', 'metatag',
            'path', 'menu_link', 'status'
        ];
        
        foreach($fields_to_remove as $field) {
            unset($node_array[$field]);
        }
        
        // Node-ID konvertieren
        unset($node_array['nid']);
        if($nid = $node->nid->get(0)) {
            $node_array['convert']['nid'] = $nid->value;
        }
        
        // Titel konvertieren
        unset($node_array['title']);
        if($title = $node->title->get(0)) {
            $node_array['convert']['title'] = $title->value;
        }
        
        // Label konvertieren
        unset($node_array['field_n_ads_label']);
        if($label = $node->field_n_ads_label->get(0)) {
            $node_array['convert']['label'] = $label->value;
        }
        
        // Zeitbereich konvertieren
        unset($node_array['field_n_ads_time_range']);
        if($ads_date = $node->field_n_ads_time_range->get(0)) {
            $start_dt = new \DateTimeImmutable($ads_date->value, $timezone);
            $end_dt = new \DateTimeImmutable($ads_date->end_value, $timezone);
            
            $node_array['convert']['date']['start'] = $ads_date->value;
            $node_array['convert']['date']['end'] = $ads_date->end_value;
            $node_array['convert']['date']['format']['start'] = $start_dt->format('d.m.Y H:i');
            $node_array['convert']['date']['format']['end'] = $end_dt->format('d.m.Y H:i');
        }
        
        // Bilder für verschiedene Breakpoints
        $this->processImageField($node_array, $node, 'field_n_ads_img', 'default');
        $this->processImageField($node_array, $node, 'field_n_ads_img_bp1200', '1200');
        $this->processImageField($node_array, $node, 'field_n_ads_img_bp992', '992');
        $this->processImageField($node_array, $node, 'field_n_ads_img_bp768', '768');
        $this->processImageField($node_array, $node, 'field_n_ads_img_bp576', '576');
        
        // Link verarbeiten
        unset($node_array['field_n_ads_link']);
        if($link = $node->field_n_ads_link->get(0)) {
            $node_array['convert']['banner']['link']['url'] = $link->uri;
            $node_array['convert']['banner']['link']['title'] = $link->title;
        }
        
        // Iframe verarbeiten
        unset($node_array['field_n_ads_iframe']);
        if($iframe = $node->field_n_ads_iframe->get(0)) {
            $node_array['convert']['iframe']['url'] = $iframe->url;
            $node_array['convert']['iframe']['title'] = $iframe->title;
            $node_array['convert']['iframe']['class'] = $iframe->class;
            $node_array['convert']['iframe']['width'] = $iframe->width;
            $node_array['convert']['iframe']['height'] = $iframe->height;
        }
        
        // Taxonomie-Felder verarbeiten
        $this->processTaxonomyField($node_array, $node, 'field_n_ads_type', 'type');
        $this->processTaxonomyField($node_array, $node, 'field_n_ads_location', 'location');
        $this->processTaxonomyField($node_array, $node, 'field_n_ads_position', 'position');
        
        return $node_array;
    }
    
    /**
     * Verarbeitet Bildfelder
     */
    private function processImageField(&$node_array, $node, $field_name, $size_key)
    {
        unset($node_array[$field_name]);
        if($ads_img = $node->$field_name->get(0)) {
            $fid = $ads_img->target_id;
            $file = File::load($fid);
            if($file) {
                $url = $file->createFileUrl();
                $node_array['convert']['banner']['img'][$size_key]['url'] = $url;
                $node_array['convert']['banner']['img'][$size_key]['width'] = $ads_img->width;
                $node_array['convert']['banner']['img'][$size_key]['height'] = $ads_img->height;
                $node_array['convert']['banner']['img'][$size_key]['type'] = $file->getMimeType();
                
                if($size_key === 'default') {
                    $node_array['convert']['banner']['img']['title'] = $ads_img->title;
                    $node_array['convert']['banner']['img']['alt'] = $ads_img->alt;
                }
            }
        }
    }
    
    /**
     * Verarbeitet Taxonomie-Felder
     */
    private function processTaxonomyField(&$node_array, $node, $field_name, $convert_key)
    {
        unset($node_array[$field_name]);
        if($field_value = $node->$field_name->get(0)) {
            $tid = $field_value->target_id;
            $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($tid);
            if($term) {
                $name = $term->name->value;
                $node_array['convert'][$convert_key][$tid] = $name;
            }
        }
    }
}