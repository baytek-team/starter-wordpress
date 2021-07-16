/**
 * BLOCK: Modal Block
 *
 * Allows modal / popup block for use in the Gutenberg editor. 
 */

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import {
	InspectorControls, 
	MediaUpload, 
	PlainText, 
	InnerBlocks,
} from '@wordpress/blockEditor';

import {
	CheckboxControl, 
	SelectControl, 
	ColorPicker, 
	PanelBody,
} from '@wordpress/components';

import {
	Component,
} from '@wordpress/element';



/**
 * Register: Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'baytek/modal-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Modal Block', 'baytek-modal' ), // Block title.
	icon: 'format-gallery', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'modal' , 'baytek-modal' ),
		__( 'popup' , 'baytek-modal' ),
		__( 'window' , 'baytek-modal' )
	],

	attributes: {
		title: {
			type: "string",
			default: "Modal Title"	
		},	
		triggerSelector: {
			type: "string",
			default: "triggerclass"
		},
	},

	

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( {attributes, className, setAttributes, isSelected, clientId} ) {
		

		// If innerblock is selected then we want to keep parent modal block open
		// returns true if child innerblock is selected

		function checkInnerblockSelected () {
			const select = wp.data.select('core/block-editor');
			const selected = select.getBlockSelectionStart();
			const inner = select.getBlock(clientId).innerBlocks;
			for (let i = 0; i < inner.length; i++) {
				if (inner[i].clientId === selected) {
					return true;
				}
			}
			return false;
		}

		// hide fields if fieldtype does not match the one passed in
		// fieldvalue string or boolean
		// trigger string - trigger field to check against
		// e.g. of use fieldvalue - image - trigger showOn
		// if the value in the field showOn is != image then hide field
		// e.g. fieldvalue true - trigger  overrideLinkColor
		// if value of overrideLinkColor != true then hide

		function hideFields(fieldvalue , trigger) {
			if (Array.isArray(fieldvalue)) {
				return !fieldvalue.includes(attributes[trigger]) ? "hide" : "";
			} else {
				return attributes[trigger] !== fieldvalue ? "hide" : "";		
			}
		}


		// format the trigger content which is either an image, link text, onload, class or btn

		const trigger = () => {
			if (attributes.showOn === 'selector') {
				return (
					<span className="baytek-block-popup-trigger type_selector" data-selector={attributes.triggerSelector}>{__('Modal using trigger class selector','baytek-modal')}</span>
				);
			}
			
		}

		// Figure out if we need to display the title and innerblocks fields
		// we only display if block is currently selected 

		const dispTitleInnerBlock = (blockSelected) => {
			if (blockSelected || checkInnerblockSelected()) {
				return (
					<div>
						<PlainText
							onChange={ content => setAttributes({ title: content})}
							value={attributes.title}
							placeholder={__('Modal Title - for admin reference','baytek-modal')}
						/>
				
						<label>{__('Modal Content:','baytek-modal')}</label>
						<div className="baytek-form-innerblock">
							<InnerBlocks />
						</div>
					</div>
				);
			} else {
				return null;
			}
		}
		
		return (
			<div>
			

				<div className="baytek-block-popup">
					{trigger()}
				
					{/* Modal Overlay */}
					<div className="baytek-block-popup-overlay"></div>
				
					{/* Modal Content */}
					<div  role="dialog" aria-modal="false" aria-labelledby="" aria-describedby="" className="baytek-block-popup-wrap">
						<div id="" className = "baytek-modal-title">
							<h2 class="h4">{attributes.title}</h2>
						</div> {/* end title */}
						<div id="" className="baytek-modal-content">
							{/*<InnerBlocks.Content/>*/}
						</div> {/* end content */}
						<div className="baytek-block-popup-closer"></div>
					</div> {/* end modal content */}

				</div>


				<div className="baytek-form">

					{dispTitleInnerBlock(isSelected)}

					<InspectorControls>
						<PanelBody
							title={__('Trigger','baytek-modal')}
							initialOpen={true}
							className="baytek-form"
						>					
									{/*******************/}
									{/*    Trigger Tab  */}
									{/*******************/}

							<SelectControl
								label={__('Show On','baytek-modal')}
								value={ attributes.selector }
								/>


							<div className={hideFields('selector')}>

								{/* Trigger Class Selector */}

								<label>{__('Trigger Class Selector:','baytek-modal')}</label>	
								<PlainText
									onChange={ content => setAttributes({ triggerSelector: content }) }
									value={ attributes.triggerSelector }
									placeholder={__('Trigger Class Selector','baytek-modal')}
								/>
							</div>

						</PanelBody>
						
					</InspectorControls>
				</div> {/* end baytek-form */}


			</div>
		);

	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( {attributes} ) {


		// format the trigger content which is either an image, link text, 

		const trigger = () => {
			if (attributes.showOn === 'selector') {
				return (
					<span className="baytek-block-popup-trigger type_selector" data-selector={attributes.triggerSelector}></span>
				);
			}
		}

		return (
			<div className="baytek-block-popup">
				{trigger()}
			
				{/* Modal Overlay */}
				<div className="baytek-block-popup-overlay"></div>
			
				<div role="dialog" aria-modal="false" aria-labelledby="" aria-describedby="" className={"baytek-block-popup-wrap"}>
					{/* Modal Content */}
					<div className="baytek-block-popup">
						<div id="" className="baytek-modal-content">
							{<InnerBlocks.Content/>}
						</div> {/* end content */}
						
					</div> {/* end modal content */}
					<div className="baytek-block-popup-closer"></div>
				</div>

			</div>
		);
	},
} );
