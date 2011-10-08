//
//  NativeMonocleViewController.m
//  NativeMonocle
//
//  Created by Greg Ball on 10/8/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import "NativeMonocleViewController.h"

@implementation NativeMonocleViewController
@synthesize webView;

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

- (void)viewDidLoad
{
    [super viewDidLoad];
    NSString *path = [[NSBundle mainBundle] pathForResource:@"www/test/showcase/01-velveteen/index" ofType:@"html"];
    NSURL *documentURL = [NSURL fileURLWithPath:path];
    
    [webView loadRequest:[NSURLRequest requestWithURL:documentURL]];
    self.navigationController.title = self.title;
}


- (void)viewDidUnload
{
    [self setWebView:nil];
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return YES;
}

- (void)dealloc {
    [webView release];
    [super dealloc];
}
@end
