import CompanyInfo from "./CommpanyInfo";

export default function DashboardHome() {
  return (
    <div className="px-[15vw] py-[5vh] ">
      <h1 className="text-2xl font-bold mb-4 text-orange-600">Bienvenido al Panel de Administración</h1>
      <p className="white">Desde aquí puedes gestionar productos, categorías, y reservas.</p>
    <CompanyInfo></CompanyInfo>
    
    </div>
  );
}
