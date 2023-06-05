import "./globals.css";

export const metadata = {
  title: "Chess",
  description: "Chess game in 3D Created by @github:Ismailtan35",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
