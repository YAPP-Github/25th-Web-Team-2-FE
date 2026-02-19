import { Metadata } from 'next';

import { fetchExperimentPost } from './fetchExperimentPost';
import type { UseQueryExperimentDetailsAPIResponse } from '../hooks/useExperimentDetailsQuery';

const DEFAULT_METADATA: Metadata = {
  title: '그라밋 | 공고 조회',
  description: '그라밋 | 실험 공고 조회',
};

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`;
};

const formatDescription = (title: string, postDetailData: UseQueryExperimentDetailsAPIResponse) => {
  const { summary, targetGroup } = postDetailData;
  const descriptionParts: string[] = [];

  if (summary.startDate && summary.endDate) {
    descriptionParts.push(
      `실험 일시: ${formatDate(summary.startDate)} ~ ${formatDate(summary.endDate)}`,
    );
  }

  const targetParts: string[] = [];
  if (targetGroup.startAge != null && targetGroup.endAge != null) {
    targetParts.push(`만 ${targetGroup.startAge} ~ ${targetGroup.endAge}세`);
  }
  if (targetGroup.genderType === 'MALE') {
    targetParts.push('남성');
  } else if (targetGroup.genderType === 'FEMALE') {
    targetParts.push('여성');
  }
  if (targetParts.length > 0) {
    descriptionParts.push(`모집 대상: ${targetParts.join(', ')}`);
  }

  if (summary.reward) {
    descriptionParts.push(`참여 보상: ${summary.reward}`);
  }

  if (summary.matchType === 'OFFLINE') {
    descriptionParts.push('진행 방식: 대면');
  } else if (summary.matchType === 'ONLINE') {
    descriptionParts.push('진행 방식: 비대면');
  }

  if (summary.timeRequired) {
    descriptionParts.push(`소요 시간: ${summary.timeRequired}`);
  }

  return descriptionParts.length > 0
    ? `${title} | ${descriptionParts.join(' | ')}`
    : `${title} | 그라밋 실험 공고`;
};

export async function getPostMetadata(postId: string): Promise<Metadata> {
  try {
    const { postDetailData } = await fetchExperimentPost(postId);
    const { title } = postDetailData;
    const pageTitle = `${title} | 그라밋`;
    const description = formatDescription(title, postDetailData);

    return {
      title: pageTitle,
      description,
      openGraph: {
        title: pageTitle,
        description,
      },
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description,
      },
    };
  } catch {
    return DEFAULT_METADATA;
  }
}
