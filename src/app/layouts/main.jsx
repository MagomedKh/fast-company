import useMockData from "../utils/mockData";

const Main = () => {
   const { error, initialize, status, progress } = useMockData();
   const handleClick = () => {
      return;
      initialize();
   };

   return (
      <div className="container mt-5">
         <h1>Main Page</h1>
         <h3>Инициализация данных в Firebase</h3>
         <ul>
            <li>Status: {status}</li>
            <li>Progress: {progress}%</li>
            {error && <li>Error: {error}</li>}
         </ul>
         <button disabled onClick={handleClick} className="btn btn-primary">
            Инициализировать
         </button>
         <p>Недостаточно прав</p>
      </div>
   );
};
export default Main;
