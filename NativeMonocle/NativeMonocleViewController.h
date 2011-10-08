//
//  NativeMonocleViewController.h
//  NativeMonocle
//
//  Created by Greg Ball on 10/8/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface NativeMonocleViewController : UIViewController {
    UIWebView *webView;
}

@property (nonatomic, retain) IBOutlet UIWebView *webView;

@end
