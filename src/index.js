/**
 * External Dependencies
 */
import {
	registerBlocks,
} from 'block-fast-refresh';

/**
 * WordPress Dependencies
 */

/**
 * Internal Dependencies
 */
import './index.scss';
import './style.scss';

// Register block categories.
import './utils/register-categories';

/** Hot Block Loading & Registering Blocks for production **/
registerBlocks( {
	context: () => require.context( './blocks', true, /index\.js$/ ),
	module,
} );
