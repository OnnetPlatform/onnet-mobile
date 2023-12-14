//
//  BulletinFrameProcessorPlugin.swift
//  Onnet
//
//  Created by Muhammad Saleh on 10/12/2023.
//
import Foundation
import VisionCamera
import UIKit
import SocketIO
import WebRTC

@objc(BulletinFrameProcessorPlugin)
public class BulletinFrameProcessorPlugin: FrameProcessorPlugin {
  private  let context = CIContext(options: nil)

  public override init(options: [AnyHashable : Any]! = [:]) {

    super.init(options: options)
  }

  @objc
  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable : Any]?) -> Any {
    
    let buffer = frame.buffer
    guard let imageBuffer = CMSampleBufferGetImageBuffer(frame.buffer) else {
          print("Failed to get CVPixelBuffer!")
          return buffer
        }
        let ciImage = CIImage(cvPixelBuffer: imageBuffer)

        guard let cgImage = context.createCGImage(ciImage, from: ciImage.extent) else {
          print("Failed to create CGImage!")
          return buffer
        }
        let image = UIImage(cgImage: cgImage)
        let imageData = image.jpegData(compressionQuality: 100)
        let base64 = imageData?.base64EncodedString()
        return base64 ?? ""
    }
}
