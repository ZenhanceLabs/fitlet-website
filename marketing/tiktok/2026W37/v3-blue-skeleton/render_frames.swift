import AppKit
import Foundation

let root = "/Users/berry/Dev/Fitlet"
let out = "\(root)/marketing/tiktok/2026W37/v3-blue-skeleton/frames"
let W: CGFloat = 1080
let H: CGFloat = 1920
let bold = "Hiragino Sans W7"
let regular = "Hiragino Sans W4"

try? FileManager.default.createDirectory(atPath: out, withIntermediateDirectories: true)

func color(_ hex: UInt32, _ alpha: CGFloat = 1) -> NSColor {
    NSColor(calibratedRed: CGFloat((hex >> 16) & 0xff) / 255,
            green: CGFloat((hex >> 8) & 0xff) / 255,
            blue: CGFloat(hex & 0xff) / 255,
            alpha: alpha)
}

func load(_ path: String) -> NSImage {
    guard let result = NSImage(contentsOfFile: path) else { fatalError("Missing image: \(path)") }
    return result
}

func canvas(_ draw: () -> Void) -> NSImage {
    let result = NSImage(size: NSSize(width: W, height: H))
    result.lockFocusFlipped(true)
    NSGraphicsContext.current?.imageInterpolation = .high
    draw()
    result.unlockFocus()
    return result
}

func fill(_ c: NSColor) { c.setFill(); NSRect(x: 0, y: 0, width: W, height: H).fill() }

func contain(_ source: NSImage, _ rect: NSRect, alpha: CGFloat = 1) {
    let scale = min(rect.width / source.size.width, rect.height / source.size.height)
    let size = NSSize(width: source.size.width * scale, height: source.size.height * scale)
    let dest = NSRect(x: rect.midX - size.width / 2, y: rect.midY - size.height / 2, width: size.width, height: size.height)
    source.draw(in: dest, from: NSRect(origin: .zero, size: source.size), operation: .sourceOver, fraction: alpha, respectFlipped: true, hints: [.interpolation: NSImageInterpolation.high])
}

func crop(_ source: NSImage, sourceRect: NSRect, _ dest: NSRect, alpha: CGFloat = 1) {
    source.draw(in: dest, from: sourceRect, operation: .sourceOver, fraction: alpha, respectFlipped: true, hints: [.interpolation: NSImageInterpolation.high])
}

func rounded(_ rect: NSRect, _ radius: CGFloat, _ c: NSColor) { c.setFill(); NSBezierPath(roundedRect: rect, xRadius: radius, yRadius: radius).fill() }

func text(_ value: String, _ rect: NSRect, _ size: CGFloat, _ c: NSColor, _ weight: NSFont.Weight = .bold, _ align: NSTextAlignment = .left) {
    let font = NSFont(name: weight == .regular ? regular : bold, size: size) ?? NSFont.systemFont(ofSize: size, weight: weight)
    let paragraph = NSMutableParagraphStyle(); paragraph.alignment = align; paragraph.lineSpacing = 6
    NSAttributedString(string: value, attributes: [.font: font, .foregroundColor: c, .paragraphStyle: paragraph]).draw(with: rect, options: [.usesLineFragmentOrigin, .usesFontLeading])
}

func caption(_ value: String, y: CGFloat, size: CGFloat = 52) {
    rounded(NSRect(x: 54, y: y, width: 972, height: size + 54), 18, color(0x05070A, 0.68))
    text(value, NSRect(x: 82, y: y + 22, width: 916, height: size + 8), size, .white)
}

func save(_ value: NSImage, _ name: String) {
    guard let tiff = value.tiffRepresentation, let bitmap = NSBitmapImageRep(data: tiff), let png = bitmap.representation(using: .png, properties: [:]) else { fatalError("Encode failed") }
    try! png.write(to: URL(fileURLWithPath: "\(out)/\(name)"))
}

let home = load("\(root)/assets/png/onboarding/1.png")
let workout = load("\(root)/assets/png/onboarding/2.png")
let league = load("\(root)/assets/png/onboarding/3.png")

// The exact source crop deliberately removes most chrome and keeps the cyan pose skeleton as the unexplained subject.
// NSImage exposes the 1170x2532 Retina PNG at its 585x1266 logical size.
let skeletonCrop = NSRect(x: 35, y: 280, width: 515, height: 590)
let skeletonWide = NSRect(x: 0, y: 210, width: 585, height: 755)

save(canvas {
    fill(color(0x070B10))
    crop(workout, sourceRect: skeletonCrop, NSRect(x: 0, y: 0, width: W, height: H))
    rounded(NSRect(x: 0, y: 0, width: W, height: H), 0, color(0x000000, 0.25))
    text("これ、私にしか見えない？", NSRect(x: 60, y: 150, width: 960, height: 100), 62, .white)
}, "frame-00-skeleton-close.png")

save(canvas {
    fill(color(0x070B10))
    crop(workout, sourceRect: skeletonCrop, NSRect(x: -30, y: -25, width: 1140, height: 1970))
    rounded(NSRect(x: 0, y: 0, width: W, height: H), 0, color(0x000000, 0.18))
    caption("え、動いた", y: 1500, size: 58)
}, "frame-01-skeleton-follow.png")

save(canvas {
    fill(color(0x070B10))
    crop(workout, sourceRect: skeletonWide, NSRect(x: 0, y: 0, width: W, height: H))
    rounded(NSRect(x: 0, y: 0, width: W, height: H), 0, color(0x000000, 0.12))
    caption("ずっとついてくるんだけど", y: 1510, size: 54)
}, "frame-02-skeleton-wide.png")

save(canvas {
    fill(color(0x070B10))
    crop(workout, sourceRect: skeletonWide, NSRect(x: -18, y: -18, width: 1116, height: 1956))
    rounded(NSRect(x: 0, y: 0, width: W, height: H), 0, color(0x000000, 0.10))
}, "frame-03-skeleton-repeat.png")

save(canvas {
    fill(color(0x000000))
    text("", NSRect(x: 0, y: 0, width: 1, height: 1), 1, .clear)
}, "frame-04-silence.png")

save(canvas {
    fill(color(0x111820))
    contain(workout, NSRect(x: 36, y: 0, width: 1008, height: 1920))
    caption("フィットネスかよ", y: 1500, size: 58)
}, "frame-05-workout-reveal.png")

save(canvas {
    fill(color(0x111820))
    contain(league, NSRect(x: 36, y: 0, width: 1008, height: 1920))
    caption("しかもランク戦ある", y: 1500, size: 52)
}, "frame-06-league-reveal.png")

save(canvas {
    fill(color(0x111820))
    contain(home, NSRect(x: 36, y: 0, width: 1008, height: 1920))
    caption("気づいたら7日やってた", y: 1500, size: 52)
}, "frame-07-home-reveal.png")

save(canvas {
    fill(color(0x111820))
    contain(workout, NSRect(x: 36, y: 0, width: 1008, height: 1920))
    rounded(NSRect(x: 58, y: 1500, width: 360, height: 92), 20, color(0x000000, 0.68))
    text("残り7回。", NSRect(x: 84, y: 1522, width: 310, height: 54), 50, .white)
    text("Fitlet", NSRect(x: 74, y: 1680, width: 220, height: 52), 24, color(0xFFFFFF, 0.84), .regular)
}, "frame-08-loop-out.png")
