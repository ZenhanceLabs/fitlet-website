import AppKit
import Foundation

let root = "/Users/berry/Dev/Fitlet"
let mode = CommandLine.arguments.dropFirst().first ?? "b"
let out = mode == "c"
    ? "\(root)/marketing/tiktok/2026W37/v4-c-rank/frames"
    : "\(root)/marketing/tiktok/2026W37/v4-b-notify/frames"
let W: CGFloat = 1080
let H: CGFloat = 1920
let bold = "Hiragino Sans W7"
let regular = "Hiragino Sans W4"

try! FileManager.default.createDirectory(atPath: out, withIntermediateDirectories: true)

func color(_ hex: UInt32, _ alpha: CGFloat = 1) -> NSColor {
    NSColor(calibratedRed: CGFloat((hex >> 16) & 0xff) / 255,
            green: CGFloat((hex >> 8) & 0xff) / 255,
            blue: CGFloat(hex & 0xff) / 255,
            alpha: alpha)
}

func load(_ path: String) -> NSImage {
    guard let image = NSImage(contentsOfFile: path) else { fatalError("Missing image: \(path)") }
    return image
}

func canvas(_ draw: () -> Void) -> NSImage {
    let image = NSImage(size: NSSize(width: W, height: H))
    image.lockFocusFlipped(true)
    NSGraphicsContext.current?.imageInterpolation = .high
    draw()
    image.unlockFocus()
    return image
}

func fill(_ c: NSColor) { c.setFill(); NSRect(x: 0, y: 0, width: W, height: H).fill() }

func contain(_ source: NSImage, _ rect: NSRect, alpha: CGFloat = 1) {
    let scale = min(rect.width / source.size.width, rect.height / source.size.height)
    let size = NSSize(width: source.size.width * scale, height: source.size.height * scale)
    let dest = NSRect(x: rect.midX - size.width / 2, y: rect.midY - size.height / 2, width: size.width, height: size.height)
    source.draw(in: dest, from: NSRect(origin: .zero, size: source.size), operation: .sourceOver, fraction: alpha, respectFlipped: true, hints: [.interpolation: NSImageInterpolation.high])
}

func crop(_ source: NSImage, _ dest: NSRect, alpha: CGFloat = 1) {
    source.draw(in: dest, from: NSRect(origin: .zero, size: source.size), operation: .sourceOver, fraction: alpha, respectFlipped: true, hints: [.interpolation: NSImageInterpolation.high])
}

func rounded(_ rect: NSRect, _ radius: CGFloat, _ c: NSColor) { c.setFill(); NSBezierPath(roundedRect: rect, xRadius: radius, yRadius: radius).fill() }

func text(_ value: String, _ rect: NSRect, _ size: CGFloat, _ c: NSColor, _ weight: NSFont.Weight = .bold, _ align: NSTextAlignment = .left) {
    let font = NSFont(name: weight == .regular ? regular : bold, size: size) ?? NSFont.systemFont(ofSize: size, weight: weight)
    let paragraph = NSMutableParagraphStyle(); paragraph.alignment = align; paragraph.lineSpacing = 6
    NSAttributedString(string: value, attributes: [.font: font, .foregroundColor: c, .paragraphStyle: paragraph]).draw(with: rect, options: [.usesLineFragmentOrigin, .usesFontLeading])
}

func caption(_ value: String, y: CGFloat, size: CGFloat = 54, width: CGFloat = 972) {
    rounded(NSRect(x: 54, y: y, width: width, height: size + 54), 18, color(0x05070A, 0.76))
    text(value, NSRect(x: 82, y: y + 22, width: width - 56, height: size + 8), size, .white)
}

func save(_ image: NSImage, _ name: String) {
    guard let tiff = image.tiffRepresentation,
          let bitmap = NSBitmapImageRep(data: tiff),
          let png = bitmap.representation(using: .png, properties: [:]) else { fatalError("Encode failed") }
    try! png.write(to: URL(fileURLWithPath: "\(out)/\(name)"))
}

let workout = load("\(root)/assets/png/onboarding/2.png")
let league = load("\(root)/assets/png/onboarding/3.png")
let hero = load(mode == "c"
    ? "\(root)/marketing/tiktok/2026W37/v4-c-rank/assets/train-squatter.png"
    : "\(root)/marketing/tiktok/2026W37/v4-b-notify/assets/door-collector.png")

if mode == "b" {
    save(canvas {
        fill(color(0x111318)); contain(hero, NSRect(x: 0, y: 0, width: W, height: H))
        caption("POV：通知を3日無視した", y: 120, size: 48)
    }, "frame-00-door.png")

    save(canvas {
        fill(color(0x111318)); contain(hero, NSRect(x: -48, y: -46, width: 1176, height: 2012))
        caption("3回、無視したよね？", y: 1420, size: 58)
    }, "frame-01-close.png")

    save(canvas {
        fill(color(0x07090D)); contain(hero, NSRect(x: 20, y: 0, width: 1040, height: 1920))
        rounded(NSRect(x: 0, y: 0, width: W, height: H), 0, color(0x000000, 0.22))
        caption("はい。", y: 1420, size: 62)
    }, "frame-02-yes.png")

    save(canvas {
        fill(color(0x111820)); contain(workout, NSRect(x: 36, y: 0, width: 1008, height: 1920))
        caption("あと7。", y: 1500, size: 58, width: 410)
    }, "frame-03-workout.png")

    save(canvas {
        fill(color(0x17111D)); contain(hero, NSRect(x: -25, y: -10, width: 1130, height: 1940))
        rounded(NSRect(x: 0, y: 0, width: W, height: H), 0, color(0x3E0B5A, 0.24))
        caption("あと7。", y: 1420, size: 58, width: 380)
    }, "frame-04-club.png")

    save(canvas {
        fill(color(0x101116)); contain(hero, NSRect(x: -70, y: -64, width: 1220, height: 2048))
        rounded(NSRect(x: 0, y: 0, width: W, height: H), 0, color(0x000000, 0.30))
        caption("明日は、逃げないでね。", y: 1400, size: 50)
    }, "frame-05-tomorrow.png")

    save(canvas {
        fill(.black); text("バタン。", NSRect(x: 80, y: 900, width: 920, height: 100), 72, .white, .bold, .center)
    }, "frame-06-slam.png")

    save(canvas {
        fill(color(0x111318)); contain(hero, NSRect(x: 0, y: 0, width: W, height: H))
        caption("POV：通知を3日無視した", y: 120, size: 48)
    }, "frame-07-loop.png")
} else {
    save(canvas {
        fill(color(0x101318)); contain(hero, NSRect(x: 0, y: 0, width: W, height: H))
        caption("終電まで8秒", y: 120, size: 58)
    }, "frame-00-platform.png")

    save(canvas {
        fill(color(0x101318)); contain(hero, NSRect(x: -45, y: -40, width: 1170, height: 2000))
        caption("乗らないの？", y: 1420, size: 62)
    }, "frame-01-why.png")

    save(canvas {
        fill(color(0x0D1015)); contain(hero, NSRect(x: 12, y: 0, width: 1056, height: 1920))
        rounded(NSRect(x: 0, y: 0, width: W, height: H), 0, color(0x000000, 0.24))
        caption("（電車、発車）", y: 1420, size: 54)
    }, "frame-02-departing.png")

    save(canvas {
        fill(color(0x111820)); contain(workout, NSRect(x: 36, y: 0, width: 1008, height: 1920))
        caption("残り7回。", y: 1500, size: 54, width: 430)
    }, "frame-03-workout.png")

    save(canvas {
        fill(color(0x101318)); contain(hero, NSRect(x: 0, y: 0, width: W, height: H))
        caption("まだ続ける", y: 120, size: 52)
    }, "frame-04-alone.png")

    save(canvas {
        fill(color(0x101318)); contain(hero, NSRect(x: -18, y: -20, width: 1116, height: 1960))
        caption("よし。", y: 1420, size: 64, width: 300)
    }, "frame-05-satisfied.png")

    save(canvas {
        fill(color(0x111820)); contain(league, NSRect(x: 36, y: 0, width: 1008, height: 1920))
        caption("9位は守った。", y: 1490, size: 54)
    }, "frame-06-league.png")

    save(canvas {
        fill(.black); text("帰れない。", NSRect(x: 80, y: 900, width: 920, height: 110), 78, .white, .bold, .center)
        text("本日の運行は終了しました。", NSRect(x: 100, y: 1030, width: 880, height: 70), 30, color(0xFFFFFF, 0.78), .regular, .center)
    }, "frame-07-last-train.png")

    save(canvas {
        fill(color(0x101318)); contain(hero, NSRect(x: 0, y: 0, width: W, height: H))
        caption("終電まで8秒", y: 120, size: 58)
    }, "frame-08-loop.png")
}
