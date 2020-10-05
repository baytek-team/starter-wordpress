/**
 * External dependencies
 */
// import { range } from 'lodash';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component } = wp.element;
const { Toolbar } = wp.components;
const { range } = lodash;

/**
 * Internal dependencies
 */
import HeadingLevelIcon from './heading-level-icon';


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
