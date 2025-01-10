export default function Title({ title, subtitle }:{ title:string, subtitle:string }){

    return <div className="sm:w-1/2 w-full text-white ">
        <h1 className="text-center text-3xl font-bold mb-10">{title}</h1>
        <p className="text-xl text-center sm:text-left">{subtitle}</p>
    </div>
}