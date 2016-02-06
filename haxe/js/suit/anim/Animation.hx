package js.suit.anim;
import haxe.ds.Either;

/**
 * Class that implements a Animation task returned by reel.
 * @author eduardo-costa
 */
extern class Animation
{
	/**
	 * Progress of the execution.
	 */
	public var progress : Float;

	/**
	 * Duration of the Task.
	 */
	public var duration : Float;
	
	/**
	 * Current execution time (negative if it has delay).
	 */
	public var elapsed : Float;
	
	/**
	 * Target object being animated.
	 */
	public var target : Dynamic;

	/**
	 * Property being animated.
	 */
	public var property : String;

	/**
	 * Property final value.
	 */
	public var value : Dynamic;
		
	/**
	 * Easing function being used.
	 */
	public var easgin : Float->Float;
		
	/**
	 * Delay used.
	 */
	public var delay : Float;
	
	/**
	 * OnComplete handler. Can be either a function on Suit's controller event string.
	 */
	public var oncomplete : Either<Animation->Void,String>;
		
}