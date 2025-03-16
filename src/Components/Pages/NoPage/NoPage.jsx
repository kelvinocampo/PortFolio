import Img404 from "@A/404.png"

export const NoPage = () => {
    return (
        <section className="flex h-full w-full items-center justify-center bg-white p-4">
            <div className="max-w-[600px] min-w-[250px] w-full flex flex-col items-center gap-12 sm:flex-row sm:justify-between sm:items-center">
                <div className=" shadow-lg">
                    <img
                        className="w-full h-full rounded-lg object-cover"
                        src={Img404}
                        alt="Page Not Found"
                    />
                </div>

                <div className="text-center sm:text-left sm:max-w-[350px] sm:min-w-[250px]">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-2">No deberias estar aca...</h2>
                </div>
            </div>
        </section>
    );
};