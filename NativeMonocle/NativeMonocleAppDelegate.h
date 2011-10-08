//
//  NativeMonocleAppDelegate.h
//  NativeMonocle
//
//  Created by Greg Ball on 10/8/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

@class NativeMonocleViewController;

@interface NativeMonocleAppDelegate : NSObject <UIApplicationDelegate>

@property (nonatomic, retain) IBOutlet UIWindow *window;

@property (nonatomic, retain) IBOutlet NativeMonocleViewController *viewController;

@end
