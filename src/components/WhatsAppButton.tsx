import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/393331234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-whatsapp text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      aria-label="Contattaci su WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
