<?php

namespace Drupal\av_link_target_blank\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\link\Plugin\Field\FieldWidget\LinkWidget;

/**
 * Plugin implementation of the 'link_target_blank_field_widget' widget.
 *
 * @FieldWidget(
 *   id = "link_target_blank_field_widget",
 *   label = @Translation("Link with target blank option"),
 *   field_types = {
 *     "link"
 *   }
 * )
 */
class LinkTargetBlankFieldWidget extends LinkWidget {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'link_target' => '',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element = parent::formElement($items, $delta, $element, $form, $form_state);
    $item = $this->getLinkItem($items, $delta);
    $options = $item->get('options')->getValue();
    $targets_available = [
      '_blank' => 'Link in neuem Fenster öffnen',
    ];
    $default_value = !empty($options['attributes']['target']) ? $options['attributes']['target'] : [];
    $element['options']['attributes']['target'] = [
      #'#type' => 'select',
      '#type' => 'checkboxes',
      #'#title' => 'Link in neuem Fenster öffnen?',
      '#options' => $targets_available,
      '#default_value' => $default_value,
      #'#description' => $this->t(''),
    ];
    return $element;
  }

  /**
   * Getting link items.
   *
   * @param \Drupal\Core\Field\FieldItemListInterface $items
   *   Returning of field items.
   * @param string $delta
   *   Returning field delta with item.
   *
   * @return \Drupal\link\LinkItemInterface
   *   Returning link items inteface.
   */
  private function getLinkItem(FieldItemListInterface $items, $delta) {
    return $items[$delta];
  }

}
