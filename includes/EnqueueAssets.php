<?php
/**
 * Enqueue script and style assets.
 *
 * @package Dgwyer
 */

namespace Dgwyer;

/**
 * Enqueue script and style assets.
 *
 * @since 1.0.0
 */
class EnqueueAssets {

	/**
	 * Register class with appropriate WordPress hooks
	 */
	public static function register() {
		$instance = new self();
		add_action( 'init', array( $instance, 'enqueue_styles' ) );
	}

	/**
	 * Enqueue styles.
	 *
	 * @return void
	 */
	public function enqueue_styles() {

		// Enqueue tailwind styles.
		wp_enqueue_style(
			DGWYER_PLUGIN_SLUG . '-tailwind',
			DGWYER_PLUGIN_URL . 'build/tailwind.css',
			array(),
			DGWYER_PLUGIN_VERSION
		);
	}
}
