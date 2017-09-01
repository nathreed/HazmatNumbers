//
//  ViewController.swift
//  HazmatSearch
//
//  Created by Nathan Reed on 8/30/17.
//  Copyright © 2017 Nathan Reed. See license applying to this particular project.
//

import UIKit
import CoreSpotlight
import MobileCoreServices

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        CSSearchableIndex.default().deleteAllSearchableItems(completionHandler: {({ (error) in
            print(error)
        })}())
        
        //load up our data JSON file, parse through it, and add each item to the spotlight index
        if let path = Bundle.main.path(forResource: "un", ofType: "json") {
            do {
                let data = try Data(contentsOf: URL(fileURLWithPath: path), options: .alwaysMapped)
                let jsonObj = try JSON(data: data)
                if jsonObj != JSON.null {

                    for item in jsonObj {
                        let searchableItemAttributeSet = CSSearchableItemAttributeSet(itemContentType: kUTTypeText as String)
                        
                        searchableItemAttributeSet.title = "UN " + item.1["number"].string!
                        searchableItemAttributeSet.contentDescription = item.1["name"].string! + " " + item.1["description"].string!
                        
                        let uuid = UUID()
                        
                        let searchableItem = CSSearchableItem(uniqueIdentifier: "com.nathanreed.HazmatSearch.\(uuid)", domainIdentifier: "hazmat", attributeSet: searchableItemAttributeSet)
                        
                        CSSearchableIndex.default().indexSearchableItems([searchableItem], completionHandler: { (error) -> Void in
                            if error != nil {
                                print(error?.localizedDescription as Any)
                            }
                        })
                        
                        
                        
                    }
                } else {
                    print("Could not get json from file, make sure that file contains valid json.")
                }
            } catch let error {
                print(error.localizedDescription)
            }
        } else {
            print("Invalid filename/path.")
        }
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

