import { v4 as uuidv4 } from 'uuid';
import type { Donation, AlertEvent } from '@/types';

const donorNames = [
  'CyberNinja', 'PixelQueen', 'StreamKing', 'GameMaster', 'ChatHero',
  'NeonRider', 'VoidWalker', 'StarGazer', 'MoonLight', 'SunBurst',
  'ThunderStrike', 'IcePhoenix', 'FireStorm', 'ShadowHunter', 'LightBringer',
  'QuantumLeap', 'DigitalDream', 'CosmicVoyager', 'TimeTraveler', 'SpaceExplorer'
];

const messages = [
  "Amazing stream! Keep it up! 🔥",
  "Love the content! ❤️",
  "First time here, instant follow!",
  "You're the best! Thanks for everything!",
  "This is insane! 🤯",
  "Can't stop watching! 👀",
  "Greetings from around the world! 🌍",
  "Your community is awesome! 💜",
  "Been here since day one! 💪",
  "This deserves more viewers! ⭐",
  "GG! Well played! 🎮",
  "Take my money! 💰",
  "Best streamer ever! 🏆",
  "Hype! Hype! Hype! 🚀",
  "Let's gooo! 🎉"
];

const mediaUrls = [
  'https://media.giphy.com/media/v1.Y2lkZXA9cmVhY3QmYXN5bmM9dHJ1ZSZjaWQ9YzIwYWY2MjVmMWQxODFkOWE5NjU0ZjA3YjY5YjY5YjY5YjY5YjY5JmN0PWc/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkZXA9cmVhY3QmYXN5bmM9dHJ1ZSZjaWQ9YzIwYWY2MjVmMWQxODFkOWE5NjU0ZjA3YjY5YjY5YjY5YjY5YjY5JmN0PWc/l0HlBO7eyXzSZkJri/giphy.gif',
  'https://media.giphy.com/media/v1.Y2lkZXA9cmVhY3QmYXN5bmM9dHJ1ZSZjaWQ9YzIwYWY2MjVmMWQxODFkOWE5NjU0ZjA3YjY5YjY5YjY5YjY5YjY5JmN0PWc/3o7TKSjRrfIPjeiVyM/giphy.gif',
];

export class EventSimulator {
  generateDonation(overrides?: Partial<Donation>): Donation {
    const amount = Math.random() * (500 - 5) + 5;
    const isLargeDonation = amount > 100;
    
    return {
      id: uuidv4(),
      donorName: overrides?.donorName || donorNames[Math.floor(Math.random() * donorNames.length)],
      amount: parseFloat(amount.toFixed(2)),
      currency: 'USD',
      message: overrides?.message || messages[Math.floor(Math.random() * messages.length)],
      timestamp: Date.now(),
      isAnonymous: Math.random() < 0.1,
      mediaUrl: isLargeDonation && Math.random() < 0.5 ? mediaUrls[Math.floor(Math.random() * mediaUrls.length)] : undefined,
      mediaType: isLargeDonation ? 'gif' : undefined,
      ttsEnabled: Math.random() < 0.3,
      variant: 'default',
      ...overrides,
    };
  }

  generateAlertEvent(donation?: Donation): AlertEvent {
    const don = donation || this.generateDonation();
    const priority = don.amount > 100 ? 1 : don.amount > 50 ? 2 : 3;
    
    return {
      id: don.id,
      type: 'donation',
      data: don,
      priority,
      duration: don.amount > 100 ? 8000 : 5000,
      createdAt: Date.now(),
    };
  }

  generateBurst(count: number): AlertEvent[] {
    const events: AlertEvent[] = [];
    for (let i = 0; i < count; i++) {
      const donation = this.generateDonation({
        amount: Math.random() * (100 - 10) + 10,
      });
      events.push(this.generateAlertEvent(donation));
    }
    return events;
  }

  generateSpam(count: number): AlertEvent[] {
    const events: AlertEvent[] = [];
    for (let i = 0; i < count; i++) {
      const donation = this.generateDonation({
        amount: Math.random() * (20 - 1) + 1,
        message: 'SPAM! SPAM! SPAM! 🚨',
      });
      events.push(this.generateAlertEvent(donation));
    }
    return events;
  }

  generateLargeDonation(): AlertEvent {
    const donation = this.generateDonation({
      amount: Math.random() * (1000 - 100) + 100,
      message: "BIG SUPPORT! Let's gooo! 🎊🎉",
      mediaUrl: mediaUrls[Math.floor(Math.random() * mediaUrls.length)],
      mediaType: 'gif',
    });
    return this.generateAlertEvent(donation);
  }

  generateCustomEvent(type: 'subscription' | 'follow' | 'raid' | 'host' | 'cheer', userData?: Record<string, unknown>): AlertEvent {
    const baseData = {
      id: uuidv4(),
      timestamp: Date.now(),
      ...userData,
    };

    let priority = 3;
    let duration = 5000;

    switch (type) {
      case 'raid':
        priority = 1;
        duration = 10000;
        break;
      case 'subscription':
        priority = 2;
        duration = 7000;
        break;
      case 'cheer':
        priority = 2;
        duration = 6000;
        break;
    }

    return {
      id: baseData.id,
      type,
      data: baseData,
      priority,
      duration,
      createdAt: Date.now(),
    };
  }
}

export const simulator = new EventSimulator();
