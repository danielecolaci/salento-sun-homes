import {
  Users,
  Wifi,
  Snowflake,
  DoorOpen,
  Umbrella,
  UtensilsCrossed,
  CircleParking,
  PawPrint,
  Accessibility,
  WashingMachine,
  type LucideIcon
} from 'lucide-react';
import type { AmenityIcon } from '@/data/apartments';

export const amenityIconMap: Record<AmenityIcon, LucideIcon> = {
  capacity: Users,
  wifi: Wifi,
  ac: Snowflake,
  balcony: DoorOpen,
  terrace: Umbrella,
  kitchen: UtensilsCrossed,
  parking: CircleParking,
  pets: PawPrint,
  accessibility: Accessibility,
  washer: WashingMachine
};
