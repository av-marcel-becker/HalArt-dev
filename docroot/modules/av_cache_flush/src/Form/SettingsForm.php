<?php

namespace Drupal\av_cache_flush\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

class SettingsForm extends ConfigFormBase {
  protected function getEditableConfigNames() {
    return ['av_cache_flush.settings'];
  }

  public function getFormId() {
    return 'av_cache_flush_settings';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);
    $config = $this->config('av_cache_flush.settings');

    $form['cron_interval'] = [
      '#type' => 'number',
      '#title' => $this->t('Cron Interval (in seconds)'),
      '#default_value' => $config->get('cron_interval') ?: '',
      '#required' => FALSE,
      '#min' => 0,
      '#description' => $this->t('Leave empty to disable automatic cache flushing.'),
    ];

    $form['token'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Security Token'),
      '#default_value' => $config->get('token') ?: $this->generateRandomToken(),
      '#required' => TRUE,
    ];

    $token = $config->get('token');
    if ($token) {
      $flush_url = Url::fromRoute('av_cache_flush.flush', ['token' => $token], ['absolute' => TRUE])->toString();
      $form['flush_link'] = [
        '#type' => 'item',
        '#title' => $this->t('Cache Flush URL'),
        '#markup' => '<div class="js-form-item form-item">' . $flush_url . '</div>',
        #'#description' => $this->t('Use this URL to manually flush the cache. Click to copy.'),
        '#description' => $this->t('Use this URL to manually flush the cache.'),
       # '#attached' => [
       #   'library' => ['av_cache_flush/copy_to_clipboard'],
       # ],
      ];
      
      $flush_url = Url::fromRoute('av_cache_flush.flush_backend', ['token' => $token], ['absolute' => TRUE])->toString();
      $form['flush_backend_link'] = [
        '#type' => 'item',
        '#title' => $this->t('Cache Backend Flush URL'),
        '#markup' => '<div class="js-form-item form-item">' . $flush_url . '</div>',
        #'#description' => $this->t('Use this URL to manually flush the backend cache. Click to copy.'),
        '#description' => $this->t('Use this URL to manually flush the backend cache.'),
       # '#attached' => [
       #   'library' => ['av_cache_flush/copy_to_clipboard'],
       # ],
      ];
    }

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $interval = $form_state->getValue('cron_interval');
    $this->config('av_cache_flush.settings')
      ->set('cron_interval', $interval === '' ? NULL : $interval)
      ->set('token', $form_state->getValue('token'))
      ->save();

    parent::submitForm($form, $form_state);
  }

  private function generateRandomToken() {
    return bin2hex(random_bytes(16));
  }
}