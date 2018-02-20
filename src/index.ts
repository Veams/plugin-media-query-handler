'use strict';

/**
 * Imports
 */
import extend from "@veams/helpers/lib/object/extend";
import throttle from "@veams/helpers/lib/operator/throttle";

/**
 * Interfaces
 */
export interface MediaQueryHandlerOptions {
	mediaQueryProp?: string,
	delay?: number
}

export interface MediaQueryHandlerPlugin {
	options: MediaQueryHandlerOptions,
	pluginName: string,
	initialize: any
}

/**
 * Plugin
 */
const VeamsMediaQueryHandler: MediaQueryHandlerPlugin = {
	options: {
		mediaQueryProp: 'font-family',
		delay: 300
	},
	pluginName: 'MediaQueryHandler',
	initialize: function (Veams, opts: MediaQueryHandlerOptions) {
		// Media Query
		let head = document.querySelectorAll('head');

		if (opts) {
			this.options = extend(this.options, opts || {});
		}

		/**
		 * Add current media query to Veams
		 */
		Veams.currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(this.options.mediaQueryProp);

		if (!Veams.Vent) {
			console.info('@veams/plugin-media-query-handler :: In order to work properly with the VeamsMediaQueryHandler plugin you should add the VeamsVent plugin!');
		}

		// Trigger global resize event
		window.onresize = throttle((e) => {
			let currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(this.options.mediaQueryProp);
			let width = window.innerWidth;

			if (currentMedia !== Veams.currentMedia) {
				let oldMedia = Veams.currentMedia;

				Veams.currentMedia = currentMedia;

				console.info(`@veams/plugin-media-query-handler :: Current media is ${Veams.currentMedia}`);

				if (Veams.Vent) {
					Veams.Vent.trigger(Veams.EVENTS.mediachange, {
						type: Veams.EVENTS.mediachange,
						currentMedia: currentMedia,
						oldMedia: oldMedia
					});
				}
			}

			Veams.detections.width = width;
			if (Veams.Vent) {
				Veams.Vent.trigger(Veams.EVENTS.resize, e);
			}
		}, this.options.delay);
	}
};

export default VeamsMediaQueryHandler;