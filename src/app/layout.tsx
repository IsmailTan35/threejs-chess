import "./assets/css/globals.css";
export const metadata = {
  title: "Chess 3D",
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
