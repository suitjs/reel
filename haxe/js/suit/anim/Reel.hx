package js.suit.anim;

/**
 * Class that implements the animation/tweening features of SuitJS.
 * @author eduardo-costa
 */
extern class Reel
{

	/**
	 * Default duration when the information is not informed.
	 */
	static public var defaultDuration : Float;
	
	/**
	 * Default easing function when none is informed.
	 */
	static public var defaultEasing : Float->Float;
	
	/**
	 * List of running animations.
	 */
	static public var list : Array<Animation>;
	
	/**
	 * Adds a new animation to the pool.
	 * @param	p_target
	 * @param	p_property
	 * @param	p_value
	 * @param	p_duration
	 * @param	p_delay
	 * @param	p_easing
	 * @param	p_run_on_background
	 * @return
	 */
	static public function add(p_target : Dynamic,p_property:String,p_value:Dynamic,p_duration:Float=0.3,p_delay:Float=0.0,p_easing : Float->Float=null,p_run_on_background:Bool=false):Animation;
	
	/**
	 * Stops animations matching the criteria.
	 * @param	p_target
	 * @param	p_property
	 * @param	p_ignore_list
	 */
	static public function stop(p_target:Dynamic,p_property:String="",p_ignore_list:Array<Animation>=null):Void;
	
}