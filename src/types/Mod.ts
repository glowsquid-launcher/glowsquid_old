/* eslint-disable camelcase */
export interface License {
  id: string;
  name: string;
  url: string;
}
export default interface Mod {
  id: string;
  slug: string;
  team: string;
  title: string;
  description: string;
  body_url: string;
  published: Date;
  updated: Date;
  status: string;
  license: License;
  client_side: string;
  server_side: string;
  downloads: number;
  categories: string[];
  versions: string[];
  discord_url: string | null;
  donation_urls: string[] | null;
  icon_url: string | null;
  issues_url: string | null;
  source_url: string | null;
  wiki_url: string | null;
}
