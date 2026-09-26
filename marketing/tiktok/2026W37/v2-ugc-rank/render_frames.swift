import AppKit
import Foundation

let root = "/Users/berry/Dev/Fitlet"
let out = "\(root)/marketing/tiktok/2026W37/v2-ugc-rank/frames"
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

func image(_ path: String) -> NSImage {
    guard let value = NSImage(contentsOfFile: path) else { fatalError("Missing image: \(path)") }
    return value
}

func canvas(_ draw: () -> Void) -> NSImage {
    let result = NSImage(size: NSSize(width: W, height: H))
    result.lockFocusFlipped(true)
    NSGraphicsContext.current?.imageInterpolation = .high
    draw()
    result.unlockFocus()
    return result
}

func fill(_ c: NSColor) {
    c.setFill()
    NSRect(x: 0, y: 0, width: W, height: H).fill()
}

func drawContain(_ source: NSImage, in rect: NSRect, alpha: CGFloat = 1) {
    let size = source.size
    let scale = min(rect.width / size.width, rect.height / size.height)
    let dest = NSRect(x: rect.midX - size.width * scale / 2,
                      y: rect.midY - size.height * scale / 2,
                      width: size.width * scale,
                      height: size.height * scale)
    source.draw(in: dest, from: NSRect(origin: .zero, size: size), operation: .sourceOver, fraction: alpha, respectFlipped: true, hints: [.interpolation: NSImageInterpolation.high])
}

func roundRect(_ rect: NSRect, radius: CGFloat, fill c: NSColor) {
    c.setFill()
    NSBezierPath(roundedRect: rect, xRadius: radius, yRadius: radius).fill()
}

func text(_ value: String, _ rect: NSRect, size: CGFloat, color c: NSColor, weight: NSFont.Weight = .bold, align: NSTextAlignment = .left) {
    let font = NSFont(name: weight == .regular ? regular : bold, size: size) ?? NSFont.systemFont(ofSize: size, weight: weight)
    let paragraph = NSMutableParagraphStyle()
    paragraph.alignment = align
    paragraph.lineBreakMode = .byWordWrapping
    paragraph.lineSpacing = 8
    NSAttributedString(string: value, attributes: [
        .font: font,
        .foregroundColor: c,
        .paragraphStyle: paragraph
    ]).draw(with: rect, options: [.usesLineFragmentOrigin, .usesFontLeading])
}

func save(_ value: NSImage, _ name: String) {
    guard let tiff = value.tiffRepresentation,
          let bitmap = NSBitmapImageRep(data: tiff),
          let png = bitmap.representation(using: .png, properties: [:]) else { fatalError("Encode failed") }
    try! png.write(to: URL(fileURLWithPath: "\(out)/\(name)"))
}

let home = image("\(root)/assets/png/onboarding/1.png")
let workout = image("\(root)/assets/png/onboarding/2.png")
let league = image("\(root)/assets/png/onboarding/3.png")

save(canvas {
    fill(color(0x111820))
    roundRect(NSRect(x: 110, y: 255, width: 860, height: 1410), radius: 34, fill: color(0x05070A))
    drawContain(league, in: NSRect(x: 132, y: 277, width: 816, height: 1366), alpha: 0.50)
    roundRect(NSRect(x: 0, y: 0, width: W, height: 310), radius: 0, fill: color(0x111820, 0.76))
    text("これ何の順位？", NSRect(x: 64, y: 155, width: 952, height: 115), size: 72, color: .white)
    text("友達のスマホを覗いた", NSRect(x: 66, y: 84, width: 900, height: 42), size: 24, color: color(0xB9C2C8), weight: .regular)
}, "frame-00-hook.png")

save(canvas {
    fill(color(0x121A21))
    drawContain(league, in: NSRect(x: 36, y: 0, width: 1008, height: 1920))
    roundRect(NSRect(x: 56, y: 145, width: 284, height: 110), radius: 22, fill: color(0x000000, 0.66))
    text("9位？", NSRect(x: 80, y: 168, width: 240, height: 74), size: 70, color: .white)
}, "frame-01-nine.png")

save(canvas {
    fill(color(0x121A21))
    drawContain(workout, in: NSRect(x: 36, y: 0, width: 1008, height: 1920))
}, "frame-02-workout-glimpse.png")

save(canvas {
    fill(color(0x121A21))
    drawContain(league, in: NSRect(x: 36, y: 0, width: 1008, height: 1920))
    roundRect(NSRect(x: 42, y: 1260, width: 996, height: 450), radius: 28, fill: color(0x000000, 0.62))
    text("……運動の順位だった。\n\n何それ。", NSRect(x: 82, y: 1318, width: 920, height: 330), size: 60, color: .white)
}, "frame-03-what.png")

save(canvas {
    fill(color(0x121A21))
    drawContain(workout, in: NSRect(x: 36, y: 0, width: 1008, height: 1920))
}, "frame-04-workout-proof.png")

save(canvas {
    fill(color(0x121A21))
    drawContain(league, in: NSRect(x: 36, y: 0, width: 1008, height: 1920))
}, "frame-05-league-proof.png")

save(canvas {
    fill(color(0x121A21))
    drawContain(home, in: NSRect(x: 36, y: 0, width: 1008, height: 1920))
}, "frame-06-home-proof.png")

save(canvas {
    fill(color(0x121A21))
    drawContain(home, in: NSRect(x: 36, y: 0, width: 1008, height: 1920))
    NSColor.white.withAlphaComponent(0.86).setFill()
    NSBezierPath(ovalIn: NSRect(x: 488, y: 1480, width: 118, height: 118)).fill()
    text("●", NSRect(x: 488, y: 1491, width: 118, height: 94), size: 80, color: color(0x111820), align: .center)
    text("タップ", NSRect(x: 438, y: 1612, width: 220, height: 54), size: 42, color: .white, align: .center)
}, "frame-07-loop.png")

