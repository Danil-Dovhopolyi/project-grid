export interface Project {
  id: number;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
}

export interface ApiResponse {
  data: Project[];
  totalPages: number;
  currentPage: number;
}
