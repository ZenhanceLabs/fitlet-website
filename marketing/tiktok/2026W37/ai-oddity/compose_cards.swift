import Foundation
import CoreGraphics
import CoreText
import ImageIO

let canvasWidth = 1080
let canvasHeight = 1920
let outputDirectory = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)

struct CardSpec {
    let sourceName: String
    let outputName: String
    let eyebrow: String
    let headline: [String]
    let subline: String
    let loop: String
    let accent: CGColor
    let eyebrowColor: CGColor
    let darkOverlay: CGFloat
}

func color(_ r: CGFloat, _ g: CGFloat, _ b: CGFloat, _ a: CGFloat = 1) -> CGColor {
    CGColor(red: r, green: g, blue: b, alpha: a)
}

let white = color(0.98, 0.99, 1)
let mutedWhite = color(0.86, 0.90, 0.92)
let black = color(0.01, 0.015, 0.02)

let cards = [
    CardSpec(
        sourceName: "base/notification-monster-source.png",
        outputName: "card-01-notification-monster.png",
        eyebrow: "POV / 00:00",
        headline: ["「今日の敵は、", "腹筋ではなく", "通知。」"],
        subline: "通知を消す前に、こいつの正体を見て。",
        loop: "次のカード → やる気を食べる生物",
        accent: color(1.0, 0.18, 0.12),
        eyebrowColor: color(1.0, 0.46, 0.35),
        darkOverlay: 0.48
    ),
    CardSpec(
        sourceName: "base/motivation-eater-source.png",
        outputName: "card-02-motivation-eater.png",
        eyebrow: "CASE FILE 02",
        headline: ["あなたのやる気を", "食べる生物は、", "部屋の隅で待っている。"],
        subline: "しかも、付箋を吐き出す。",
        loop: "次のカード → 最下位だけが帰還できる",
        accent: color(0.75, 1.0, 0.18),
        eyebrowColor: color(0.70, 0.94, 0.86),
        darkOverlay: 0.38
    ),
    CardSpec(
        sourceName: "base/lowest-rank-source.png",
        outputName: "card-03-lowest-rank.png",
        eyebrow: "RANKING GLITCH",
        headline: ["最下位だけが", "帰還できる。"],
        subline: "上位は、まだ「やる気」を待っている。",
        loop: "次のカード → あと5分が、こっちを待っていた",
        accent: color(0.66, 0.30, 1.0),
        eyebrowColor: color(0.84, 0.72, 1.0),
        darkOverlay: 0.48
    ),
    CardSpec(
        sourceName: "base/five-more-minutes-source.png",
        outputName: "card-04-five-more-minutes.png",
        eyebrow: "POV / 5 MINUTES LATER",
        headline: ["「あと5分」が", "部屋を占領した。"],
        subline: "時計のほうが、先に待ちくたびれている。",
        loop: "最初のカードへ → 本日の敵は通知。",
        accent: color(1.0, 0.72, 0.10),
        eyebrowColor: color(1.0, 0.88, 0.36),
        darkOverlay: 0.30
    )
]

func loadImage(_ url: URL) -> CGImage? {
    guard let source = CGImageSourceCreateWithURL(url as CFURL, nil) else { return nil }
    return CGImageSourceCreateImageAtIndex(source, 0, nil)
}

func drawText(_ text: String, in context: CGContext, x: CGFloat, top: CGFloat, size: CGFloat, color: CGColor, weight: String = "Hiragino Sans W6", shadow: Bool = true) {
    let font = CTFontCreateWithName(weight as CFString, size, nil)
    let attributes: [NSAttributedString.Key: Any] = [
        NSAttributedString.Key(kCTFontAttributeName as String): font,
        NSAttributedString.Key(kCTForegroundColorAttributeName as String): color
    ]
    let line = CTLineCreateWithAttributedString(NSAttributedString(string: text, attributes: attributes))
    var ascent: CGFloat = 0
    var descent: CGFloat = 0
    var leading: CGFloat = 0
    CTLineGetTypographicBounds(line, &ascent, &descent, &leading)

    context.saveGState()
    if shadow {
        context.setShadow(offset: CGSize(width: 0, height: -5), blur: 16, color: black.copy(alpha: 0.75)!)
    }
    context.textPosition = CGPoint(x: x, y: CGFloat(canvasHeight) - top - ascent)
    CTLineDraw(line, context)
    context.restoreGState()
}

func drawRoundedLabel(_ text: String, in context: CGContext, x: CGFloat, top: CGFloat, width: CGFloat, height: CGFloat, fill: CGColor, textColor: CGColor) {
    let rect = CGRect(x: x, y: CGFloat(canvasHeight) - top - height, width: width, height: height)
    context.saveGState()
    context.setFillColor(fill)
    context.addPath(CGPath(roundedRect: rect, cornerWidth: height / 2, cornerHeight: height / 2, transform: nil))
    context.fillPath()
    drawText(text, in: context, x: x + 22, top: top + 12, size: 24, color: textColor, weight: "Hiragino Sans W6", shadow: false)
    context.restoreGState()
}

func writePNG(_ image: CGImage, to url: URL) throws {
    guard let destination = CGImageDestinationCreateWithURL(url as CFURL, "public.png" as CFString, 1, nil) else {
        throw NSError(domain: "CardComposer", code: 1, userInfo: [NSLocalizedDescriptionKey: "Could not create PNG destination"])
    }
    CGImageDestinationAddImage(destination, image, [kCGImagePropertyPNGDictionary as String: [kCGImagePropertyPNGInterlaceType as String: 0]] as CFDictionary)
    guard CGImageDestinationFinalize(destination) else {
        throw NSError(domain: "CardComposer", code: 2, userInfo: [NSLocalizedDescriptionKey: "Could not finalize PNG"])
    }
}

for spec in cards {
    let sourceURL = outputDirectory.appendingPathComponent(spec.sourceName)
    let outputURL = outputDirectory.appendingPathComponent(spec.outputName)
    guard let source = loadImage(sourceURL) else {
        fputs("Missing source: \(sourceURL.path)\n", stderr)
        exit(2)
    }
    guard let context = CGContext(
        data: nil,
        width: canvasWidth,
        height: canvasHeight,
        bitsPerComponent: 8,
        bytesPerRow: canvasWidth * 4,
        space: CGColorSpaceCreateDeviceRGB(),
        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
    ) else {
        fputs("Could not create context\n", stderr)
        exit(3)
    }

    context.interpolationQuality = .high
    context.draw(source, in: CGRect(x: 0, y: 0, width: canvasWidth, height: canvasHeight))

    let gradientColors = [
        black.copy(alpha: spec.darkOverlay)!,
        black.copy(alpha: spec.darkOverlay * 0.38)!,
        black.copy(alpha: 0.0)!
    ] as CFArray
    let locations: [CGFloat] = [0.0, 0.38, 0.72]
    if let gradient = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: gradientColors, locations: locations) {
        context.drawLinearGradient(
            gradient,
            start: CGPoint(x: 0, y: CGFloat(canvasHeight)),
            end: CGPoint(x: 0, y: CGFloat(canvasHeight) * 0.26),
            options: []
        )
    }

    drawRoundedLabel(spec.eyebrow, in: context, x: 72, top: 88, width: max(220, CGFloat(spec.eyebrow.count * 18 + 72)), height: 52, fill: spec.accent.copy(alpha: 0.92)!, textColor: black)

    let headlineTop: CGFloat = 188
    for (index, line) in spec.headline.enumerated() {
        drawText(line, in: context, x: 72, top: headlineTop + CGFloat(index) * 116, size: 86, color: white, weight: "Hiragino Sans W6")
    }

    let subTop = headlineTop + CGFloat(spec.headline.count) * 116 + 18
    drawText(spec.subline, in: context, x: 76, top: subTop, size: 33, color: mutedWhite, weight: "Hiragino Sans W4")

    context.saveGState()
    context.setStrokeColor(spec.accent.copy(alpha: 0.72)!)
    context.setLineWidth(4)
    context.move(to: CGPoint(x: 76, y: CGFloat(canvasHeight) - subTop - 62))
    context.addLine(to: CGPoint(x: 352, y: CGFloat(canvasHeight) - subTop - 62))
    context.strokePath()
    context.restoreGState()

    drawText(spec.loop, in: context, x: 72, top: 1772, size: 29, color: white, weight: "Hiragino Sans W6")
    drawText("fitlet / creative test", in: context, x: 72, top: 1840, size: 22, color: mutedWhite, weight: "Hiragino Sans W4", shadow: false)
    drawText(String(format: "%02d / 04", cards.firstIndex(where: { $0.outputName == spec.outputName })! + 1), in: context, x: 882, top: 1840, size: 22, color: mutedWhite, weight: "Hiragino Sans W4", shadow: false)

    guard let output = context.makeImage() else {
        fputs("Could not make image for \(spec.outputName)\n", stderr)
        exit(4)
    }
    do {
        try writePNG(output, to: outputURL)
        print("wrote \(outputURL.path)")
    } catch {
        fputs("Failed writing \(outputURL.path): \(error)\n", stderr)
        exit(5)
    }
}
