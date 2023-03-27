;(function(window) {

	'use strict';

	/**
	 * StackFx: The parent class.
	 */
	function StackFx(el) {
		this.DOM = {};
		this.DOM.el = el;
		this.DOM.stack = this.DOM.el.querySelector('.folio_stack');
		this.DOM.stackItems = [].slice.call(this.DOM.stack.children);
		this.totalItems = this.DOM.stackItems.length;
		this.DOM.img = this.DOM.stack.querySelector('.folio_img_holder > .folio_img');
		this.DOM.caption = this.DOM.el.querySelector('.folio_content');
		this.DOM.title = this.DOM.caption.querySelector('.folio_title');
	}

	StackFx.prototype._removeAnimeTargets = function() {
		anime.remove(this.DOM.stackItems);
		anime.remove(this.DOM.img);
		anime.remove(this.DOM.title);
	};
        
        /************************************************************************
	 * HamalFx.
	 ************************************************************************/
	function HamalFx(el) {
		StackFx.call(this, el);
		this._initEvents();
	}

	HamalFx.prototype = Object.create(StackFx.prototype);
	HamalFx.prototype.constructor = HamalFx;

	HamalFx.prototype._initEvents = function() {
		var self = this;
		this._mouseenterFn = function() {
			self._removeAnimeTargets();
			self._in();
		};
		this._mouseleaveFn = function() {
			self._removeAnimeTargets();
			self._out();
		};
		this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
		this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	};

	HamalFx.prototype._in = function() {
		var self = this;

		this.DOM.stackItems.map(function(e, i) {
			e.style.opacity = i !== self.totalItems - 1 ? 0.2*i+0.2 : 1
		});

		anime({
			targets: this.DOM.stackItems,
			duration: 1000,
			easing: 'easeOutExpo',
			translateY: function(target, index) {
				return -1*index*5;
			},
			rotate: function(target, index, cnt) {
				if( index === cnt - 1 ) {
					return 0;
				}
				else {
					return index%2 ? (cnt-index)*1 : -1*(cnt-index)*1;
				}
			},
			scale: function(target, index, cnt) {
				if( index === cnt - 1 ) {
					return 1;
				}
				else {
					return 1.05;
				}
			},
			delay: function(target, index, cnt) {
				return (cnt-index-1)*30
			}
		});
		
		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutExpo',
			scale: 0.7
		});
		
	};

	HamalFx.prototype._out = function() {
		var self = this;

		anime({
			targets: this.DOM.stackItems,
			duration: 500,
			easing: 'easeOutExpo',
			translateY: 0,
			rotate: 0,
			scale: 1,
			opacity: function(target, index, cnt) {
				return index !== cnt - 1 ? 0 : 1
			}
		});

		anime({
			targets: this.DOM.img,
			duration: 1000,
			easing: 'easeOutElastic',
			scale: 1
		});
	};

	window.HamalFx = HamalFx;
        
})(window);

(function () {
    [].slice.call(document.querySelectorAll('.folio_effect > .folio_item')).forEach(function (stackEl) {
        new HamalFx(stackEl);
    });
})();