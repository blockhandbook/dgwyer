/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { setCategories, getCategories } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import icons from './icons';

const categories = [
	{
		slug: 'dgwyer',
		title: 'Dgwyer',
		icon: icons.plugin,
	},
	...getCategories().filter(
		( { categorySlug } ) => categorySlug !== 'dgwyer'
	),
];
setCategories( categories );
