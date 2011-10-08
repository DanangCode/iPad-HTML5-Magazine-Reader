This is a very basic iphone ereader.
I have used the 2.2.0 version of the Monacle html5 ebook reader. at https://github.com/joseph/Monocle

I have created a super simple xcode 4 project which creates a uiwebview and loads it with the /www/test/showcase/01-velveteen/index.html file. which is the main demo for the Monocle ereader.

See the Monocle documents for examples of how to alter the Book format using basic html. 

This architecture allows you to reuse the Monocle ebook format in other HTML5 compliant architectures. including
1) html5 webpage for desktop and mobile device.
2) javascript enabled blog (tumblr)
3) ios native
4) android native
5) the html content can also be saved as an ebook (epub/mobi) to be read on a kindle or nook.


drawbacks compared to a pure ios book like https://github.com/jaspergregory/Ipad-photo-magazine
1) the scrolling animations are not as clean.
2) this version does not let you swipe, it reacts to tap/clicks (a framework like jquery mobile solve this but it is slow on older mobile devices)

Drawbacks of the default Monocle velveteen rabbit book. 
1) the size is hardcoded as 300px by 420px. this work on iphone but not ipad or browser.
