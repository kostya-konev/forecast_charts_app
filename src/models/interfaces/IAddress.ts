import type { IGeoLocation } from "@/models";

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeoLocation;
}
