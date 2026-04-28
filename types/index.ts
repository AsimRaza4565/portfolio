import { StaticImageData } from "next/image";

export interface IBlog {
  id: number;
  title: string;
  content: string;
  image: StaticImageData | string;
  altText: string;
  reversed?: boolean;
}

export interface IBlogCardProps {
  blog: IBlog;
  index: number;
}

export interface IExperience {
  id: string;
  title: string;
  desc: string;
  duration: string;
  previousRole?: string;
  logo: StaticImageData | string;
  href: string;
  alt: string;
  logoTitle: string;
  logoClassName?: string;
}

export interface ITechGroup {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

export interface ICoreStrength {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface IProjectInfo {
  [key: string]: string;
}

export interface IServiceInfo {
  [key: string]: string;
}
