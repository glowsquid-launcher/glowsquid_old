/* eslint-disable camelcase */
export default interface Mod {
  id: string;
  team: string;
  title: string;
  description: string;
  body_url: string;
  icon_url: string | null;
  issues_url: string | null;
  source_url: string | null;
  wiki_url: string | null;
  published: string;
  downloads: number;
  categories: string[];
  versions: string[];
}
