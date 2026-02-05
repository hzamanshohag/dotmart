export type SocialPlatform = 'twitter' | 'facebook' | 'linkedin' | 'instagram' | 'Youtube';

export interface IReview {
  name: string;
  userImage?: string;
  social: {
    platform: SocialPlatform;
  };
  rating: number; // 1–5
  text: string;
  isApproved: boolean;
}
