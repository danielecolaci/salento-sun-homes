import { useState } from "react";
import { motion } from "framer-motion";
import { format, addWeeks } from "date-fns";
import { it as itLocale } from "date-fns/locale/it";
import { enUS } from "date-fns/locale/en-US";
import { CalendarIcon, Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";

export function BookingForm() {
  const { locale, t } = useI18n();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [persone, setPersone] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [settimane, setSettimane] = useState("");
  const [pets, setPets] = useState(false);
  const [accessibility, setAccessibility] = useState(false);
  const [messaggio, setMessaggio] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const seasonStart = new Date(2026, 4, 30); // May 30 2026 (Saturday)
  const seasonEnd = new Date(2026, 9, 3); // Oct 3 2026 (Saturday)

  const checkOut = checkIn && settimane ? addWeeks(checkIn, parseInt(settimane)) : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !settimane || !nome.trim() || !email.trim() || !persone) return;

    setStatus("loading");
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("booking_requests").insert({
        nome: nome.trim(),
        email: email.trim(),
        numero_persone: parseInt(persone),
        check_in: format(checkIn, "yyyy-MM-dd"),
        check_out: format(checkOut!, "yyyy-MM-dd"),
        settimane_totali: parseInt(settimane),
        pets_required: pets,
        accessibility_required: accessibility,
        messaggio: messaggio.trim() || null,
      });

      if (error) throw error;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="booking" className="py-20 md:py-28 bg-secondary" aria-labelledby="booking-title">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-12 shadow-sm"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold mb-4">{t("form", "success")}</h3>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 md:py-28 bg-secondary" aria-labelledby="booking-title">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 id="booking-title" className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t("form", "title")}
          </h2>
          <p className="text-center text-muted-foreground mb-12">{t("form", "subtitle")}</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-6 md:p-10 shadow-sm space-y-6"
          noValidate
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome">{t("form", "nome")} *</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                maxLength={100}
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("form", "email")} *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label id="persone-label">{t("form", "persone")} *</Label>
              <Select value={persone} onValueChange={setPersone}>
                <SelectTrigger aria-labelledby="persone-label">
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1} {t("form", "personeLabel")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label id="checkin-label">{t("form", "checkin")} *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !checkIn && "text-muted-foreground")}
                    aria-labelledby="checkin-label"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                    {checkIn ? format(checkIn, "dd/MM/yyyy") : t("form", "selectDate")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date.getDay() !== 6 || date < seasonStart || date > seasonEnd}
                    locale={locale === "it" ? itLocale : enUS}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label id="settimane-label">{t("form", "settimane")} *</Label>
              <Select value={settimane} onValueChange={setSettimane}>
                <SelectTrigger aria-labelledby="settimane-label">
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} {n === 1 ? t("form", "week") : t("form", "weeks")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {checkOut && (
            <div className="bg-muted rounded-xl p-4 text-sm" role="status">
              <span className="font-medium">{t("form", "checkout")}:</span>{" "}
              {format(checkOut, "dd/MM/yyyy")}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="pets"
                checked={pets}
                onCheckedChange={(v) => setPets(v === true)}
              />
              <Label htmlFor="pets" className="cursor-pointer font-normal">
                {t("form", "pets")}
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="accessibility"
                checked={accessibility}
                onCheckedChange={(v) => setAccessibility(v === true)}
              />
              <Label htmlFor="accessibility" className="cursor-pointer font-normal">
                {t("form", "accessibility")}
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="messaggio">{t("form", "messaggio")}</Label>
            <Textarea
              id="messaggio"
              value={messaggio}
              onChange={(e) => setMessaggio(e.target.value)}
              maxLength={1000}
              rows={4}
            />
          </div>

          {status === "error" && (
            <p className="text-destructive text-sm" role="alert">{t("form", "error")}</p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
            <Send className="w-4 h-4 mr-2" aria-hidden="true" />
            {status === "loading" ? "..." : t("form", "submit")}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
