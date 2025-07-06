import { QRCodeSVG } from "qrcode.react";

interface YapeQRProps {
  amount: number;
}



const YapeQR: React.FC<YapeQRProps> = ({ amount }) => {
 

  const payload = `000201010211393203f92874015c5c6e81301afca0f637ae5204561153036045802PE5906YAPERO6004Lima6304C19C`;

  return (
    <div className="flex flex-col items-center p-4 border rounded-xl bg-white shadow-md">
      <QRCodeSVG value={payload} size={220} />
      <p className="mt-2 text-center text-sm text-gray-700">
        Escanea con Yape para pagar <br />
        <strong>S/ {amount.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default YapeQR;
