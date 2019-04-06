# Sprite ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@danehansen/sprite.svg) ![npm](https://img.shields.io/npm/dt/@danehansen/sprite.svg)

**Class** : public class [Sprite](https://github.com/danehansen/Sprite)  
**Inheritance** : [Sprite](https://github.com/danehansen/Sprite) > [EventDispatcher](https://github.com/danehansen/EventDispatcher) > Object  
**Subclasses** : [ForwardForward](https://github.com/danehansen/ForwardForward), [ForwardRewind](https://github.com/danehansen/ForwardRewind), [SuperSprite](https://github.com/danehansen/SuperSprite)

A sprite class designed to easily create/manipulate animated sprite sheets, somewhat based off of AS3’s MovieClip class. This class depends on GreenSock’s TweenLite, which is available at <http://greensock.com/>. This package is under a MIT license, but TweenLite, which it uses, has it's own licensing agreement, so your usage of this package must adhere to <https://greensock.com/licensing/>.

It is assumed that the sprite sheet will be laid out left to right, top to bottom. In addition to the layout of the sprite sheet, it is assumed that the element will be provided with a `background-image`.

    {
      background-imgage:url(http://goo.gl/XDwsNz);
    }

## Installation

`npm install --save @danehansen/sprite`

## Usage

As a module:

    import Sprite from '@danehansen/sprite';

    var s = new Sprite(document.getElementById('sprite'), 4, 30);

In your browser:

    <script src='danehansen-Sprite.min.js'></script>
    <script>
      var Sprite = window.danehansen.Sprite;
      var s = new Sprite(document.getElementById('sprite'), 4, 30);
    </script>

## Public Constants

- **COMPLETE** : String = 'COMPLETE'  
  [static] The Sprite.COMPLETE constant defines the value of the type property of a COMPLETE event object.
- **ENTER_FRAME** : String = 'ENTER_FRAME'  
  [static] The Sprite.ENTER_FRAME constant defines the value of the type property of a ENTER_FRAME event object.
- **REWIND_COMPLETE** : String = 'REWIND_COMPLETE'  
  [static] The Sprite.REWIND_COMPLETE constant defines the value of the type property of a REWIND_COMPLETE event object.

## Public Properties

- **ease** : Function  
  Easing method used to move playhead. Set to Linear.easeNone by default.
- **element** : Element  
  [Read-only] DOM Element manipulated.
- **frameRate** : unit  
  The rate per second at which the sprite will play through. Set to 60 by default.
- **frames** : uint  
  [Read-only] Number of frames in sprite.

## Public Methods

- **Sprite**(element:Element, columns:uint, totalFrames:uint, loop:Boolean = false, frameRate:uint = 60)  
  Creates a Sprite object, using a provided DOM element, number of columns of the sprite sheet background image, the total number of frames, whether it will loop or not, and the frame rate.
- **destroy**()  
  Kills any running animation of the sprite as well as calls clearEventListeners on the super class.
- **frame**(value:int):\*  
  Gets or sets the sprite’s frame. In a typical forward/rewind sprite, this number is limited between 0 and the total number of frames minus 1. In a looping sprite, this number can wrap and even be negative.
- **frameTo**(value:Number)  
  Similar to setting the frame, except that the sprite will play to that frame at the current frame rate.
- **loop**(value:Boolean):\*  
  Gets or sets the sprite’s loop value. If the beginning and end sprite frames are the same, then you want this set to true. Otherwise the sprite is confined to a finite timeline of 0 to 1.
- **nextFrame**()  
  Increments the sprite by one frame.
- **play**(loop:Boolean = false)  
  Causes the sprite to play at the current frame rate until the end frame is reached. If loop is set to true and is a looping type sprite, the sprite will play indefinitely.
- **prevFrame**()  
  Decrements the sprite by one frame.
- **progress**(value:Number):\*  
  Gets or sets the sprite’s progress. In a typical forward/rewind sprite, this number is limited between 0 and 1. In a looping sprite, this number can wrap and even be negative.
- **progressTo**(value:Number)  
  Similar to setting the progress, except that the sprite will play to that progress point at the current frame rate.
- **resize**()  
  Causes the sprite to recalculate it’s size. Only needed if the element has dynamic CSS sizing or if the element has been manually sized using JavaScript.
- **rewind**(loop:Boolean = false)  
  Causes the sprite to play backwards at the current frame rate until the first frame is reached. If loop is set to true and is a looping type sprite, the sprite will play indefinitely.
- **stop**()  
  Causes the sprite to stop any playback.

## Events

- **COMPLETE**  
  Dispatched whenever a Sprite object reaches it’s last frame.
- **ENTER_FRAME**  
  Dispatched whenever a Sprite object reaches a new frame.
- **REWIND_COMPLETE**  
  Dispatched whenever a Sprite object reaches it’s first frame.
