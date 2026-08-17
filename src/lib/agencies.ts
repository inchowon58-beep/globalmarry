/** 제휴·광고 업체. 이 배열만 수정하면 /agencies 카드와 하단 배너 유입이 함께 갱신됩니다. */

export type Agency = {
  id: string;
  name: string;
  logo?: string;
  image?: string;
  countries: string[];
  features: string[];
  registrationNo: string;
  ceo: string;
  address: string;
  phone: string;
  ctaLabel: string;
  ctaUrl: string;
};

export const AGENCIES: Agency[] = [];

export function hasAgencies(): boolean {
  return AGENCIES.length > 0;
}
