/// <reference types="vite/client" />

declare module "*.jsx" {
  import type { ComponentType } from "react";
  const component: ComponentType<any>;
  export default component;
  export const Panel: ComponentType<any>;
  export const SectionHeading: ComponentType<any>;
  export const PanelContent: ComponentType<any>;
  export const StripeDivider: ComponentType<any>;
  export const AHMark: ComponentType<any>;
  export const AHNavMark: ComponentType<any>;
}

declare module "*.js" {
  const value: any;
  export default value;
  export const profile: any;
  export const about: any;
  export const socialLinks: any;
  export const stack: any;
  export const education: any;
  export const projects: any;
  export const achievements: any;
  export const certifications: any;
  export const research: any;
  export const navItems: any;
  export const searchItems: any;
}
