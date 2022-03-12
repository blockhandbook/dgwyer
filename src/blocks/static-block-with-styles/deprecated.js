/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { attributes } from './block.json';

const deprecated = [
	{
		attributes: {
			...attributes,
		},
		supports: {},
		save( props ) {
			const {
				attributes: {},
			} = props;

			return (
				<div { ...useBlockProps.save() }>
					<h2>{ __( 'This is a static starter block with styles.', 'dgwyer' ) }</h2>
					<p>{ __( 'Styles defined in the src/blocks/static-block-with-styles/index.js can be added to a block and styled for the frontend in src/blocks/static-block-with-styles/style.scss.', 'dgwyer' ) }</p>
					<p>{ __( 'Editor only styles can be placed in src/blocks/static-block-with-styles/edit.scss.', 'dgwyer' ) }</p>
					<p>{ __( 'i.e. - style name light would generate the class is-style-light that you can then use to create a unique block style.', 'dgwyer' ) }</p>
					<p>{ __( 'Edit this file in src/blocks/static-block-with-styles/edit.js.', 'dgwyer' ) }</p>
				</div>
			);
		},
	},
];

export default deprecated;
