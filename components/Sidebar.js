import Link from "next/link";


const Sidebar = () => {
    return (
        <>
            <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
                <div className="py-5 px-5 text-3xl font-bold border-b border-gray-700 mb-6 text-center">
                    Get Data ElasticSearch
                </div>
                <nav className="flex-1 p-4">
                    <ul>
                        <li className="mb-4">
                            <Link href="/" className="block py-2 px-4 rounded hover:bg-gray-700">
                                Home
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};




export default Sidebar;


