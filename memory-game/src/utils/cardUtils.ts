import { CardType } from '../types';

const getImages = (theme: string): string[] => {
  const base = theme === 'fruits'
    ? ['🍎', '🍌', '🍇', '🍉', '🍊', '🍍', '🥝', '🍓', '🥭', '🍒', '🍐', '🍋']
    : ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐸', '🦁', '🐮', '🐷', '🐵', '🐔'];
  return base;
};

export const generateShuffledCards = (level: string, theme: string): CardType[] => {
  const size = level === 'easy' ? 8 : level === 'medium' ? 16 : 24;
  const baseImages = getImages(theme).slice(0, size / 2);
  const cards = [...baseImages, ...baseImages].map((image, index) => ({
    id: index + 1,
    image,
    flipped: false,
    matched: false,
  }));

  return cards.sort(() => Math.random() - 0.5);
};