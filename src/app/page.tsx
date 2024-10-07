const mockUrls = [
  "https://utfs.io/f/W3VPmidSNmjM0zAXdAhexy7VlrXM28Lw4sYEBjKmoqvR0kO1",
  "https://utfs.io/f/W3VPmidSNmjM0eRN9jhexy7VlrXM28Lw4sYEBjKmoqvR0kO1",
  "https://utfs.io/f/W3VPmidSNmjM9OIdbAlFHzN4fLm7sU6TAWiy5uGk0orSwevh",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function Home() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
