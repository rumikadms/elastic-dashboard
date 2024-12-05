import Sidebar from "../components/Sidebar";
import PieChart from '../components/PieChart';
import axios from 'axios';

export async function getServerSideProps() {
    try {
        // Ambil data dari API Express
        const res = await axios.get("http://localhost:3000/api/data");
        const data = res.data;

        // Ambil total data berdasarkan gender
        const countRes = await axios.get("http://localhost:3000/api/count/bygender");
        const countData = countRes.data;

        // Ambil total data semua

        const allData = await axios.get("http://localhost:3000/api/count/data");
        const dataall = allData.data;

        return {
            props: {
                data,
                countData,
                dataall
            }
        };

    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                data: [],
                countData: {},
                dataall: {}
            }
        };
    }

}

export default function Dashboard({ data, countData, dataall }) {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-8">
                    <div className="p-8">

                        <h1 className="sm:text-lg md:text-4xl font-bold">Dashboard</h1>

                        {/* Menampilkan Total Data Berdasarkan Gender */}
                        <div className="flex">
                            <div className="grid place-items-center h-40 w-1/4 mt-10 my-4 bg-green-400 shadow-md rounded-md">
                                <p className="text-center sm:text-lg md:text-4xl text-white font-bold">{dataall.Total_Data} Kucing</p>
                            </div>

                            <div className="grid place-items-center h-40 w-1/4 ml-5  mt-10 my-4 bg-blue-400 shadow-md rounded-md">
                                <p className="text-center sm:text-lg md:text-4xl text-white font-bold">{countData.Total_Jantan} Jantan</p>
                            </div>

                            <div className="grid place-items-center h-40 w-1/4 ml-5 mt-10 my-4 bg-pink-400 shadow-md rounded-md">
                                <p className="text-center sm:text-lg md:text-4xl text-white font-bold">{countData.Total_Betina} Betina</p>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-row">
                        <div className="">
                            <h1 className="text-2xl font-bold text-center mb-5">Gender Distribution</h1>
                            <div>
                                <PieChart data={countData} />
                            </div>
                        </div>
                        <div className="flex-1 w-32">
                            <h2 className="text-2xl font-bold mb-5">Data Tabel from Elasticsearch</h2>
                            <table className="table-auto border-collapse border border-gray-200 w-full">
                                <thead>
                                    <tr className="bg-blue-100 content-center">
                                        <th className="border border-gray-300  text-center">No</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Nama</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Jenis Kelamin</th>
                                        <th className="border border-gray-300 px-4 py-2 text-center">Weight</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ? (
                                        data.map((item, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                <td className="border border-gray-300 text-center">{index + 1}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">{item.nama || "N/A"}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">{item.jk || "N/A"}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">{item.weight + "kg" || "N/A"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>


                    </div>

                </main>
            </div>

        </>
    )
}