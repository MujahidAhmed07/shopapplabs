import SinglePlatformPage, { generateMetadata as baseGenerateMetadata } from '../[platformSlug]-username-checker/page';

export async function generateMetadata({ params }) {
  const { platformSlug } = await params;
  return baseGenerateMetadata({ params: { platformSlug: `${platformSlug}-username-checker` } });
}

export default async function Page({ params }) {
  const { platformSlug } = await params;
  return <SinglePlatformPage params={{ platformSlug: `${platformSlug}-username-checker` }} />;
}
