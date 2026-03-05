<?php

namespace Drupal\av_cache_flush;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\DrupalKernelInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Cache\CacheTagsInvalidatorInterface;

class CacheFlusher {
  protected $cacheBackend;
  protected $configFactory;
  protected $kernel;
  protected $requestStack;
  protected $messenger;
  protected $cacheTagsInvalidator;

  public function __construct(
    CacheBackendInterface $cacheBackend,
    ConfigFactoryInterface $configFactory,
    DrupalKernelInterface $kernel,
    RequestStack $requestStack,
    MessengerInterface $messenger,
    CacheTagsInvalidatorInterface $cacheTagsInvalidator
  ) {
    $this->cacheBackend = $cacheBackend;
    $this->configFactory = $configFactory;
    $this->kernel = $kernel;
    $this->requestStack = $requestStack;
    $this->messenger = $messenger;
    $this->cacheTagsInvalidator = $cacheTagsInvalidator;
  }

  public function flushAllCaches() {
    // Leert alle Caches
    drupal_flush_all_caches();

    // Zusätzliche Schritte für eine gründliche Reinigung
    if ($this->kernel) {
      try {
        $this->kernel->invalidateContainer();
        $this->kernel->rebuildContainer();
      } catch (\Exception $e) {
        watchdog_exception('av_cache_flush', $e);
      }
    }
    
    // Leert den Render-Cache
  if ($this->requestStack && ($request = $this->requestStack->getCurrentRequest())) {
    if ($request->hasSession()) {
      $request->getSession()->set('rebuild_all_class_cache', TRUE);
    }
  }
    
    // Invalidiere alle bekannten Cache-Tags
    $this->cacheTagsInvalidator->invalidateTags(['rendered']);
    
    // Invalidiere alles 
    $this->cacheBackend->invalidateAll();
    
    // Setzt die Meldung
    # $this->messenger->addMessage('Alle Caches wurden geleert.', 'status');
    # emergency, alert, critical, error, warning, notice, info, debug
    #\Drupal::logger('av_cache_flush')->notice('Alle Caches wurden geleert.');
    \Drupal::logger('av_cache_flush')->info('Alle Caches wurden geleert.');
  }
  
  public function flushCacheBackend() {   
    $this->cacheBackend->invalidateAll();
    \Drupal::logger('av_cache_flush')->info('Cache Backend wurde geleert.');
  }

public function cronFlushCache() {
  $config = $this->configFactory->get('av_cache_flush.settings');
  $interval = $config->get('cron_interval');
  
  if ($interval === NULL) {
    return;
  }

  $lastRun = $config->get('last_cron_run') ?? 0; // Standardwert 0, falls nicht gesetzt
  $currentTime = time();

  if ($currentTime - $lastRun >= $interval) {
    $this->flushAllCaches();
    $this->configFactory->getEditable('av_cache_flush.settings')
      ->set('last_cron_run', $currentTime)
      ->save();
  }
}

  public function validateToken($token) {
    $config = $this->configFactory->get('av_cache_flush.settings');
    return $token === $config->get('token');
  }
}