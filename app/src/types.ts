// Tu archivo de tipos (donde sea que tengas estas interfaces)
export interface Category {
  id: number;
  name: string;
  description: string; // Or whatever fields your categories have
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
   is_offer: boolean;
  offer_price?: number;  // Confirmamos que es 'image' ahora
  category: Category; // Confirmamos que es ProductCategory (string)
  available: boolean;
  created_at: string; // <--- ¡AÑADE ESTAS DOS LÍNEAS!
  updated_at: string; // <--- ¡AÑADE ESTAS DOS LÍNEAS!
}

export interface CartItem {
  product: Product;
  quantity: number;
}
declare interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}