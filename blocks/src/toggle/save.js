
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	RichText,
	InnerBlocks,
	BlockControls,
	classNames,
	InspectorControls,
} from '@wordpress/blockEditor';



/**
 * Block save/render component
 * @param {object} props
 */
export default function save( { attributes, className } ) {
	const {
		content, 
		level,
		expandedDefault,
	} = attributes;

	// Level 1 is paragraph (default), otherwise a heading level
	const tagName = level === 1 ? 'p' : 'h' + level;
 
	return (
		<div className={ classnames(className, { 'expanded': expandedDefault }) }>
			<div className="toggle-header">
				<RichText.Content
					tagName={ tagName }
					value={ content }
				/>
			</div>
			<div className="toggle-body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}