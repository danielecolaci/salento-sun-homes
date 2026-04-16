
CREATE TABLE public.booking_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  numero_persone INTEGER NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  settimane_totali INTEGER NOT NULL,
  pets_required BOOLEAN NOT NULL DEFAULT false,
  accessibility_required BOOLEAN NOT NULL DEFAULT false,
  messaggio TEXT,
  assigned_property TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit booking requests"
ON public.booking_requests
FOR INSERT
WITH CHECK (true);
