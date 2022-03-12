<?php
/**
 * Register block scripts and styles.
 *
 * @package Dgwyer
 */

namespace Dgwyer;

/**
 * Register blocks.
 *
 * @since 1.0.0
 */
class RegisterBlocks {

	/**
	 * Register class with appropriate WordPress hooks
	 */
	public static function register() {
		$instance = new self();
		add_action( 'init', array( $instance, 'register_blocks' ) );
	}

	/**
	 * Registers scripts and styles so they can be enqueued through Gutenberg. IMPORTANT - Registers scripts and styles for server rendered ( dynamic ) blocks as well.
	 *
	 * @return void
	 */
	public function register_blocks() {

		if ( ! function_exists( 'register_block_type' ) ) {
			// Gutenberg is not active.
			return;
		}

		// Register block specific frontend & backend styles.
		wp_register_style(
			DGWYER_PLUGIN_SLUG . '-block',
			DGWYER_PLUGIN_URL . 'build/style-index.css',
			array(),
			DGWYER_PLUGIN_VERSION
		);

		// Register editor-only block styles.
		wp_register_style(
			DGWYER_PLUGIN_SLUG . '-block-editor',
			DGWYER_PLUGIN_URL . 'build/index.css',
			array( 'wp-edit-blocks' ),
			DGWYER_PLUGIN_VERSION
		);

		// Register editor-only block scripts.
		// Dynamically load dependencies using index.build.asset.php generated by @wordpress/dependency-extraction-webpack-plugin.
		$script_asset_path = DGWYER_PLUGIN_PATH . 'build/index.asset.php';
		if ( ! file_exists( $script_asset_path ) ) {
			throw new \Error(
				'You need to run `npm start` or `npm run build` for the "dgwyer" blocks first.'
			);
		}

		$script_asset = require $script_asset_path;

		wp_register_script(
			DGWYER_PLUGIN_SLUG . '-block-editor',
			DGWYER_PLUGIN_URL . 'build/index.js',
			$script_asset['dependencies'],
			$script_asset['version'],
			true
		);

		$block_directories = scandir( DGWYER_PLUGIN_PATH . 'src/blocks/' );
		// Using scandir picks up . & .. in linux environments, here we're cleaning the array of $block_directories.
		$block_directories = array_diff( $block_directories, array( '..', '.', '.DS_Store' ) );

		// Automatically register blocks.
		// Do not register dynamic block's here, this is done directly in dynamic block .php file.
		foreach ( $block_directories as $block ) {
			// Register blocks.
			// For reference: https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/.
			register_block_type(
				DGWYER_PLUGIN_SLUG . "/$block",
				array(
					'style'         => DGWYER_PLUGIN_SLUG . '-block',
					'editor_style'  => DGWYER_PLUGIN_SLUG . '-block-editor',
					'editor_script' => DGWYER_PLUGIN_SLUG . '-block-editor',
				)
			);
		};
	}
}
