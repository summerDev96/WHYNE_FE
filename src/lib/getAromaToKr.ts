import { aromaMap } from '@/components/Modal/ReviewModal/EditReviewModal';

export function getAromaToKr(tag: string) {
  for (const key in aromaMap) {
    if (aromaMap[key] === tag) return key;
  }
}
