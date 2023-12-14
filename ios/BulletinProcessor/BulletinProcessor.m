#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>

#if __has_include("Onnet/Onnet-Swift.h")
#import "Onnet/Onnet-Swift.h"
#else
#import "Onnet-Swift.h"
#endif

VISION_EXPORT_SWIFT_FRAME_PROCESSOR(BulletinProcessorPlugin, bulletinProcessor)