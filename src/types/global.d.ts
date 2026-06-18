// Static image asset imports (React Native resolves these as numbers at runtime)
declare module "*.png" {
  import { ImageSourcePropType } from "react-native";
  const value: ImageSourcePropType;
  export default value;
}

declare module "*.jpg" {
  import { ImageSourcePropType } from "react-native";
  const value: ImageSourcePropType;
  export default value;
}

declare module "*.jpeg" {
  import { ImageSourcePropType } from "react-native";
  const value: ImageSourcePropType;
  export default value;
}

declare module "*.gif" {
  import { ImageSourcePropType } from "react-native";
  const value: ImageSourcePropType;
  export default value;
}

declare module "*.webp" {
  import { ImageSourcePropType } from "react-native";
  const value: ImageSourcePropType;
  export default value;
}
