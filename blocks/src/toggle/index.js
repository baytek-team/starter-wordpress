

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import {
	RichText,
	InnerBlocks,
	BlockControls,
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

const { range } = lodash;


/**
 * Internal dependencies
 */
import HeadingLevelIcon from './lib/heading-level-icon';


class HeadingToolbar extends Component {
	createLevelControl( targetLevel, selectedLevel, onChange ) {
		return {
			icon: <HeadingLevelIcon level={ targetLevel } />,
			// translators: %s: heading level e.g: "1", "2", "3"
			title: (targetLevel === 1) ? __( 'Paragraph' ) : sprintf( __( 'Heading %d' ), targetLevel ),
			isActive: targetLevel === selectedLevel,
			onClick: () => onChange( targetLevel ),
		};
	}

	render() {
		const { isCollapsed = true, minLevel, maxLevel, selectedLevel, onChange } = this.props;

		return (
			<Toolbar
				isCollapsed={ isCollapsed }
				icon={ <HeadingLevelIcon level={ selectedLevel } /> }
				controls={ range( minLevel, maxLevel ).map(
					( index ) => this.createLevelControl( index, selectedLevel, onChange )
				) } 
				/>
		);
	}
}

export default HeadingToolbar;



registerBlockType( 'theme-blocks/toggle', {
	title: __( 'Toggle' ),
	icon: 'arrow-down', // https://developer.wordpress.org/resource/dashicons
	category: 'theme-blocks', // Custom category: see index.php
	keywords: [
		__( 'Accordion' ),
		__( 'Expand and Collapse' ),
		__( 'Showy Hidy' ),
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



	edit: props => {
		const {
			className,
			attributes: {
				content, 
				level,
				expandedDefault,
			},
			setAttributes,
			isSelected,
		} = props;

		
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
			<PanelBody title={ __( 'Settings' ) }>
				<PanelRow>
					<label htmlFor="expanded-default-form-toggle">
						{ __( 'Expanded by default' ) }
					</label>
					<FormToggle
						id="expanded-default-form-toggle"
						label={ __( 'Expanded by default' ) }
						checked={ expandedDefault }
						onChange={ toggleExpandedDefault }
					/>
				</PanelRow>
			</PanelBody>
			<PanelBody title={ __( 'Header Settings' ) } initialOpen={ false }>
				<p>{ __( 'HTML Element' ) }</p>
				<HeadingToolbar 
					isCollapsed={ false } 
					minLevel={ 1 } 
					maxLevel={ 7 } 
					selectedLevel={ level } 
					onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) } 
				/>
			</PanelBody>
		</InspectorControls>,

		<div className="wp-block-theme-blocks-toggle">
			<RichText
				identifier="content"
				tagName={ tagName }
				wrapperClassName="toggle-header"
				placeholder={ __( 'Add a toggle header' ) }
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
	},

	save: props => {
		const {
			className,
			attributes: {
				content, 
				level,
				expandedDefault,
			},
		} = props;

		const tagName = level === 1 ? 'p' : 'h' + level;
	 
		return (
			<div className="toggle-header-wrapper">
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
	},
});
