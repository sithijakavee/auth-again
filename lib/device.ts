export function getDeviceDetails(userAgent: string): {
  device: string;
  imageUrl: string;
} {
  // Apple-specific checks
  if (/iPhone/i.test(userAgent)) {
    return {
      device: "iPhone",
      imageUrl: "iphone.png",
    };
  }
  if (/iPad/i.test(userAgent)) {
    return { device: "iPad", imageUrl: "ipad.png" };
  }
  if (/Macintosh/i.test(userAgent)) {
    return {
      device: "Mac (macOS)",
      imageUrl: "macos.png",
    };
  }

  // Windows-specific checks
  if (/Windows NT/i.test(userAgent)) {
    return {
      device: "Windows PC",
      imageUrl: "windows.png",
    };
  }

  // Android-specific checks
  if (/Android/i.test(userAgent)) {
    if (/Mobile/i.test(userAgent)) {
      return {
        device: "Android Phone",
        imageUrl: "phone.png",
      };
    }
    return {
      device: "Android Tablet",
      imageUrl: "tablet.png",
    };
  }

  // ChromeOS check
  if (/CrOS/i.test(userAgent)) {
    return {
      device: "Chrome OS Device",
      imageUrl: "chromeos.png",
    };
  }

  // Generic mobile and tablet fallback
  if (/Mobi/i.test(userAgent)) {
    return {
      device: "Mobile Device",
      imageUrl: "phone.png",
    };
  }
  if (/Tablet/i.test(userAgent)) {
    return {
      device: "Tablet Device",
      imageUrl: "tablet.png",
    };
  }

  // Linux fallback
  if (/Linux/i.test(userAgent)) {
    return {
      device: "Linux Device",
      imageUrl: "linux.png",
    };
  }

  // Browser fallback
  const browserRegex = /(Firefox|Chrome|Safari|Edge|Opera|MSIE|Trident)\/(\d+)/;
  const browserMatch = userAgent.match(browserRegex);
  if (browserMatch) {
    return {
      device: `${browserMatch[1]} Browser (v${browserMatch[2]})`,
      imageUrl: "browser.png",
    };
  }

  // Unknown device fallback
  return {
    device: "Unknown Device",
    imageUrl: "unknown.png",
  };
}
