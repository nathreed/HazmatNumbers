# HazmatNumbers

Have you ever been driving on the highway, noticed a hazmat placard with a UN number on it, and wondered what that vehicle was carrying? Wonder no more, with this simple app for iOS. It integrates all UN numbers into Spotlight Search so you can quickly and easily identify any substance by typing "UN xxxx" into the Spotlight bar.

## Prep  

Because this app relies on copyrighted data from the UN and I don't want to get involved with requesting permission to use it, you'll have to download and process the data yourself. At some point, I might include a script to automate it, but for the time being, here are the steps I followed:  
1. Use [extractpdf.com](https://www.extractpdf.com) to get the text of [this](http://www.unece.org/fileadmin/DAM/trans/danger/publi/unrec/rev18/English/Rev18_Volume1_Part3andApp.pdf) PDF.    
2. In the resulting text file, remove everything before line 414 (including line 413). *After* you have done this, remove everything after line 56295 (where the data ends and the random text starts) and set `rawFileData` in `parser.js` to be the path to this edited file.  
3. Run `node parser.js` and check that you get output that looks like JSON data of the chemicals. As long as you see something resembling JSON, it should be good.
4. Once you have checked this, run `node parser.js >> un.json` to output to `un.json`.  
5. Copy `un.json` to the main folder of the iOS app (iOS App/HazmatSearch)  

Now you are ready to compile and run the app from Xcode 9 or higher (required for Swift 4 compatibility). It will add the UN numbers to the spotlight index at first launch (it does nothing else) and at that point you need only keep in on the device in a folder somewhere and you will always be able to search for UN numbers.

Uses [SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON).

App icon resized from [this](https://propaneoutfitters.com/wp-content/uploads/2016/07/PROPANE-HASMAT-NFPA-OSHA-LABEL-SIGN.png) image using [makeappicon.com](https://makeappicon.com).

License: MIT
