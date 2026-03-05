<?php

namespace Drupal\av_cache_flush\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\av_cache_flush\CacheFlusher;
use Symfony\Component\HttpFoundation\JsonResponse;

class CacheFlushController extends ControllerBase {
  protected $cacheFlusher;

  public function __construct(CacheFlusher $cacheFlusher) {
    $this->cacheFlusher = $cacheFlusher;
  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('av_cache_flush.cache_flusher')
    );
  }

  public function flushCache($token) {
    if ($this->cacheFlusher->validateToken($token)) {
      $this->cacheFlusher->flushAllCaches();
      return new JsonResponse(['message' => 'Alle Caches wurden erfolgreich geleert']);
    }
    return new JsonResponse(['message' => 'Ungültiges Token'], 403);
  }
  
  public function flushCacheBackend($token) {
    if ($this->cacheFlusher->validateToken($token)) {
      $this->cacheFlusher->flushCacheBackend();
      return new JsonResponse(['message' => 'Cache Backend wurden erfolgreich geleert']);
    }
    return new JsonResponse(['message' => 'Ungültiges Token'], 403);
  }
}