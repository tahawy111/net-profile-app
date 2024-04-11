import Icons from "./Icons";

export default function Brand() {
  return (
    <div className="flex w-full items-center flex-col gap-2 my-3">
      <img
        src="/elfath-logo.png"
        className="w-24 h-24 bg-white rounded-full border-2 border-[#ac0700]"
        alt=""
      />
      <h1 className="text-center text-2xl font-bold">مركز الفتح</h1>
      <div className="flex flex-wrap justify-center gap-2">
        <span className="flex items-center">
          , <span>01063310981📞</span>
          <Icons.WhatsApp className="w-4" />
        </span>
        <span className="flex items-center">, 01117419902📞</span>
        <span className="flex items-center">
          <span>01145681652📞</span>
          <Icons.WhatsApp className="w-4" />
        </span>
      </div>
    </div>
  );
}
