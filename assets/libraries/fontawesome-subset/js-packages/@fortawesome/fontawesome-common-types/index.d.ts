export type IconPrefix = "fas" | "fab" | "far" | "fal" | "fad";
export type IconPathData = string | string[]

export interface IconLookup {
  prefix: IconPrefix;
  // IconName is defined in the code that will be generated at build time and bundled with this file.
  iconName: IconName;
}

export interface IconDefinition extends IconLookup {
  icon: [
    number, // width
    number, // height
    string[], // ligatures
    string, // unicode
    IconPathData // svgPathData
  ];
}

export interface IconPack {
  [key: string]: IconDefinition;
}

export type IconName = 'facebook' | 
  'facebook-f' | 
  'facebook-square' | 
  'instagram' | 
  'linkedin' | 
  'linkedin-in' | 
  'youtube' | 
  'arrow-down' | 
  'arrow-left' | 
  'arrow-right' | 
  'arrow-up' | 
  'envelope' | 
  'long-arrow-alt-down' | 
  'long-arrow-alt-left' | 
  'long-arrow-alt-right' | 
  'long-arrow-alt-up' | 
  'long-arrow-down' | 
  'long-arrow-left' | 
  'long-arrow-right' | 
  'long-arrow-up' | 
  'minus' | 
  'plus';
