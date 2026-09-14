# Schrift für das OG-Bild

Nur für `src/app/opengraph-image.tsx`. `next/og` kann die von `next/font`
geladenen Schriften nicht mitbenutzen — es braucht die Datei selbst — und es
unterstützt **kein woff2**, genau das Format, das `next/font` ablegt.

`CormorantGaramond-SemiBold.woff` ist die Display-Schrift der Seite, Gewicht
600, unter der **SIL Open Font License 1.1**. Bezogen über die
Google-Fonts-CSS-API mit einer alten User-Agent-Kennung, weil die API
modernen Browsern woff2 ausliefert.

Das Bundle-Limit von `ImageResponse` liegt bei 500 KB und umfasst JSX, CSS,
Schriften und Bilder — beim Ergänzen weiterer Schnitte im Auge behalten.
