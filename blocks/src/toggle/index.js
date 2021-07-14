/**
 * External dependencies
 */
// import classnames from 'classnames';

/**
 * Internal dependencies
 */
import icon from './icon';
import edit from './edit'
import save from './save'

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Register block
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/
 */
export default registerBlockType(
	'baytek/toggle',
	{
		title: __( 'Toggle 2', 'baytek-gutenberg' ),
		description: __( 'An expandable and collapsible content block. Toggle open and closed by clicking the header.', 'baytek-gutenberg' ),
		category: 'layout',
		icon: icon,
		keywords: [
			__( 'Accordion', 'baytek-gutenberg' ),
			__( 'Expand and Collapse', 'baytek-gutenberg' ),
			__( 'Showy Hidy', 'baytek-gutenberg' ),
		],
		supports: {
			anchor: true,
		},
		attributes: {
			content: {
				type: 'string',
				source: 'html',
				selector: 'p,h2,h3,h4,h5,h6',
				default: ''
			},
			level: {
				type: 'number',
				default: 1
			},
			expandedDefault: {
				type: 'boolean',
				default: false,
			},
		},
		edit,
		save,
	},
);
