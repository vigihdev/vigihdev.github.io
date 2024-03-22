
// google-maps
(function ($) {
    "use strict";
    const TAG = 'GoogleMaps'
    const ELEMENT = '.google-maps';


    /**
     * @param {() => void} callback
     * @param {number} ms
     * @return {Promise<void>}
     */
    const timeOut = (ms, callback) => new Promise(resolve => setTimeout(resolve, ms)).then(callback);


    class GoogleMaps {

        /** @type {Object<string,string|boolean|number>} */
        options = {
            // , 
            // -8.14534597667424, 112.305452
            center: {
                lat: -8.14534597667424,
                lng: 112.305452
            },
            zoom: 18,
            mapTypeControl: false,
            fullscreenControl: false,
            panControl: false,
            scaleControl: false,
            disableDefaultUI: true
        }

        #cssMap = {
            display: 'block',
            position: 'relative',
            width: '100%',
            height: '400px',
        }

        /** @type {JQuery<ELEMENT>} */
        $element

        /** @type {string} */
        #address = "V835+H7H, Gading, Selopuro, RT.03/RW.06, Gading, Kec. Selopuro, Kabupaten Blitar, Jawa Timur 66184";

        map;
        /**
        * 
        * @param {Element} element
        */
        constructor(element) {
            this.$element = $(element)
            this.options = $.extend({}, this.options, $(element).data());
            this.renderMap();
            const self = this;
        }

        async renderMap() {
            const maps = await new google.maps.Map(this.$element.get(0), this.options)
            this.map = maps;
            this.$element.css(this.#cssMap)
            this.geocoder();
            // this.$element.css({ width: $(window).outerWidth() + 'px', height: $(window).outerHeight() + 'px' })
        }

        geocoder() {
            const address = "V835+H7H, Gading, Selopuro, RT.03/RW.06, Gading, Kec. Selopuro, Kabupaten Blitar, Jawa Timur 66184";
            const self = this;
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == 'OK') {
                    self.map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: self.map,
                        position: results[0].geometry.location
                    });
                }
            });
        }

        #mapEvent() { }
        #infoWIndow() { }

        #setMarker() { }

        static validate() {
            return $(ELEMENT).length > 0 && typeof window['google'] === 'object';
        }

        static instance() {
            timeOut(1000, () => {
                if (GoogleMaps.validate()) {
                    new GoogleMaps($(ELEMENT).get(0))
                }
            })

        }
    }
    GoogleMaps.instance();

})(jQuery); 



