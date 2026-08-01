import SinglePlatformPage, { generateMetadata as baseGenerateMetadata } from '../[platformSlug]-username-checker/page';

export async function generateMetadata() {
  return baseGenerateMetadata({ params: { platformSlug: 'domain-availability' } });
}

export default function DomainCheckerPage() {
  return <SinglePlatformPage params={{ platformSlug: 'domain-availability' }} />;
}
