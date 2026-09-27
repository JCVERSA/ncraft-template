import React from 'react';

export type MinecraftIconName =
  | 'emerald'
  | 'diamond'
  | 'sword'
  | 'iron-sword'
  | 'pickaxe'
  | 'heart'
  | 'heart-empty'
  | 'heart-half'
  | 'food'
  | 'shield'
  | 'armor'
  | 'creeper'
  | 'steve'
  | 'alex'
  | 'villager'
  | 'warden'
  | 'knight'
  | 'grass-block'
  | 'portal'
  | 'ender-eye'
  | 'command-block'
  | 'ping'
  | 'bread'
  | 'brick'
  | 'map'
  | 'skull'
  | 'wither-skull'
  | 'anvil'
  | 'clock'
  | 'alert'
  | 'close'
  | 'repeater'
  | 'disc'
  | 'star'
  | 'tnt'
  | 'fire'
  | 'book'
  | 'sleep'
  | 'lightning'
  | 'chest'
  | 'tree'
  | 'castle';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

// 1. EMERALD
export const EmeraldIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Dark outline */}
    <path
      d="M5 2h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V5h1V3h2V2z"
      fill="#053315"
    />
    {/* Body green base */}
    <path
      d="M5 3h6v2h2v6h-2v2H5v-2H3V5h2V3z"
      fill="#17DD62"
    />
    {/* Facet Shadows */}
    <path
      d="M11 5h2v6h-2v2H9v-1h2V6h-1V5h1zm-6 6h4v2H5v-2z"
      fill="#0B8E3D"
    />
    <path
      d="M10 7h1v4h-1v1H8v-1h2V7z"
      fill="#065926"
    />
    {/* Highlights */}
    <path
      d="M5 3h3v1H5V3zm-2 2h2v4H3V5zm2 0h2v1H5V5zm1 1h4v1H6V6z"
      fill="#7EFF9E"
    />
    <rect x="6" y="4" width="2" height="1" fill="#FFFFFF" />
  </svg>
);

// 2. DIAMOND
export const DiamondIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Outline */}
    <path
      d="M5 2h6v1h2v3h-1v2h-1v2h-1v2h-1v2h-2v-2H6v-2H5V8H4V6h1V3h2V2z"
      fill="#063238"
    />
    {/* Main body cyan */}
    <path
      d="M5 3h6v3h-1v2h-1v2H9v2H7v-2H6V8H5V6h1V4H5V3z"
      fill="#2CCDB1"
    />
    {/* Shadow facets */}
    <path
      d="M9 4h2v2h-1v2H9v2H8v2H7v-2h1V8h1V6h1V4z"
      fill="#137877"
    />
    <path
      d="M10 6h1v2h-1V6z"
      fill="#0A4C4C"
    />
    {/* Highlights */}
    <path
      d="M5 3h3v1H5V3zm-1 3h2v2H5V6zm1-1h1v1H5V5z"
      fill="#8CF4E2"
    />
    <rect x="6" y="3" width="2" height="1" fill="#FFFFFF" />
    <rect x="5" y="4" width="1" height="1" fill="#FFFFFF" />
  </svg>
);

// 3. DIAMOND SWORD
export const DiamondSwordIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Outline */}
    <path
      d="M12 1h3v3h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h1v1h-1v1H9v-1H8v-1h1V9H8V8H7V7h1V6h1V5h1V4h1V3h1V2h-1V1h1z"
      fill="#083838"
    />
    {/* Blade Core Cyan */}
    <path
      d="M13 2h1v1h-1v1h-1v1h-1v1h-1v1h-1v1H8V8h1V7h1V6h1V5h1V4h1V3h-1V2h1z"
      fill="#2CCDB1"
    />
    {/* Blade Highlight Edge */}
    <path
      d="M14 2h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1H7V7h1V6h1V5h1V4h1V3h1V2h1z"
      fill="#8CF4E2"
    />
    <rect x="13" y="2" width="1" height="1" fill="#FFFFFF" />
    {/* Blade Shadow Edge */}
    <path
      d="M14 3h-1v1h-1v1h-1v1h-1v1h-1v1H8v1h1V8h1V7h1V6h1V5h1V4h1V3z"
      fill="#12706D"
    />
    {/* Guard */}
    <path d="M6 8h2v1H6V8zm-1 1h2v1H5V9zm3 0h1v2H7v-1h1V9z" fill="#083838" />
    <rect x="6" y="9" width="1" height="1" fill="#2CCDB1" />
    <rect x="5" y="9" width="1" height="1" fill="#8CF4E2" />
    <rect x="7" y="10" width="1" height="1" fill="#12706D" />
    {/* Hilt Wood */}
    <path d="M4 10h2v1H4v-1zm-1 1h2v1H3v-1zm-1 1h2v1H2v-1z" fill="#3D2916" />
    <rect x="4" y="11" width="1" height="1" fill="#7A562B" />
    <rect x="3" y="12" width="1" height="1" fill="#7A562B" />
    {/* Pommel */}
    <rect x="1" y="13" width="2" height="2" fill="#083838" />
    <rect x="1" y="13" width="1" height="1" fill="#2CCDB1" />
  </svg>
);

// 4. IRON SWORD
export const IronSwordIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    <path
      d="M12 1h3v3h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h1v1h-1v1H9v-1H8v-1h1V9H8V8H7V7h1V6h1V5h1V4h1V3h1V2h-1V1h1z"
      fill="#262626"
    />
    <path
      d="M13 2h1v1h-1v1h-1v1h-1v1h-1v1h-1v1H8V8h1V7h1V6h1V5h1V4h1V3h-1V2h1z"
      fill="#C6C6C6"
    />
    <path
      d="M14 2h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1H7V7h1V6h1V5h1V4h1V3h1V2h1z"
      fill="#FFFFFF"
    />
    <path
      d="M14 3h-1v1h-1v1h-1v1h-1v1h-1v1H8v1h1V8h1V7h1V6h1V5h1V4h1V3z"
      fill="#8A8A8A"
    />
    {/* Guard */}
    <rect x="6" y="9" width="1" height="1" fill="#E0E0E0" />
    <rect x="5" y="9" width="1" height="1" fill="#FFFFFF" />
    <rect x="7" y="10" width="1" height="1" fill="#6E6E6E" />
    {/* Hilt */}
    <rect x="4" y="11" width="1" height="1" fill="#7A562B" />
    <rect x="3" y="12" width="1" height="1" fill="#7A562B" />
    <rect x="1" y="13" width="2" height="2" fill="#262626" />
    <rect x="1" y="13" width="1" height="1" fill="#C6C6C6" />
  </svg>
);

// 5. PICKAXE
export const PickaxeIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Pick Head Outline */}
    <path
      d="M8 1h7v7h-1V7h-1V6h-1V5h-1V4h-1V3h-1V2H8V1z"
      fill="#083838"
    />
    <path
      d="M9 2h5v5h-1V5h-1V4h-1V3H9V2z"
      fill="#2CCDB1"
    />
    <path
      d="M10 2h4v1h-1v1h-1v1h-1v1H9V4h1V3h1V2z"
      fill="#8CF4E2"
    />
    <rect x="13" y="2" width="1" height="1" fill="#FFFFFF" />
    <rect x="8" y="4" width="2" height="2" fill="#12706D" />
    <rect x="11" y="7" width="2" height="2" fill="#12706D" />
    {/* Handle */}
    <path
      d="M7 6h2v2H8v1H7v1H6v1H5v1H4v1H3v1H2v2H1v-2h1v-1h1v-1h1v-1h1v-1h1v-1h1V6z"
      fill="#382613"
    />
    <path
      d="M8 7H7v1H6v1H5v1H4v1H3v1H2v1h1v-1h1v-1h1v-1h1v-1h1v-1h1V7z"
      fill="#8A6332"
    />
  </svg>
);

// 6. REDSTONE HEART (FULL)
export const HeartIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Black / Dark outline */}
    <path
      d="M3 2h4v1h2V2h4v1h1v4h-1v2h-1v2h-1v1h-1v1h-1v1H8v1H7v-1H6v-1H5v-1H4V9H3V7H2V3h1V2z"
      fill="#260000"
    />
    {/* Deep Red Core */}
    <path
      d="M3 3h4v3H6v2H5v1H4V7H3V3zm6 0h4v4h-1v2h-1v1H9V8H8V5h1V3z"
      fill="#DE1B1B"
    />
    {/* Bright Red Fill */}
    <path
      d="M4 4h2v2H4V4zm6 0h2v3h-1v1H9V5h1V4z"
      fill="#FF3838"
    />
    {/* Specular White Highlight */}
    <rect x="4" y="3" width="1" height="1" fill="#FFFFFF" />
    <rect x="5" y="4" width="1" height="1" fill="#FFFFFF" />
    {/* Bottom Shadow */}
    <path
      d="M7 10h2v1H7v-1zm1 1h1v1H8v-1zm-2-2h1v1H6V9z"
      fill="#780606"
    />
  </svg>
);

// 7. EMPTY HEART
export const EmptyHeartIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    <path
      d="M3 2h4v1h2V2h4v1h1v4h-1v2h-1v2h-1v1h-1v1h-1v1H8v1H7v-1H6v-1H5v-1H4V9H3V7H2V3h1V2z"
      fill="#1A1A1A"
    />
    <path
      d="M3 3h4v1H8V3h4v4h-1v2h-1v2h-1v1H7v-1H6V9H5V7H3V3z"
      fill="#404040"
    />
    <path
      d="M4 4h2v3H5v2H4V4zm6 0h2v3h-1v2h-1V4z"
      fill="#292929"
    />
    <rect x="4" y="3" width="1" height="1" fill="#696969" />
  </svg>
);

// 8. HALF HEART
export const HalfHeartIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Outline */}
    <path
      d="M3 2h4v1h2V2h4v1h1v4h-1v2h-1v2h-1v1h-1v1h-1v1H8v1H7v-1H6v-1H5v-1H4V9H3V7H2V3h1V2z"
      fill="#260000"
    />
    {/* Left side full red */}
    <path
      d="M3 3h4v5H6v2H5v1H4V7H3V3z"
      fill="#DE1B1B"
    />
    <rect x="4" y="3" width="1" height="1" fill="#FFFFFF" />
    <rect x="5" y="4" width="1" height="1" fill="#FFFFFF" />
    <rect x="4" y="4" width="2" height="2" fill="#FF3838" />
    {/* Right side empty dark */}
    <path
      d="M8 3h4v4h-1v2h-1v2h-1v1H8V3z"
      fill="#383838"
    />
    <path
      d="M9 4h2v3h-1v2H9V4z"
      fill="#222222"
    />
  </svg>
);

// 9. FOOD DRUMSTICK (HUNGER)
export const FoodIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Outline */}
    <path
      d="M8 2h5v4h-1v2h-1v2h-1v2H9v1H7v-1H5v-1H3v-2H1V8h2V6h2V4h3V2z"
      fill="#301503"
    />
    {/* Roast Chicken Meat */}
    <path
      d="M8 3h4v3h-1v2h-1v2h-1v2H8v-1H6v-1H4V8h2V5h2V3z"
      fill="#C96820"
    />
    {/* Highlight */}
    <path
      d="M8 3h3v2h-1v2h-1v2H8V6h1V5H8V3z"
      fill="#ECA04B"
    />
    <rect x="9" y="3" width="2" height="1" fill="#FEDB89" />
    {/* Bone Tip */}
    <rect x="2" y="9" width="2" height="2" fill="#DDDDCB" />
    <rect x="1" y="9" width="1" height="1" fill="#FFFFFF" />
    <rect x="2" y="10" width="1" height="1" fill="#999988" />
  </svg>
);

// 10. SHIELD / ARMOR
export const ShieldIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Outline */}
    <path
      d="M3 2h10v8h-1v2h-1v2h-2v1H7v-1H5v-2H4v-2H3V2z"
      fill="#1C1C1C"
    />
    {/* Iron rim */}
    <path
      d="M4 3h8v7h-1v2h-1v2H6v-2H5v-2H4V3z"
      fill="#9E9E9E"
    />
    {/* Shield boss / wood inner */}
    <path
      d="M5 4h6v5h-1v2H6v-2H5V4z"
      fill="#7A522E"
    />
    {/* Iron Center Boss */}
    <rect x="7" y="5" width="2" height="3" fill="#DEDEDE" />
    <rect x="7" y="5" width="1" height="1" fill="#FFFFFF" />
    <rect x="8" y="7" width="1" height="1" fill="#5E5E5E" />
    {/* Iron rim highlight */}
    <path d="M4 3h8v1H4V3zm0 1h1v6H4V4z" fill="#D6D6D6" />
  </svg>
);

// 11. CREEPER FACE
export const CreeperIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Creeper Green Head */}
    <rect x="1" y="1" width="14" height="14" fill="#388722" />
    {/* Mottled pixel variation */}
    <rect x="2" y="2" width="3" height="3" fill="#4AA82F" />
    <rect x="11" y="2" width="3" height="3" fill="#4AA82F" />
    <rect x="1" y="10" width="3" height="4" fill="#2E6C1C" />
    <rect x="12" y="10" width="3" height="4" fill="#2E6C1C" />
    <rect x="6" y="2" width="4" height="2" fill="#4AA82F" />
    <rect x="2" y="7" width="2" height="2" fill="#2E6C1C" />
    <rect x="12" y="7" width="2" height="2" fill="#2E6C1C" />
    {/* Eyes */}
    <rect x="3" y="4" width="3" height="3" fill="#111111" />
    <rect x="10" y="4" width="3" height="3" fill="#111111" />
    {/* Nose and Mouth bridge */}
    <rect x="6" y="7" width="4" height="4" fill="#111111" />
    <rect x="5" y="9" width="6" height="4" fill="#111111" />
    {/* Mouth chin notch */}
    <rect x="4" y="11" width="2" height="3" fill="#111111" />
    <rect x="10" y="11" width="2" height="3" fill="#111111" />
    {/* Cutout / teeth gap */}
    <rect x="6" y="13" width="4" height="1" fill="#388722" />
    <rect x="7" y="11" width="2" height="2" fill="#388722" />
  </svg>
);

// 12. STEVE HEAD
export const SteveHeadIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Hair */}
    <rect x="1" y="1" width="14" height="6" fill="#3B2616" />
    <rect x="1" y="6" width="2" height="4" fill="#3B2616" />
    <rect x="13" y="6" width="2" height="4" fill="#3B2616" />
    {/* Face Skin */}
    <rect x="3" y="5" width="10" height="9" fill="#B88258" />
    <rect x="1" y="10" width="14" height="4" fill="#B88258" />
    {/* Eyes */}
    <rect x="3" y="7" width="3" height="2" fill="#FFFFFF" />
    <rect x="4" y="7" width="2" height="2" fill="#32338A" />
    <rect x="10" y="7" width="3" height="2" fill="#FFFFFF" />
    <rect x="10" y="7" width="2" height="2" fill="#32338A" />
    {/* Nose */}
    <rect x="6" y="8" width="4" height="2" fill="#935E3B" />
    {/* Mouth / Goatee */}
    <rect x="5" y="10" width="6" height="2" fill="#593218" />
    <rect x="6" y="10" width="4" height="1" fill="#402310" />
  </svg>
);

// 13. ALEX HEAD
export const AlexHeadIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Orange Ginger Hair */}
    <rect x="1" y="1" width="14" height="6" fill="#BD5F26" />
    <rect x="1" y="6" width="3" height="6" fill="#BD5F26" />
    <rect x="12" y="6" width="3" height="5" fill="#BD5F26" />
    {/* Hair strands */}
    <rect x="2" y="2" width="4" height="2" fill="#DB7535" />
    {/* Skin */}
    <rect x="4" y="6" width="8" height="8" fill="#E8B58F" />
    <rect x="1" y="12" width="14" height="2" fill="#E8B58F" />
    {/* Green Eyes */}
    <rect x="4" y="7" width="3" height="2" fill="#FFFFFF" />
    <rect x="5" y="7" width="2" height="2" fill="#2E783D" />
    <rect x="9" y="7" width="3" height="2" fill="#FFFFFF" />
    <rect x="9" y="7" width="2" height="2" fill="#2E783D" />
    {/* Nose and Lips */}
    <rect x="6" y="9" width="4" height="1" fill="#D19A75" />
    <rect x="6" y="11" width="4" height="1" fill="#B36554" />
  </svg>
);

// 14. VILLAGER HEAD (LIBRARIAN / TRADER)
export const VillagerHeadIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Librarian Hat / Red Trim */}
    <rect x="2" y="1" width="12" height="3" fill="#8A261D" />
    <rect x="1" y="3" width="14" height="1" fill="#DEAB35" />
    {/* Forehead & Skin */}
    <rect x="3" y="4" width="10" height="10" fill="#BD8B66" />
    {/* Unibrow */}
    <rect x="4" y="6" width="8" height="1" fill="#4A3423" />
    {/* Eyes */}
    <rect x="4" y="7" width="3" height="2" fill="#FFFFFF" />
    <rect x="5" y="7" width="1" height="2" fill="#1C6634" />
    <rect x="9" y="7" width="3" height="2" fill="#FFFFFF" />
    <rect x="10" y="7" width="1" height="2" fill="#1C6634" />
    {/* Villager Big Nose */}
    <rect x="6" y="8" width="4" height="5" fill="#9C6B47" />
    <rect x="6" y="12" width="4" height="1" fill="#754E31" />
  </svg>
);

// 15. WARDEN HEAD / SCULK
export const WardenHeadIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Horns / Sculk Tendrils */}
    <rect x="2" y="1" width="2" height="4" fill="#00FFD5" />
    <rect x="1" y="2" width="1" height="2" fill="#06786A" />
    <rect x="12" y="1" width="2" height="4" fill="#00FFD5" />
    <rect x="14" y="2" width="1" height="2" fill="#06786A" />
    {/* Deepslate Navy Head */}
    <rect x="3" y="4" width="10" height="11" fill="#0B1C24" />
    {/* Blind Eye Texture / Sculk Speckles */}
    <rect x="4" y="6" width="2" height="2" fill="#00FFD5" />
    <rect x="10" y="6" width="2" height="2" fill="#00FFD5" />
    {/* Ribcage / Heart Glow */}
    <rect x="5" y="10" width="6" height="4" fill="#030C10" />
    <rect x="7" y="11" width="2" height="2" fill="#00FFD5" />
  </svg>
);

// 16. KNIGHT HEAD (IRON HELMET)
export const KnightHeadIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Golden crest */}
    <rect x="7" y="1" width="2" height="2" fill="#F0C02B" />
    {/* Iron Helmet Shell */}
    <rect x="2" y="3" width="12" height="11" fill="#999EA8" />
    {/* Visor highlight */}
    <path d="M3 4h10v1H3V4zm0 1h1v7H3V5z" fill="#D3D8E2" />
    {/* Visor slit / shadow */}
    <rect x="3" y="7" width="10" height="2" fill="#1C1F26" />
    {/* Noseguard */}
    <rect x="7" y="6" width="2" height="4" fill="#727882" />
    {/* Mouth vents */}
    <rect x="5" y="11" width="1" height="2" fill="#2E333D" />
    <rect x="7" y="11" width="2" height="2" fill="#2E333D" />
    <rect x="10" y="11" width="1" height="2" fill="#2E333D" />
  </svg>
);

// 17. GRASS BLOCK (OVERWORLD)
export const GrassBlockIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Dirt base */}
    <rect x="1" y="1" width="14" height="14" fill="#866043" />
    {/* Dirt spots */}
    <rect x="3" y="8" width="2" height="2" fill="#5A3D27" />
    <rect x="8" y="10" width="2" height="2" fill="#5A3D27" />
    <rect x="11" y="7" width="2" height="2" fill="#5A3D27" />
    <rect x="4" y="12" width="2" height="1" fill="#9E7554" />
    <rect x="10" y="12" width="2" height="2" fill="#9E7554" />
    {/* Grass Top with Dripping Edge */}
    <rect x="1" y="1" width="14" height="4" fill="#588D37" />
    <path
      d="M1 5h2v2H2v-1H1V5zm3 0h2v3H5v-1H4V5zm4 0h2v2H9v-1H8V5zm3 0h3v3h-1V7h-1V6h-1V5z"
      fill="#588D37"
    />
    {/* Grass Highlight */}
    <rect x="2" y="1" width="12" height="1" fill="#75B847" />
    <rect x="3" y="2" width="3" height="1" fill="#75B847" />
    <rect x="9" y="2" width="4" height="1" fill="#75B847" />
  </svg>
);

// 18. NETHER PORTAL / OBSIDIAN
export const NetherPortalIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Obsidian frame */}
    <rect x="1" y="1" width="14" height="14" fill="#140D21" />
    {/* Portal energy */}
    <rect x="4" y="3" width="8" height="10" fill="#6E15B5" />
    <rect x="5" y="4" width="6" height="8" fill="#A832EC" />
    <rect x="6" y="5" width="4" height="6" fill="#D36BFF" />
    <rect x="7" y="7" width="2" height="2" fill="#F4D3FF" />
    {/* Crying obsidian tears */}
    <rect x="2" y="3" width="1" height="2" fill="#9328EB" />
    <rect x="13" y="10" width="1" height="2" fill="#9328EB" />
  </svg>
);

// 19. EYE OF ENDER
export const EnderEyeIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Dark rim */}
    <path
      d="M5 2h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V5h1V3h2V2z"
      fill="#05261F"
    />
    {/* Teal iris base */}
    <path
      d="M5 3h6v2h2v6h-2v2H5v-2H3V5h2V3z"
      fill="#1C7E68"
    />
    {/* Light teal shimmer */}
    <path
      d="M5 4h3v1H5V4zm-1 2h2v2H4V6z"
      fill="#43CBA9"
    />
    <rect x="6" y="3" width="2" height="1" fill="#9BFFE6" />
    {/* Slit pupil */}
    <path
      d="M7 5h2v6H7V5z"
      fill="#0D2E14"
    />
    {/* Orange fiery heart of eye */}
    <rect x="7" y="7" width="2" height="2" fill="#EA761A" />
    <rect x="7" y="8" width="1" height="1" fill="#FFDC33" />
  </svg>
);

// 20. COMMAND BLOCK
export const CommandBlockIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Brown orange body */}
    <rect x="1" y="1" width="14" height="14" fill="#B3703E" />
    <rect x="2" y="2" width="12" height="12" fill="#8C4E23" />
    {/* Corner studs */}
    <rect x="2" y="2" width="2" height="2" fill="#3D1D09" />
    <rect x="12" y="2" width="2" height="2" fill="#3D1D09" />
    <rect x="2" y="12" width="2" height="2" fill="#3D1D09" />
    <rect x="12" y="12" width="2" height="2" fill="#3D1D09" />
    {/* Center dial */}
    <rect x="5" y="5" width="6" height="6" fill="#451F08" />
    <rect x="6" y="6" width="4" height="4" fill="#A8DCE0" />
    <rect x="7" y="7" width="2" height="2" fill="#00FFCC" />
    {/* Light nodes */}
    <rect x="7" y="3" width="2" height="1" fill="#FF5252" />
    <rect x="7" y="12" width="2" height="1" fill="#52FF89" />
  </svg>
);

// 21. PING BARS (MINECRAFT SERVER LIST CONNECTION)
export const PingIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Bar 1 (2px) */}
    <rect x="2" y="11" width="2" height="3" fill="#00FF2A" />
    {/* Bar 2 (4px) */}
    <rect x="5" y="9" width="2" height="5" fill="#00FF2A" />
    {/* Bar 3 (6px) */}
    <rect x="8" y="7" width="2" height="7" fill="#00FF2A" />
    {/* Bar 4 (8px) */}
    <rect x="11" y="5" width="2" height="9" fill="#00FF2A" />
    {/* Bar 5 (10px) */}
    <rect x="14" y="3" width="2" height="11" fill="#00FF2A" />
    {/* Shadow base */}
    <rect x="2" y="14" width="14" height="1" fill="#005A0E" />
  </svg>
);

// 22. BREAD
export const BreadIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Dark outline */}
    <path
      d="M3 5h10v1h1v4h-1v2H3v-2H2V6h1V5z"
      fill="#381D06"
    />
    {/* Golden crust */}
    <path
      d="M3 6h10v4H3V6z"
      fill="#C78028"
    />
    {/* Top crust bake marks */}
    <rect x="4" y="6" width="1" height="3" fill="#693305" />
    <rect x="7" y="6" width="1" height="3" fill="#693305" />
    <rect x="10" y="6" width="1" height="3" fill="#693305" />
    {/* Highlights */}
    <rect x="5" y="6" width="1" height="2" fill="#E8B05D" />
    <rect x="8" y="6" width="1" height="2" fill="#E8B05D" />
    <rect x="11" y="6" width="1" height="2" fill="#E8B05D" />
  </svg>
);

// 23. BRICK
export const BrickIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Mortar grey */}
    <rect x="1" y="1" width="14" height="14" fill="#B0A499" />
    {/* Row 1 Bricks */}
    <rect x="2" y="2" width="5" height="3" fill="#9C3B28" />
    <rect x="8" y="2" width="6" height="3" fill="#B84A35" />
    {/* Row 2 Bricks */}
    <rect x="1" y="6" width="2" height="3" fill="#852E1D" />
    <rect x="4" y="6" width="6" height="3" fill="#9C3B28" />
    <rect x="11" y="6" width="4" height="3" fill="#B84A35" />
    {/* Row 3 Bricks */}
    <rect x="2" y="10" width="6" height="3" fill="#9C3B28" />
    <rect x="9" y="10" width="5" height="3" fill="#852E1D" />
  </svg>
);

// 24. MAP
export const MapIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Parchment border */}
    <rect x="2" y="2" width="12" height="12" fill="#695632" />
    {/* Parchment paper */}
    <rect x="3" y="3" width="10" height="10" fill="#E6D6A6" />
    {/* Map coastlines and grid */}
    <rect x="4" y="4" width="3" height="4" fill="#61993B" />
    <rect x="7" y="6" width="2" height="3" fill="#5885C7" />
    <rect x="9" y="4" width="3" height="5" fill="#C29B4A" />
    {/* Compass player locator arrow */}
    <polygon points="8,7 6,11 8,10 10,11" fill="#C72626" />
  </svg>
);

// 25. SKULL
export const SkullIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Head Outline */}
    <path
      d="M4 2h8v1h1v7h-2v2h-1v2H6v-2H5v-2H3V3h1V2z"
      fill="#1C1C1C"
    />
    {/* Bone Cranium */}
    <path
      d="M4 3h8v6H4V3zm2 6h4v3H6V9z"
      fill="#D9D9D9"
    />
    <rect x="5" y="3" width="6" height="1" fill="#FFFFFF" />
    {/* Eye Sockets */}
    <rect x="5" y="5" width="2" height="3" fill="#1C1C1C" />
    <rect x="9" y="5" width="2" height="3" fill="#1C1C1C" />
    {/* Nose Hole */}
    <rect x="7" y="7" width="2" height="1" fill="#1C1C1C" />
    {/* Teeth */}
    <rect x="6" y="11" width="1" height="1" fill="#1C1C1C" />
    <rect x="8" y="11" width="1" height="1" fill="#1C1C1C" />
  </svg>
);

// 26. ANVIL
export const AnvilIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Anvil Outline */}
    <path
      d="M1 3h14v4h-2v1h-1v1H9v2h2v3H5v-3h2V9H6V8H5V7H1V3z"
      fill="#17181C"
    />
    {/* Iron top striking face */}
    <rect x="2" y="4" width="12" height="2" fill="#5A5D66" />
    <rect x="2" y="4" width="12" height="1" fill="#878A94" />
    {/* Neck */}
    <rect x="6" y="8" width="4" height="2" fill="#3D4047" />
    {/* Base */}
    <rect x="5" y="11" width="6" height="2" fill="#4B4E57" />
  </svg>
);

// 27. CLOCK / HOURGLASS
export const ClockIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Gold Casing */}
    <path
      d="M5 2h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V5h1V3h2V2z"
      fill="#6E4D05"
    />
    <path
      d="M5 3h6v2h2v6h-2v2H5v-2H3V5h2V3z"
      fill="#F5BC27"
    />
    {/* Dial face: Sky top, dark bottom */}
    <path d="M5 4h6v4H5V4z" fill="#4DA7E8" />
    <path d="M5 8h6v3H5V8z" fill="#1B1F3B" />
    {/* Sun */}
    <rect x="7" y="5" width="2" height="2" fill="#FFE853" />
  </svg>
);

// 28. ALERT / HAZARD (PIXEL WARNING)
export const AlertIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Triangle outline */}
    <path
      d="M8 1h1v2h1v2h1v2h1v2h1v2h1v2h1v1H1v-1h1v-2h1v-2h1v-2h1v-2h1v-2h1V1z"
      fill="#291A00"
    />
    {/* Yellow body */}
    <path
      d="M8 3h1v2h1v2h1v2h1v2h1v2H3v-2h1v-2h1v-2h1v-2h1V3z"
      fill="#F5B800"
    />
    <rect x="7" y="3" width="2" height="1" fill="#FFE666" />
    {/* Exclamation point */}
    <rect x="7" y="5" width="2" height="4" fill="#1C1402" />
    <rect x="7" y="10" width="2" height="2" fill="#1C1402" />
  </svg>
);

// 29. CLOSE / X
export const CloseIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    <path
      d="M2 2h3v1h1v1h1v1h2V4h1V3h1V2h3v3h-1v1h-1v1h-1v2h1v1h1v1h1v3h-3v-1h-1v-1h-1v-1H7v1H6v1H5v1H2v-3h1v-1h1v-1h1V7H4V6H3V5H2V2z"
      fill="#210505"
    />
    <path
      d="M3 3h1v1h1v1h1v1h1v1h2V6h1V5h1V4h1V3h1v1h-1v1h-1v1h-1v1H9v2h1v1h1v1h1v1h-1v1h-1v-1h-1v-1H9v-1H7v1H6v1H5v1H4v-1h1v-1h1v-1h1V9H6V8H5V7H4V6H3V3z"
      fill="#E63939"
    />
    <rect x="4" y="3" width="1" height="1" fill="#FFA3A3" />
    <rect x="11" y="3" width="1" height="1" fill="#FFA3A3" />
  </svg>
);

// 30. REDSTONE REPEATER / SETTINGS
export const RepeaterIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Smooth stone slab */}
    <rect x="1" y="9" width="14" height="5" fill="#696969" />
    <rect x="1" y="9" width="14" height="1" fill="#999999" />
    <rect x="1" y="13" width="14" height="1" fill="#3D3D3D" />
    {/* Redstone Dust trace */}
    <rect x="4" y="8" width="8" height="1" fill="#8A0D0D" />
    {/* Torch 1 (Fixed) */}
    <rect x="4" y="4" width="2" height="4" fill="#422912" />
    <rect x="4" y="3" width="2" height="2" fill="#FF1E1E" />
    <rect x="4" y="3" width="1" height="1" fill="#FFA3A3" />
    {/* Torch 2 (Adjustable slider) */}
    <rect x="10" y="4" width="2" height="4" fill="#422912" />
    <rect x="10" y="3" width="2" height="2" fill="#FF1E1E" />
    <rect x="10" y="3" width="1" height="1" fill="#FFA3A3" />
  </svg>
);

// 31. MUSIC DISC
export const MusicDiscIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Disc rim */}
    <path
      d="M5 2h6v1h2v2h1v6h-1v2h-2v1H5v-1H3v-2H2V5h1V3h2V2z"
      fill="#121214"
    />
    {/* Vinyl surface grooves */}
    <path
      d="M5 3h6v2h2v6h-2v2H5v-2H3V5h2V3z"
      fill="#292A30"
    />
    <circle cx="8" cy="8" r="3" fill="#D6385C" />
    <rect x="7" y="7" width="2" height="2" fill="#121214" />
    {/* Vinyl sheen */}
    <path d="M5 4h2v1H5V4zm4 7h2v1H9v-1z" fill="#4B4E59" />
  </svg>
);

// 32. NETHER STAR / EXP STAR
export const StarIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Star Arms */}
    <rect x="7" y="1" width="2" height="14" fill="#0E3D3C" />
    <rect x="1" y="7" width="14" height="2" fill="#0E3D3C" />
    <rect x="4" y="4" width="8" height="8" fill="#0E3D3C" />
    {/* Glow Core */}
    <rect x="7" y="2" width="2" height="12" fill="#67F2D8" />
    <rect x="2" y="7" width="12" height="2" fill="#67F2D8" />
    <rect x="5" y="5" width="6" height="6" fill="#A4FFF0" />
    {/* White center diamond */}
    <rect x="7" y="6" width="2" height="4" fill="#FFFFFF" />
    <rect x="6" y="7" width="4" height="2" fill="#FFFFFF" />
  </svg>
);

// 33. TNT
export const TntIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Red casing */}
    <rect x="1" y="1" width="14" height="14" fill="#C93226" />
    {/* Fuse wick top */}
    <rect x="7" y="1" width="2" height="2" fill="#3B3B3B" />
    {/* White middle label band */}
    <rect x="1" y="6" width="14" height="4" fill="#F0F0F0" />
    {/* TNT Letters */}
    <path
      d="M3 7h3v1H5v2H4V8H3V7zm4 0h1v3H7V7zm2 0h-1v3h1V8h1v2h1V7H9zm3 0h3v1h-1v2h-1V8h-1V7z"
      fill="#1A1A1A"
    />
  </svg>
);

// 34. FIRE / FLAME
export const FireIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Dark Red outer flame */}
    <path
      d="M7 1h2v3H8v2h3V4h1v4h1v3h-1v3H3v-2H2V9h1V6h1V4h1v3h1V3h1V1z"
      fill="#B8240D"
    />
    {/* Orange inner flame */}
    <path
      d="M6 4h2v3H7v3h3V8h1v4H4V9h1V6h1V4z"
      fill="#F07C18"
    />
    {/* Yellow core */}
    <path
      d="M6 7h3v4H5V9h1V7z"
      fill="#FFE138"
    />
    <rect x="7" y="9" width="1" height="2" fill="#FFFFFF" />
  </svg>
);

// 35. LIGHTNING / SMELT SPARK
export const LightningIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Outline */}
    <polygon
      points="9,1 4,8 8,8 6,15 13,7 9,7"
      fill="#8A6600"
    />
    {/* Yellow bolt */}
    <polygon
      points="9,2 5,8 8,8 7,14 12,7 9,7"
      fill="#FFDF36"
    />
    {/* White central core */}
    <line x1="8" y1="3" x2="8" y2="12" stroke="#FFFFFF" strokeWidth="1" />
  </svg>
);

// 36. BOOK / SCROLL
export const BookIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Book Cover (Enchanted / Leather) */}
    <rect x="2" y="2" width="12" height="12" fill="#691F24" />
    <rect x="2" y="2" width="3" height="12" fill="#421316" />
    {/* Pages */}
    <rect x="5" y="3" width="8" height="10" fill="#E6D4B8" />
    {/* Ribbon bookmark */}
    <rect x="7" y="1" width="2" height="8" fill="#B51B1B" />
    {/* Gold clasp */}
    <rect x="11" y="7" width="2" height="2" fill="#F0C33A" />
  </svg>
);

// 37. SLEEP / ZZZ
export const SleepIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Big Z */}
    <path
      d="M3 2h6v2H5l4 4v2H3V8h4L3 4V2z"
      fill="#45A0E6"
    />
    {/* Small Z */}
    <path
      d="M9 9h5v1h-3l3 3v1H9v-1h3l-3-3V9z"
      fill="#80CAFF"
    />
  </svg>
);

// 38. CHEST
export const ChestIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Chest Body */}
    <rect x="1" y="2" width="14" height="12" fill="#754E29" />
    <rect x="1" y="2" width="14" height="1" fill="#996836" />
    <rect x="1" y="6" width="14" height="1" fill="#3B2613" />
    <rect x="1" y="13" width="14" height="1" fill="#2E1C0B" />
    {/* Latch */}
    <rect x="7" y="5" width="2" height="3" fill="#D9D9D9" />
    <rect x="7" y="7" width="2" height="1" fill="#525252" />
  </svg>
);

// 39. TREE / OAK
export const TreeIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Leaves */}
    <rect x="4" y="1" width="8" height="8" fill="#3D7D28" />
    <rect x="2" y="3" width="12" height="5" fill="#326620" />
    <rect x="5" y="2" width="6" height="2" fill="#56A63A" />
    {/* Trunk */}
    <rect x="7" y="8" width="2" height="7" fill="#6B4929" />
    <rect x="6" y="13" width="4" height="2" fill="#4F351D" />
  </svg>
);

// 40. CASTLE / FORTRESS
export const CastleIcon: React.FC<IconProps> = ({ size = 16, className = '', ...props }) => (
  <svg
    viewBox="0 0 16 16"
    width={size}
    height={size}
    className={`inline-block shrink-0 ${className}`}
    style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
    {...props}
  >
    {/* Castle Battlements */}
    <rect x="2" y="2" width="3" height="3" fill="#666666" />
    <rect x="7" y="2" width="2" height="3" fill="#666666" />
    <rect x="11" y="2" width="3" height="3" fill="#666666" />
    {/* Wall body */}
    <rect x="2" y="5" width="12" height="9" fill="#7D7D7D" />
    <rect x="2" y="5" width="12" height="1" fill="#A8A8A8" />
    {/* Gate Portcullis */}
    <rect x="6" y="9" width="4" height="5" fill="#2E2E2E" />
    <rect x="7" y="10" width="2" height="4" fill="#141414" />
  </svg>
);

// UNIFIED ICON RENDERER
export const McIcon: React.FC<{
  name: MinecraftIconName | string;
  size?: number | string;
  className?: string;
}> = ({ name, size = 16, className = '' }) => {
  switch (name) {
    case 'emerald':
      return <EmeraldIcon size={size} className={className} />;
    case 'diamond':
      return <DiamondIcon size={size} className={className} />;
    case 'sword':
      return <DiamondSwordIcon size={size} className={className} />;
    case 'iron-sword':
      return <IronSwordIcon size={size} className={className} />;
    case 'pickaxe':
      return <PickaxeIcon size={size} className={className} />;
    case 'heart':
      return <HeartIcon size={size} className={className} />;
    case 'heart-empty':
      return <EmptyHeartIcon size={size} className={className} />;
    case 'heart-half':
      return <HalfHeartIcon size={size} className={className} />;
    case 'food':
    case 'drumstick':
      return <FoodIcon size={size} className={className} />;
    case 'shield':
      return <ShieldIcon size={size} className={className} />;
    case 'armor':
      return <ShieldIcon size={size} className={className} />;
    case 'creeper':
      return <CreeperIcon size={size} className={className} />;
    case 'steve':
      return <SteveHeadIcon size={size} className={className} />;
    case 'alex':
      return <AlexHeadIcon size={size} className={className} />;
    case 'villager':
      return <VillagerHeadIcon size={size} className={className} />;
    case 'warden':
      return <WardenHeadIcon size={size} className={className} />;
    case 'knight':
      return <KnightHeadIcon size={size} className={className} />;
    case 'grass-block':
      return <GrassBlockIcon size={size} className={className} />;
    case 'portal':
      return <NetherPortalIcon size={size} className={className} />;
    case 'ender-eye':
      return <EnderEyeIcon size={size} className={className} />;
    case 'command-block':
      return <CommandBlockIcon size={size} className={className} />;
    case 'ping':
      return <PingIcon size={size} className={className} />;
    case 'bread':
      return <BreadIcon size={size} className={className} />;
    case 'brick':
      return <BrickIcon size={size} className={className} />;
    case 'map':
      return <MapIcon size={size} className={className} />;
    case 'skull':
    case 'wither-skull':
      return <SkullIcon size={size} className={className} />;
    case 'anvil':
      return <AnvilIcon size={size} className={className} />;
    case 'clock':
      return <ClockIcon size={size} className={className} />;
    case 'alert':
      return <AlertIcon size={size} className={className} />;
    case 'close':
      return <CloseIcon size={size} className={className} />;
    case 'repeater':
    case 'settings':
      return <RepeaterIcon size={size} className={className} />;
    case 'disc':
      return <MusicDiscIcon size={size} className={className} />;
    case 'star':
      return <StarIcon size={size} className={className} />;
    case 'tnt':
      return <TntIcon size={size} className={className} />;
    case 'fire':
      return <FireIcon size={size} className={className} />;
    case 'book':
      return <BookIcon size={size} className={className} />;
    case 'sleep':
      return <SleepIcon size={size} className={className} />;
    case 'lightning':
      return <LightningIcon size={size} className={className} />;
    case 'chest':
      return <ChestIcon size={size} className={className} />;
    case 'tree':
      return <TreeIcon size={size} className={className} />;
    case 'castle':
      return <CastleIcon size={size} className={className} />;
    default:
      return <EmeraldIcon size={size} className={className} />;
  }
};

export const CartridgeIcons: React.FC<{
  cartridgeId: string;
  size?: number;
  className?: string;
}> = ({ cartridgeId, size = 28, className = '' }) => {
  switch (cartridgeId) {
    case 'nether-bastion':
      return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
          <DiamondSwordIcon size={size} />
          <NetherPortalIcon size={size} />
          <FireIcon size={size} />
        </div>
      );
    case 'overworld-mega':
      return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
          <TreeIcon size={size} />
          <PickaxeIcon size={size} />
          <CastleIcon size={size} />
        </div>
      );
    case 'end-fortress':
      return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
          <DiamondSwordIcon size={size} />
          <EnderEyeIcon size={size} />
          <StarIcon size={size} />
        </div>
      );
    case 'deep-dark':
      return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
          <DiamondSwordIcon size={size} />
          <ShieldIcon size={size} />
          <DiamondIcon size={size} />
        </div>
      );
    default:
      return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
          <PickaxeIcon size={size} />
          <EmeraldIcon size={size} />
          <StarIcon size={size} />
        </div>
      );
  }
};
