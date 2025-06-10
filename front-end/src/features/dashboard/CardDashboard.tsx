type Props = {
  title: string;
  total?: string;
  num?: number;
};

const CardDashboard = ({ title, total, num }: Props) => {
  return (
    <div className="border rounded-sm border-r-8 border-b-6 w-full max-h-40 h-40 p-4 ">
      <div className="flex justify-between">
        <h1 className="text-xl lg:text-2xl font-bold">{title}</h1>
        <p>{new Date().toLocaleString()}</p>
      </div>
      <hr />
      <div className="p-4">
        <h1 className="font-semibold text-xl">{total ? total : num}</h1>
      </div>
    </div>
  );
};

export default CardDashboard;
