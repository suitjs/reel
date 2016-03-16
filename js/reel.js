/**
* Class that implements the animation/tweening features of SuitJS.
* @class
* @type Reel
*/
var Reel;
(function(window,document,body) {

	"use strict";

	console.log("Reel> Init v1.0.0");

	if(window.Servant==null) { console.error("Reel> Servant framework wasn't found!"); return { add: function(){}, stop: function(){} }; }
    
     /**
     * Function that transforms the animation progress and eases the rate of change of the animated value.
     * @callback Easing
     * @param {Number} p_progress - Animation progress inside the range `[0.0,1.0]`.
     * @returns {Number} - Returns the mapped progress inside the range `[0.0,1.0]`.
     */     
    
     /**
     * Animation node.
     * @typedef {Object} ReelAnimation
     * @property {Object} target - Target object being animated.
     * @property {String} property - Property name.
     * @property {Object} value - Final value.
     * @property {Easing} easing - Animation easing.
     * @property {Number} delay - Delay in seconds.
     * @property {Number} duration - Duration in seconds.
     * @property {Number} elapsed - Elapsed time of execution in seconds.
     * @property {Number} progress - Animation progress in the range `[0.0,1.0]`.
     * @property {?(String|Function)} oncomplete - On complete callback. Can be either a function or `Suit`notification string. 
     * @property {?Boolean} runOnBackground - Flag that indicates this node will keep running when the tab isn't focused.
     * @property {Function} update() - Execution method.     
     */ 
    
	/**
	* List of active animations.
    * @type {ReelAnimation[]}
	*/
	Reel.list = [];

	/**
	* Default duration in seconds when none is specified.
    * @type {Number}
	*/
	Reel.defaultDuration = 0.3;

	//Default easing.
	var m_easingLinear  = function easingLinear(r) { return r; };
    
    /**
     * Default easing when none is specified.
     * @type {Easing}
     */
	Reel.defaultEasing = m_easingLinear;

    /**
     * Adds an Animation to the execution loop.
	 * @param  {Object} p_target - Target object being animated.
	 * @param  {String} p_property - Property to animate.
	 * @param  {Object} p_value - Final value of the property.
	 * @param  {?Number} p_duration - Duration in seconds. Defaults to `Reel.defaultDuration`.
	 * @param  {?Number} p_delay - Delay before animation. Defaults to `0.0`.
	 * @param  {?Easing} p_easing - Animation easing. Defaults to `Linear`.
	 * @param  {?Boolean} p_run_on_background - Flag that indicates the loop will keep running when the tab isn't focused.
     * @returns {ReelAnimation} - Reference to the animation node created.
	 */    
	Reel.add =	
	function add(p_target,p_property,p_value,p_duration,p_delay,p_easing,p_run_on_background) {  

		var a 		   = Servant;		
		var dl 		   = p_delay    == null ? 0.0 : p_delay;
		var d  		   = p_duration == null ? Reel.defaultDuration : p_duration;
		var fn 		   = p_easing   == null ? Reel.defaultEasing : p_easing;
		var hasStart  = false;
		var hasFinish = false;
		var v0		   = null;		
		var l		   = Reel.list;
		var isString  = typeof(p_target[p_property]) == "string";
		var isNumber  = typeof(p_target[p_property]) == "number";
		var isObject  = typeof(p_target[p_property]) == "object";
		var vf		   = isString ? (p_value+"") : p_value;
		var unit       = "";
		var isColor   = false;
		
		var c		   = {r:0,g:0,b:0};

		if(isString) {

			var v   = vf.toLowerCase();
			unit    = v.indexOf("px") >= 0 ? "px" : (v.indexOf("%") >= 0 ? "%" : "");
			isColor = (v.indexOf("rgb") >= 0) ? true : false;			

			if(!isColor) {

				if(v.indexOf("#")>=0) {

					v      = v.replace("#","");
					var cr = parseInt(v.length >= 6 ? v.substr(0,2) : v.substr(0,1)+v.substr(0,1),16);
					var cg = parseInt(v.length >= 6 ? v.substr(2,2) : v.substr(1,1)+v.substr(1,1),16);
					var cb = parseInt(v.length >= 6 ? v.substr(4,2) : v.substr(2,1)+v.substr(2,1),16);
					vf = "rgb("+cr+","+cg+","+cb+")";
					isColor = true;
				}
			}
		}
		
		var res = 
		a.run(function(n) {			

			if(!hasStart) {

				Reel.stop(p_target,p_property,[n]);				

				v0 = p_target[p_property];				
				if(isString) {					

					if(isColor) {

						if(v0 == "") v0 = "rgb(255,255,255)";						
						v0 = v0.replace("rgb","").replace("(","").replace(")","").split(",");									
						vf = vf.replace("rgb","").replace("(","").replace(")","").split(",");						
						v0 = {r: parseInt(v0[0]), g: parseInt(v0[1]), b: parseInt(v0[2])};
						vf = {r: parseInt(vf[0]), g: parseInt(vf[1]), b: parseInt(vf[2])};
					}
					else {

						if(v0 == "") v0 = p_property == "opacity" ? "1.0" : "0.0";
						v0 = v0.replace(unit,"");
						v0 = unit == "" ? parseFloat(v0) : parseInt(v0);					
						vf = vf.replace(unit,"");
						vf = unit == "" ? parseFloat(vf) : parseInt(vf);
					}					
				}										
				hasStart = true;				
			}
			
			var v1 = null;
			
			if(isString) {

				if(isColor) {

					c.r = Math.floor(v0.r + (vf.r-v0.r) * fn(n.progress));
					c.g = Math.floor(v0.g + (vf.g-v0.g) * fn(n.progress));
					c.b = Math.floor(v0.b + (vf.b-v0.b) * fn(n.progress));
					v1 = "rgb("+c.r+","+c.g+","+c.b+")";

				}
				else {

					var res = v0 + (vf-v0) * fn(n.progress);
					
					if(unit!="") res = Math.floor(res);

					v1 = res+""+unit;
				}
			}
			else {

				v1 = v0 + (vf-v0) * fn(n.progress);

			}	

			p_target[p_property] = v1;
			
			if(n.progress >= 1.0) {

				if(!hasFinish) { 


					if(n.oncomplete != null) {

						if(typeof(n.oncomplete)=="string") {
							if(window.Suit==null) { 
								console.error("Reel> Suit framework not found!"); 
							}
							window.Suit.controller.dispatch(n.oncomplete,n);
						}
						else {
							n.oncomplete(n);
						}
					}

					hasFinish=true; 
					var idx = l.indexOf(n);
					if(idx>=0) l.splice(idx,1);					
				}
			}			
		},d,dl,p_run_on_background);

		res.target   = p_target;
		res.property = p_property;
		res.value    = p_value;
		res.easing   = fn;
		res.delay    = dl;

		l.push(res);

		return res;
	};

    /**
     * Remove Animations that matches the specified criteria.
	 * @param  {Object} p_target - Target object being animated.
	 * @param  {?String} p_property - Property name to match. Defaults to `""` (stop all).
	 * @param  {?ReelAnimation[]} p_ignore_list - List of animation nodes that must be ignored in the query.	 
	 */    
	Reel.stop =    
	function stop(p_target,p_property,p_ignore_list) {		

		var l  	   = Reel.list;
		
		var il 	   = p_ignore_list == null ? [] : p_ignore_list;
		p_property = p_property == null ? "" : p_property;

		for(var i=0;i<l.length;i++) {

			var matchTarget = p_target == null ? true : (l[i].target == p_target);

			if(matchTarget) {

				var matchProperty = (l[i].property == p_property) || (p_property == "");

				if(matchProperty) {

					if(il.indexOf(l[i])<0) {

						Servant.remove(l[i]);
						l.splice(i--,1);
					}
				}
			}
		}
	};

})(window,document,document.body);