/**
 * Add eyebrow style to heading block
 */
wp.blocks.registerBlockStyle('core/heading', {
    name: 'eyebrow',
    label: 'Eyebrow'
});

/**
 * Remove unused button styles and add a custom View More variation
 */
wp.blocks.unregisterBlockStyle(
  'core/button',
  [ 'default', 'squared', 'fill' ]
);

wp.blocks.registerBlockVariation(
  'core/buttons',
  [
    {
      name: 'more',
      title: 'View More Button',
      attributes: {
        className: 'view-more'
      },
  }
  ]
);

