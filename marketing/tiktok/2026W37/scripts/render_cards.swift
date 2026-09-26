import AppKit
import Foundation
import ImageIO

let canvasWidth: CGFloat = 1080
let canvasHeight: CGFloat = 1920
let repoRoot = "/Users/berry/Dev/Fitlet"
let outputDir = "\(repoRoot)/marketing/tiktok/2026W37/cards"
let sourceDir = "\(repoRoot)/marketing/tiktok/2026W37/source"

let boldFontName = "Hiragino Sans W7"
let regularFontName = "Hiragino Sans W4"

func rgb(_ hex: UInt32, alpha: CGFloat = 1) -> NSColor {
    let r = CGFloat((hex >> 16) & 0xff) / 255
    let g = CGFloat((hex >> 8) & 0xff) / 255
    let b = CGFloat(hex & 0xff) / 255
    return NSColor(calibratedRed: r, green: g, blue: b, alpha: alpha)
}

func loadImage(_ path: String) -> NSImage {
    guard let image = NSImage(contentsOfFile: path) else {
        fatalError("Missing image: \(path)")
    }
    return image
}

let umiushiSleeping = loadImage("\(repoRoot)/assets/png/characters/umiushi-lifestyle/08-sleeping-nightcap.png")
let umiushiMagnifying = loadImage("\(repoRoot)/assets/png/characters/umiushi-lifestyle/09-magnifying-glass.png")
let umiushiAfter = loadImage("\(repoRoot)/assets/png/characters/umiushi-lifestyle/12-after-workout.png")
let umiushiGame = loadImage("\(repoRoot)/assets/png/characters/umiushi-lifestyle/21-video-game.png")
let umiushiCheering = loadImage("\(repoRoot)/assets/png/characters/umiushi-lifestyle/24-cheering-fan.png")
let umiushiWhistle = loadImage("\(repoRoot)/assets/png/characters/umiushi-lifestyle/coach/25-coach-whistle.png")
let aronia = loadImage("\(repoRoot)/assets/png/league/aronia-emblem.png")
let feijoa = loadImage("\(repoRoot)/assets/png/league/feijoa-emblem.png")
let pitaya = loadImage("\(repoRoot)/assets/png/league/pitaya-emblem.png")
let deepSea = loadImage("\(repoRoot)/assets/png/profile-backgrounds/deep-sea-profile.png")
let coralIsland = loadImage("\(repoRoot)/assets/png/profile-backgrounds/coral-island-profile.png")
let blaze = loadImage("\(repoRoot)/assets/png/profile-backgrounds/blaze-profile.png")
let aiOcean = loadImage("\(sourceDir)/asset-ai-ocean-texture.png")
let aiAthlete = loadImage("\(sourceDir)/asset-ai-fictional-adult-athlete.png")

func makeCanvas(_ draw: () -> Void) -> NSImage {
    let image = NSImage(size: NSSize(width: canvasWidth, height: canvasHeight))
    image.lockFocusFlipped(true)
    NSGraphicsContext.current?.imageInterpolation = .high
    draw()
    image.unlockFocus()
    return image
}

func fill(_ color: NSColor) {
    color.setFill()
    NSRect(x: 0, y: 0, width: canvasWidth, height: canvasHeight).fill()
}

func gradient(_ colors: [NSColor], rect: NSRect, angle: CGFloat = 90) {
    NSGradient(colors: colors)?.draw(in: rect, angle: angle)
}

func drawImage(_ image: NSImage, in rect: NSRect, mode: NSImageScaling = .scaleProportionallyUpOrDown, alpha: CGFloat = 1) {
    image.draw(in: rect, from: NSRect(origin: .zero, size: image.size), operation: .sourceOver, fraction: alpha, respectFlipped: true, hints: [.interpolation: NSImageInterpolation.high])
}

func drawImageFill(_ image: NSImage, in rect: NSRect, alpha: CGFloat = 1) {
    let source = image.size
    let scale = max(rect.width / source.width, rect.height / source.height)
    let destSize = NSSize(width: source.width * scale, height: source.height * scale)
    let dest = NSRect(x: rect.midX - destSize.width / 2, y: rect.midY - destSize.height / 2, width: destSize.width, height: destSize.height)
    drawImage(image, in: dest, alpha: alpha)
}

func roundedRect(_ rect: NSRect, radius: CGFloat, fill color: NSColor, stroke: NSColor? = nil, lineWidth: CGFloat = 1) {
    let path = NSBezierPath(roundedRect: rect, xRadius: radius, yRadius: radius)
    color.setFill()
    path.fill()
    if let stroke {
        stroke.setStroke()
        path.lineWidth = lineWidth
        path.stroke()
    }
}

func circle(_ center: NSPoint, radius: CGFloat, fill color: NSColor, stroke: NSColor? = nil, lineWidth: CGFloat = 1) {
    let rect = NSRect(x: center.x - radius, y: center.y - radius, width: radius * 2, height: radius * 2)
    let path = NSBezierPath(ovalIn: rect)
    color.setFill()
    path.fill()
    if let stroke {
        stroke.setStroke()
        path.lineWidth = lineWidth
        path.stroke()
    }
}

func line(_ points: [NSPoint], color: NSColor, width: CGFloat, dash: [CGFloat] = []) {
    guard let first = points.first else { return }
    let path = NSBezierPath()
    path.move(to: first)
    for point in points.dropFirst() { path.line(to: point) }
    color.setStroke()
    path.lineWidth = width
    if !dash.isEmpty { path.setLineDash(dash, count: dash.count, phase: 0) }
    path.stroke()
}

func text(_ value: String, in rect: NSRect, size: CGFloat, color: NSColor, weight: NSFont.Weight = .bold, alignment: NSTextAlignment = .left, lineSpacing: CGFloat = 8, shadow: Bool = false, tracking: CGFloat = 0) {
    let fontName = weight == .regular ? regularFontName : boldFontName
    let font = NSFont(name: fontName, size: size) ?? NSFont.systemFont(ofSize: size, weight: weight)
    let paragraph = NSMutableParagraphStyle()
    paragraph.alignment = alignment
    paragraph.lineSpacing = lineSpacing
    paragraph.lineBreakMode = .byWordWrapping
    var attributes: [NSAttributedString.Key: Any] = [
        .font: font,
        .foregroundColor: color,
        .paragraphStyle: paragraph
    ]
    if tracking != 0 { attributes[.kern] = tracking }
    if shadow {
        let nsShadow = NSShadow()
        nsShadow.shadowColor = NSColor.black.withAlphaComponent(0.32)
        nsShadow.shadowBlurRadius = 10
        nsShadow.shadowOffset = NSSize(width: 0, height: -5)
        attributes[.shadow] = nsShadow
    }
    NSAttributedString(string: value, attributes: attributes).draw(with: rect, options: [.usesLineFragmentOrigin, .usesFontLeading])
}

func label(_ value: String, x: CGFloat, y: CGFloat, color: NSColor, background: NSColor? = nil, width: CGFloat? = nil) {
    let rect = NSRect(x: x, y: y, width: width ?? 420, height: 44)
    if let background { roundedRect(rect.insetBy(dx: -14, dy: -7), radius: 16, fill: background) }
    text(value, in: rect, size: 22, color: color, weight: .bold, lineSpacing: 0, tracking: 1.4)
}

func dotPattern(_ color: NSColor, opacity: CGFloat = 0.18, spacing: CGFloat = 42, radius: CGFloat = 2) {
    for x in stride(from: 24, through: canvasWidth, by: spacing) {
        for y in stride(from: 24, through: canvasHeight, by: spacing) {
            circle(NSPoint(x: x, y: y), radius: radius, fill: color.withAlphaComponent(opacity))
        }
    }
}

func accentBars(_ color: NSColor, x: CGFloat, y: CGFloat, count: Int, gap: CGFloat = 18) {
    for index in 0..<count {
        let h = 24 + CGFloat((index * 19) % 76)
        roundedRect(NSRect(x: x + CGFloat(index) * gap, y: y - h, width: 8, height: h), radius: 4, fill: color)
    }
}

func footer(_ code: String, dark: Bool = false, brand: String? = nil) {
    let color = dark ? rgb(0xE9F2E8) : rgb(0x0C1A2A)
    line([NSPoint(x: 76, y: 1814), NSPoint(x: 1004, y: 1814)], color: color.withAlphaComponent(0.22), width: 2)
    text(code, in: NSRect(x: 78, y: 1840, width: 450, height: 34), size: 18, color: color.withAlphaComponent(0.62), weight: .regular, lineSpacing: 0, tracking: 2)
    if let brand {
        text(brand, in: NSRect(x: 640, y: 1838, width: 360, height: 38), size: 19, color: color.withAlphaComponent(0.86), weight: .bold, alignment: .right, lineSpacing: 0, tracking: 1.4)
    }
}

func save(_ image: NSImage, filename: String) {
    let path = "\(outputDir)/\(filename)"
    guard let tiff = image.tiffRepresentation, let bitmap = NSBitmapImageRep(data: tiff), let png = bitmap.representation(using: .png, properties: [:]) else {
        fatalError("Could not encode \(filename)")
    }
    do {
        try png.write(to: URL(fileURLWithPath: path))
    } catch {
        fatalError("Could not write \(path): \(error)")
    }
}

func cardA1() -> NSImage {
    makeCanvas {
        gradient([rgb(0xF1F0E8), rgb(0xD4E3D4)], rect: NSRect(x: 0, y: 0, width: canvasWidth, height: canvasHeight), angle: 90)
        dotPattern(rgb(0x0C1A2A), opacity: 0.08, spacing: 44, radius: 2)
        label("観察記録 / 01", x: 82, y: 86, color: rgb(0xF1F0E8), background: rgb(0x0C1A2A), width: 280)
        text("運動してない日、\nウミウシだけは\n覚えてる。", in: NSRect(x: 80, y: 190, width: 930, height: 450), size: 92, color: rgb(0x0C1A2A), lineSpacing: 18, shadow: false)
        roundedRect(NSRect(x: 74, y: 706, width: 932, height: 8), radius: 4, fill: rgb(0xF36B4F))
        text("忘れたふりをしているのは、\nたぶん私のほう。", in: NSRect(x: 82, y: 760, width: 700, height: 160), size: 34, color: rgb(0x0C1A2A), weight: .regular, lineSpacing: 12)
        drawImage(umiushiSleeping, in: NSRect(x: 430, y: 1000, width: 570, height: 570))
        circle(NSPoint(x: 168, y: 1238), radius: 86, fill: rgb(0xF36B4F))
        text("あとで\nやる", in: NSRect(x: 105, y: 1190, width: 126, height: 112), size: 30, color: .white, alignment: .center, lineSpacing: 0)
        line([NSPoint(x: 185, y: 1110), NSPoint(x: 285, y: 1030), NSPoint(x: 430, y: 1065)], color: rgb(0x0C1A2A).withAlphaComponent(0.34), width: 4, dash: [8, 10])
        footer("CF01 / HK05 / AN01 / V01")
    }
}

func cardA2() -> NSImage {
    makeCanvas {
        fill(rgb(0x0D1B2A))
        accentBars(rgb(0xF4D35E), x: 82, y: 1600, count: 9, gap: 23)
        text("私は忘れた。\nあの子は、\n見ていた。", in: NSRect(x: 80, y: 170, width: 900, height: 420), size: 94, color: rgb(0xF4F2E9), lineSpacing: 20, shadow: true)
        label("記録は、責めない。", x: 84, y: 680, color: rgb(0x0D1B2A), background: rgb(0xF4D35E), width: 320)
        roundedRect(NSRect(x: 75, y: 790, width: 930, height: 560), radius: 44, fill: rgb(0xF4F2E9))
        drawImage(umiushiMagnifying, in: NSRect(x: 300, y: 785, width: 650, height: 650))
        circle(NSPoint(x: 172, y: 1032), radius: 80, fill: rgb(0xF36B4F))
        text("きのう", in: NSRect(x: 101, y: 1008, width: 142, height: 46), size: 25, color: .white, alignment: .center, lineSpacing: 0)
        circle(NSPoint(x: 170, y: 1217), radius: 80, fill: rgb(0x2BC7B1))
        text("きょう", in: NSRect(x: 99, y: 1193, width: 142, height: 46), size: 25, color: rgb(0x0D1B2A), alignment: .center, lineSpacing: 0)
        line([NSPoint(x: 170, y: 1115), NSPoint(x: 170, y: 1135)], color: rgb(0xF4F2E9), width: 8)
        text("ひとつ抜けている日がある。", in: NSRect(x: 82, y: 1470, width: 900, height: 90), size: 34, color: rgb(0xF4F2E9), weight: .regular, lineSpacing: 0)
        footer("CF01 / HK05 / AN01 / V02", dark: true)
    }
}

func cardA3() -> NSImage {
    makeCanvas {
        gradient([rgb(0x123447), rgb(0x0C1A2A)], rect: NSRect(x: 0, y: 0, width: canvasWidth, height: canvasHeight), angle: 90)
        circle(NSPoint(x: 916, y: 208), radius: 210, fill: rgb(0xF36B4F).withAlphaComponent(0.96))
        circle(NSPoint(x: 916, y: 208), radius: 168, fill: rgb(0x123447))
        text("だから今日は、\n1分だけ\n裏切れない。", in: NSRect(x: 82, y: 180, width: 820, height: 480), size: 94, color: rgb(0xF4F2E9), lineSpacing: 19, shadow: true)
        text("完璧じゃなくても、\n観察記録は更新できる。", in: NSRect(x: 86, y: 760, width: 760, height: 150), size: 34, color: rgb(0x9CE5D5), weight: .regular, lineSpacing: 12)
        drawImage(umiushiAfter, in: NSRect(x: 340, y: 980, width: 520, height: 520))
        drawImage(umiushiCheering, in: NSRect(x: 720, y: 1250, width: 280, height: 280))
        roundedRect(NSRect(x: 80, y: 1530, width: 920, height: 112), radius: 28, fill: rgb(0xF4F2E9).withAlphaComponent(0.12), stroke: rgb(0x9CE5D5).withAlphaComponent(0.4), lineWidth: 2)
        text("つづきは、まだ途中。", in: NSRect(x: 104, y: 1560, width: 870, height: 54), size: 34, color: rgb(0xF4F2E9), alignment: .center, lineSpacing: 0)
        footer("CF01 / HK05 / AN01 / V03", dark: true, brand: "Fitlet")
    }
}

func rankRow(_ rank: String, _ labelText: String, y: CGFloat, fillColor: NSColor, textColor: NSColor, accent: Bool = false) {
    roundedRect(NSRect(x: 88, y: y, width: 904, height: 116), radius: 24, fill: fillColor, stroke: accent ? rgb(0xF36B4F) : nil, lineWidth: 5)
    text(rank, in: NSRect(x: 120, y: y + 34, width: 110, height: 50), size: 38, color: textColor, alignment: .center, lineSpacing: 0)
    text(labelText, in: NSRect(x: 274, y: y + 30, width: 660, height: 60), size: 32, color: textColor, weight: .regular, lineSpacing: 0)
}

func cardB1() -> NSImage {
    makeCanvas {
        gradient([rgb(0x2A174A), rgb(0x0C1A2A)], rect: NSRect(x: 0, y: 0, width: canvasWidth, height: canvasHeight), angle: 90)
        drawImage(aronia, in: NSRect(x: 720, y: 82, width: 270, height: 180), alpha: 0.85)
        label("架空のランキング", x: 82, y: 96, color: rgb(0x2A174A), background: rgb(0xF4D35E), width: 300)
        text("最下位が、\n今日いちばん\nえらい。", in: NSRect(x: 80, y: 230, width: 900, height: 400), size: 92, color: rgb(0xF7F0E4), lineSpacing: 17, shadow: true)
        rankRow("1", "いつも完璧", y: 820, fillColor: rgb(0xE8DDBB), textColor: rgb(0x2A174A))
        rankRow("2", "毎日つづける", y: 970, fillColor: rgb(0xCDBCE8), textColor: rgb(0x2A174A))
        rankRow("8", "今日、戻ってきた", y: 1120, fillColor: rgb(0xF36B4F), textColor: .white, accent: true)
        circle(NSPoint(x: 865, y: 1428), radius: 118, fill: rgb(0xF4D35E))
        text("最下位\n＝\n再開", in: NSRect(x: 770, y: 1360, width: 190, height: 140), size: 30, color: rgb(0x2A174A), alignment: .center, lineSpacing: 2)
        footer("CF02 / HK04 / AN02 / V01", dark: true)
    }
}

func cardB2() -> NSImage {
    makeCanvas {
        fill(rgb(0xF0E9D9))
        drawImageFill(coralIsland, in: NSRect(x: 0, y: 1160, width: canvasWidth, height: 760), alpha: 0.98)
        roundedRect(NSRect(x: 74, y: 90, width: 932, height: 70), radius: 26, fill: rgb(0x0C1A2A))
        text("順位は、落ちるものだと思っていた。", in: NSRect(x: 100, y: 111, width: 880, height: 40), size: 24, color: rgb(0xF0E9D9), alignment: .center, lineSpacing: 0)
        text("8位に落ちた。\n——ちがう。\n8位まで戻った。", in: NSRect(x: 80, y: 300, width: 920, height: 520), size: 88, color: rgb(0x0C1A2A), lineSpacing: 20)
        line([NSPoint(x: 125, y: 920), NSPoint(x: 410, y: 920), NSPoint(x: 410, y: 850), NSPoint(x: 720, y: 850)], color: rgb(0xF36B4F), width: 16)
        circle(NSPoint(x: 720, y: 850), radius: 22, fill: rgb(0xF36B4F))
        drawImage(feijoa, in: NSRect(x: 100, y: 1260, width: 360, height: 240), alpha: 0.9)
        text("戻る、は\n下がることじゃない。", in: NSRect(x: 540, y: 1275, width: 430, height: 180), size: 34, color: rgb(0xF0E9D9), lineSpacing: 10, shadow: true)
        footer("CF02 / HK04 / AN02 / V02")
    }
}

func cardB3() -> NSImage {
    makeCanvas {
        gradient([rgb(0x141C42), rgb(0x3D1E58)], rect: NSRect(x: 0, y: 0, width: canvasWidth, height: canvasHeight), angle: 90)
        drawImage(pitaya, in: NSRect(x: 680, y: 120, width: 300, height: 200), alpha: 0.82)
        text("勝つことより、\n戻ることを\n記録する。", in: NSRect(x: 80, y: 220, width: 900, height: 560), size: 82, color: rgb(0xF7F0E4), lineSpacing: 16, shadow: true)
        let quoteRect = NSRect(x: 82, y: 820, width: 916, height: 230)
        roundedRect(quoteRect, radius: 34, fill: rgb(0xF7F0E4).withAlphaComponent(0.10), stroke: rgb(0xF7F0E4).withAlphaComponent(0.25), lineWidth: 2)
        text("最下位でも、\nページは終わらない。", in: quoteRect.insetBy(dx: 40, dy: 42), size: 42, color: rgb(0xF4D35E), lineSpacing: 12)
        drawImage(umiushiAfter, in: NSRect(x: 210, y: 1120, width: 520, height: 520))
        circle(NSPoint(x: 820, y: 1510), radius: 78, fill: rgb(0xF36B4F))
        text("次の\n1回", in: NSRect(x: 748, y: 1454, width: 144, height: 118), size: 28, color: .white, alignment: .center, lineSpacing: 0)
        footer("CF02 / HK04 / AN02 / V03", dark: true, brand: "Fitlet")
    }
}

func notification(_ title: String, _ subtitle: String, x: CGFloat, y: CGFloat, rotation: CGFloat, color: NSColor) {
    let transform = NSAffineTransform()
    transform.translateX(by: x, yBy: y)
    transform.rotate(byDegrees: rotation)
    transform.concat()
    roundedRect(NSRect(x: -170, y: -52, width: 340, height: 104), radius: 22, fill: color, stroke: rgb(0x10141E), lineWidth: 4)
    circle(NSPoint(x: -130, y: 0), radius: 23, fill: rgb(0x10141E))
    text(title, in: NSRect(x: -95, y: 12, width: 250, height: 28), size: 22, color: rgb(0x10141E), lineSpacing: 0)
    text(subtitle, in: NSRect(x: -95, y: -24, width: 250, height: 28), size: 18, color: rgb(0x10141E).withAlphaComponent(0.68), weight: .regular, lineSpacing: 0)
    transform.invert()
    transform.concat()
}

func cardC1() -> NSImage {
    makeCanvas {
        fill(rgb(0x10141E))
        for i in 0..<18 {
            circle(NSPoint(x: CGFloat((i * 137) % 1080), y: CGFloat((i * 211) % 1920)), radius: CGFloat(3 + i % 4), fill: rgb(0xE5F13B).withAlphaComponent(0.16))
        }
        label("敵キャラ判定", x: 82, y: 88, color: rgb(0x10141E), background: rgb(0xE5F13B), width: 260)
        text("今日の敵、\n腹筋じゃない。", in: NSRect(x: 80, y: 240, width: 900, height: 300), size: 98, color: .white, lineSpacing: 18, shadow: true)
        roundedRect(NSRect(x: 78, y: 620, width: 920, height: 220), radius: 44, fill: rgb(0xF36B4F))
        text("通知。", in: NSRect(x: 110, y: 656, width: 856, height: 140), size: 120, color: rgb(0x10141E), alignment: .center, lineSpacing: 0)
        notification("残業です", "既読にしますか？", x: 300, y: 1080, rotation: -8, color: rgb(0xE5F13B))
        notification("眠いです", "あと5分です", x: 790, y: 1210, rotation: 9, color: rgb(0x9CE5D5))
        notification("見てますか", "見てないふり？", x: 400, y: 1415, rotation: 5, color: rgb(0xF7F0E4))
        drawImage(umiushiWhistle, in: NSRect(x: 660, y: 1450, width: 320, height: 320))
        footer("CF03 / HK07 / AN03 / V01", dark: true)
    }
}

func cardC2() -> NSImage {
    makeCanvas {
        gradient([rgb(0xF36B4F), rgb(0xF4D35E)], rect: NSRect(x: 0, y: 0, width: canvasWidth, height: canvasHeight), angle: 90)
        text("通知は、\nやる気を一枚ずつ\n盗む。", in: NSRect(x: 80, y: 170, width: 920, height: 390), size: 88, color: rgb(0x10141E), lineSpacing: 16)
        roundedRect(NSRect(x: 96, y: 740, width: 888, height: 680), radius: 62, fill: rgb(0x10141E))
        roundedRect(NSRect(x: 166, y: 830, width: 748, height: 460), radius: 40, fill: rgb(0xE7F0E8))
        circle(NSPoint(x: 540, y: 1040), radius: 114, fill: rgb(0xF36B4F))
        text("1", in: NSRect(x: 505, y: 986, width: 70, height: 110), size: 104, color: .white, alignment: .center, lineSpacing: 0)
        line([NSPoint(x: 270, y: 1370), NSPoint(x: 810, y: 1370)], color: rgb(0xE5F13B), width: 14)
        text("ピロン", in: NSRect(x: 194, y: 1160, width: 690, height: 80), size: 48, color: rgb(0x10141E), alignment: .center, lineSpacing: 0)
        drawImage(umiushiSleeping, in: NSRect(x: 210, y: 1470, width: 460, height: 360))
        notification("新しい通知", "開かない勇気", x: 720, y: 1580, rotation: -7, color: rgb(0x9CE5D5))
        footer("CF03 / HK07 / AN03 / V02")
    }
}

func cardC3() -> NSImage {
    makeCanvas {
        drawImageFill(aiOcean, in: NSRect(x: 0, y: 0, width: canvasWidth, height: canvasHeight))
        roundedRect(NSRect(x: 54, y: 58, width: 972, height: 1780), radius: 42, fill: rgb(0x071831).withAlphaComponent(0.20), stroke: rgb(0xE5F13B).withAlphaComponent(0.32), lineWidth: 3)
        text("敵を消す前に、\n1クエストだけ\n残した。", in: NSRect(x: 80, y: 220, width: 920, height: 430), size: 88, color: .white, lineSpacing: 18, shadow: true)
        text("通知に勝つ方法は、\n通知より先に終わること。", in: NSRect(x: 86, y: 770, width: 850, height: 160), size: 34, color: rgb(0xE5F13B), weight: .regular, lineSpacing: 12, shadow: true)
        drawImage(umiushiGame, in: NSRect(x: 104, y: 1080, width: 480, height: 480))
        drawImage(umiushiAfter, in: NSRect(x: 540, y: 1180, width: 430, height: 430))
        roundedRect(NSRect(x: 122, y: 1630, width: 836, height: 100), radius: 26, fill: rgb(0xE5F13B))
        text("つづきは、通知の向こう側。", in: NSRect(x: 150, y: 1658, width: 780, height: 48), size: 30, color: rgb(0x071831), alignment: .center, lineSpacing: 0)
        footer("CF03 / HK07 / AN03 / V03", dark: true, brand: "Fitlet")
    }
}

func cardD1() -> NSImage {
    makeCanvas {
        fill(rgb(0x090A10))
        drawImageFill(aiAthlete, in: NSRect(x: 250, y: 0, width: 830, height: canvasHeight), alpha: 0.95)
        roundedRect(NSRect(x: 54, y: 58, width: 972, height: 1780), radius: 42, fill: rgb(0x090A10).withAlphaComponent(0.08), stroke: rgb(0xF5F2E9).withAlphaComponent(0.20), lineWidth: 3)
        roundedRect(NSRect(x: 64, y: 92, width: 430, height: 72), radius: 24, fill: rgb(0xF36B4F))
        text("架空の成人キャラクター", in: NSRect(x: 86, y: 114, width: 390, height: 32), size: 21, color: rgb(0x090A10), lineSpacing: 0, tracking: 0.8)
        text("この人、\n時計に\n追われてる。", in: NSRect(x: 72, y: 310, width: 630, height: 560), size: 94, color: .white, lineSpacing: 15, shadow: true)
        roundedRect(NSRect(x: 76, y: 1030, width: 426, height: 130), radius: 30, fill: rgb(0x0C1A2A).withAlphaComponent(0.86))
        text("0.5秒で、\n意味が変わる。", in: NSRect(x: 106, y: 1050, width: 360, height: 110), size: 30, color: rgb(0xF4D35E), lineSpacing: 4)
        text("FICTIONAL / AI VISUAL", in: NSRect(x: 78, y: 1770, width: 450, height: 34), size: 18, color: rgb(0xF5F2E9).withAlphaComponent(0.72), weight: .regular, lineSpacing: 0, tracking: 2)
        footer("CF04 / HK01 / AN04 / V01", dark: true)
    }
}

func cardD2() -> NSImage {
    makeCanvas {
        gradient([rgb(0x090A10), rgb(0x1F2E53)], rect: NSRect(x: 0, y: 0, width: canvasWidth, height: canvasHeight), angle: 90)
        for i in 0..<7 {
            let radius = CGFloat(260 + i * 74)
            let path = NSBezierPath(ovalIn: NSRect(x: 490 - radius / 2, y: 850 - radius / 2, width: radius, height: radius))
            path.lineWidth = 3
            rgb(0xF36B4F).withAlphaComponent(0.24 - CGFloat(i) * 0.02).setStroke()
            path.stroke()
        }
        text("次に走り出すのは、\n私か、時計か。", in: NSRect(x: 80, y: 240, width: 920, height: 320), size: 92, color: rgb(0xF5F2E9), lineSpacing: 18, shadow: true)
        drawImage(aiAthlete, in: NSRect(x: 520, y: 820, width: 480, height: 720), alpha: 0.96)
        roundedRect(NSRect(x: 78, y: 970, width: 460, height: 232), radius: 28, fill: rgb(0xF4D35E))
        text("答えは、\nまだ出さない。", in: NSRect(x: 112, y: 1012, width: 390, height: 170), size: 42, color: rgb(0x090A10), lineSpacing: 6)
        line([NSPoint(x: 140, y: 1370), NSPoint(x: 140, y: 1520), NSPoint(x: 390, y: 1650), NSPoint(x: 740, y: 1650)], color: rgb(0xF4D35E), width: 8, dash: [18, 14])
        circle(NSPoint(x: 740, y: 1650), radius: 16, fill: rgb(0xF4D35E))
        text("つづきは、次のカード。", in: NSRect(x: 80, y: 1740, width: 620, height: 54), size: 30, color: rgb(0xF5F2E9), weight: .regular, lineSpacing: 0)
        text("FICTIONAL / AI VISUAL", in: NSRect(x: 690, y: 1770, width: 310, height: 34), size: 16, color: rgb(0xF5F2E9).withAlphaComponent(0.64), weight: .regular, alignment: .right, lineSpacing: 0, tracking: 1.4)
        footer("CF04 / HK01 / AN04 / V02", dark: true, brand: "Fitlet")
    }
}

save(cardA1(), filename: "CF01-HK05-AN01-V01.png")
save(cardA2(), filename: "CF01-HK05-AN01-V02.png")
save(cardA3(), filename: "CF01-HK05-AN01-V03.png")
save(cardB1(), filename: "CF02-HK04-AN02-V01.png")
save(cardB2(), filename: "CF02-HK04-AN02-V02.png")
save(cardB3(), filename: "CF02-HK04-AN02-V03.png")
save(cardC1(), filename: "CF03-HK07-AN03-V01.png")
save(cardC2(), filename: "CF03-HK07-AN03-V02.png")
save(cardC3(), filename: "CF03-HK07-AN03-V03.png")
save(cardD1(), filename: "CF04-HK01-AN04-V01.png")
save(cardD2(), filename: "CF04-HK01-AN04-V02.png")

print("Rendered 11 TikTok cards to \(outputDir)")
