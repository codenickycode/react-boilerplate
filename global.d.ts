/* GRAPHQL */
declare module "*.graphql" {
  import { DocumentNode } from "graphql";
  const Schema: DocumentNode;
  export = Schema;
}

/* CSS */
declare module "*.css" {
  const ref: Record<string, string>;
  export default ref;
}

/* IMAGES */
declare module "*.svg" {
  import { ReactElement, SVGProps } from "react";
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}
declare module "*.gif" {
  const ref: string;
  export default ref;
}
declare module "*.jpg" {
  const ref: string;
  export default ref;
}
declare module "*.jpeg" {
  const ref: string;
  export default ref;
}
declare module "*.png" {
  const ref: string;
  export default ref;
}
