# HazmatNumbers

Have you ever been driving on the highway and noticed a hazmat placard with a UN number on it and wondered what that vehicle was carrying? Wonder no more, with this simple app for iOS. It integrates all UN numbers into Spotlight Search so you can quickly and easily identify any substance by typing "UN xxxx" into the Spotlight bar.

## Prep  

Because this app relies on copyrighted data from the UN and I don't want to get involved with requesting permission to use it, you'll have to download and process the data yourself. At some point, I might include a script to automate it, but for the time being, here are the steps I followed:  
1. I suggest using an online PDF text extractor to get the text of [this](http://www.unece.org/fileadmin/DAM/trans/danger/publi/unrec/rev18/English/Rev18_Volume1_Part3andApp.pdf) PDF. Really, use any online text extractor, they all do the same thing.    
2. In the resulting text file, remove everything after line 56295 (where the data ends and the random text starts) and set `rawFileData` in `parser.js` to be the path to this edited file.  
3. Run `node parser.js` to verify you get output that looks like JSON data of the chemicals.  
4. Once verified, run `node parser.js >> un.json` to output to `un.json`.  
5. Copy `un.json` to the main folder of the iOS app (iOS App/HazmatSearch)  

Now you are ready to compile and run the app from Xcode 9 or higher (required for Swift 4 compatibility). It will add the UN numbers to the spotlight index at first launch (it does nothing else) and at that point you need only keep in on the device in a folder somewhere and you will always be able to search for UN numbers.

Uses [SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON).

License: MIT