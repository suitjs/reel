[<img src="http://www.suitjs.com/img/logo-suitjs.svg?v=2" width="256" alt="SuitJS">](http://www.suitjs.com/)
# Reel

Animate your work using a Reel!  
  
This tool offers a `requestAnimationFrame` based property interpolator.
Efficiently animate properties such as:
* Numbers
* Size/Position using `px` `em` `%` `rem` and **[others](https://developer.mozilla.org/en/docs/Web/CSS/length)**
* Color properties using `#` or `rgba(...)`
* Transform - TBD
  
It requires **[SuitJS - Servant](https://github.com/suitjs/servant)** to work.

# Install
#### Download
* Download either the `reel.js` or `reel.min.js` sources.
* Download either the `servant.js` or `servant.min.js` sources.
* Add the tag `<script src="js/suitjs/servant.js"></script>`
* Add the tag `<script src="js/suitjs/reel.js"></script>`

#### Bower
* Servant is available as bower package.
* Run `bower install suitjs-reel`
* It will install all script versions.
* Add the tag `<script src="bower_components/suitjs-reel/js/reel.js"></script>`

#### CDN
* TBD

#### Build
* Run `npm run init` once
* `npm run build`

# Usage
After adding the script tag, the `Reel` global variable will be available.  
 
#### Hello World


```js
var b = document.body;

//Animates the 'backgroundColor' property to red during 0.5s waiting 1s to start.
//Uses the Cubic Out easing.
var anim = Reel.add(b.style,"backgroundColor","#f00",0.5,1.0,Cubic.out);
anim.oncomplete = function() {
    console.log("Finished!");
};

```

# Documentation
For in depth information of the API, visit the **[documentation](http://www.suitjs.com/docs/)**.  
Easing Curves based on **[Robert Penner](http://robertpenner.com/easing/)**'s work.  
A really good guide on those curves can be found **[here](http://easings.net/)**.
 

# Examples
Usage examples can be found at **[CodePen](http://codepen.io/collection/XOyEpq/)**.

  
  
   