import VisionCamera

@objc(BulletinProcessorPlugin)
public class BulletinProcessorPlugin: FrameProcessorPlugin {
  public override init(options: [AnyHashable: Any]! = [:]) {
    super.init(options: options)
  }

  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?) -> Any? {
    let buffer = frame.buffer
    let orientation = frame.orientation
    // code goes here
    return nil
  }
}