package com.onnet.bulletinprocessor;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.mrousavy.camera.frameprocessor.Frame;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;
import java.util.Map;

public class BulletinProcessorPlugin extends FrameProcessorPlugin {
  /**
   * The initializer of this Frame Processor Plugin.
   * This is called everytime this Frame Processor Plugin is loaded from the JS side (`initFrameProcessorPlugin(..)`).
   * Optionally override this method to implement custom initialization logic.
   *
   * @param options An options dictionary passed from the JS side, or null if none.
   */
  public BulletinProcessorPlugin(@Nullable Map<String, Object> options) {
  }

  @Nullable
  @Override
  public Object callback(@NonNull Frame frame, @Nullable Map<String, Object> arguments) {
    // code goes here
    return null;
  }
}