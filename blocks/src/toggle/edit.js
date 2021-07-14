/**
 * External Dependencies
 */
import classnames from 'classnames'

/**
 * Internal dependencies
 */

import HeadingToolbar from './lib/heading-toolbar';

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

import {
	PanelBody,
	PanelRow,
	FormToggle,
	Toolbar,
} from '@wordpress/components';

import {
	Component,
} from '@wordpress/element';

import { __ } from '@wordpress/i18n';

const { range } = lodash;

/**
 * Block edit component
 * @param {object} props
 */

export default function edit( {
	attributes,
	className,
	setAttributes,
	isSelected,
} ) {
	const { 
		content, 
		level,
		expandedDefault,
	} = attributes;

	// Level 1 is paragraph (default), otherwise a heading level
	const tagName = level === 1 ? 'p' : 'h' + level;

	const toggleExpandedDefault = () => setAttributes( { expandedDefault: ! expandedDefault } );

	return [
		<BlockControls>
			<HeadingToolbar 
				minLevel={ 1 } 
				maxLevel={ 7 } 
				selectedLevel={ level } 
				onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) } 
			/>
		</BlockControls>,
		<InspectorControls>
			<PanelBody title={ __( 'Settings', 'baytek-toggle' ) }>
				<PanelRow>
					<label htmlFor="expanded-default-form-toggle">
						{ __( 'Expanded by default', 'baytek-toggle' ) }
					</label>
					<FormToggle
						id="expanded-default-form-toggle"
						label={ __( 'Expanded by default', 'baytek-toggle' ) }
						checked={ expandedDefault }
						onChange={ toggleExpandedDefault }
					/>
				</PanelRow>
			</PanelBody>
			<PanelBody title={ __( 'Header Settings', 'baytek-toggle' ) } initialOpen={ false }>
				<p>{ __( 'HTML Element', 'baytek-toggle' ) }</p>
				<HeadingToolbar 
					isCollapsed={ false } 
					minLevel={ 1 } 
					maxLevel={ 7 } 
					selectedLevel={ level } 
					onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) } 
				/>
			</PanelBody>
		</InspectorControls>,
		<div className={ classnames(className, { 'expanded': expandedDefault }) }>
			<RichText
				identifier="content"
				tagName={ tagName }
				wrapperClassName="toggle-header"
				placeholder={ __( 'Add a toggle header', 'baytek-toggle' ) }
				keepPlaceholderOnFocus={ true }
				allowedFormats={ [ 'core/bold', 'core/italic', ] }
				onChange={ content => setAttributes( { content } ) }
				value={ content }
			/>
			<InnerBlocks 
				allowedBlocks={ [ 
					'core-embed/facebook',
					'core-embed/instagram',
					'core-embed/twitter',
					'core-embed/vimeo',
					'core-embed/youtube',
					'core/button',
					'core/file',
					'core/gallery',
					'core/heading',
					'core/image',
					'core/list',
					'core/media-text',
					'core/paragraph',
					'core/quote',
					'core/table',
					'core/video',
				] } 
			/>
		</div>
	];
}
