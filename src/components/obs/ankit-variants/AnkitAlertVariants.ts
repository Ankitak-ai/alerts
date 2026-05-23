import React from 'react';

export interface VariantDonation {
  id: string;
  name: string;
  amount: number;
  currency: string;
  message?: string;
  voice_message_url?: string;
  hypersound_url?: string;
  is_hyperemote?: boolean;
  media_url?: string;
  media_type?: string;
}

export interface LbDonation {
  name: string;
  amount: number;
  currency: string;
  created_at: string;
}

export interface LbTopDonator {
  name: string;
  totalAmount: number;
}
