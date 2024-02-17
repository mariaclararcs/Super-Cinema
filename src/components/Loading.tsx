const Loading = () => {
    return(
        <div className="absolute left-[50%] top-[50%] -translate-x-1/2 bg-[#000000] w-[100%] h-[100%] grid place-items-center">
            <div className="lds-dual-ring">
            </div>
        </div>
    );
}

export default Loading;